/**
 * @abstract
 */
class BasePoolMiner extends Miner {
    /**
     * @param {BaseChain} blockchain
     * @param {Accounts} accounts
     * @param {Mempool} mempool
     * @param {Time} time
     * @param {Wallet} wallet
     * @param {number} deviceId
     * @param {Uint8Array} [extraData=new Uint8Array(0)]
     */
    constructor(blockchain, accounts, mempool, time, wallet, deviceId, extraData = new Uint8Array(0)) {
        super(blockchain, accounts, mempool, time, wallet.address, extraData);

        /** @type {Wallet} */
        this._ourWallet = wallet;

        /** @type {Uint8Array} */
        this._ourExtraData = extraData;

        /** @type {WebSocket} */
        this._ws = null;

        /** @type {number} */
        this._deviceId = deviceId;
    }

    requestPayout() {
        if (!this._ourWallet.keyPair) {
            throw  new Error('Missing private key required for pool payout requests');
        }
        const buf = new SerialBuffer(8 + BasePoolMiner.PAYOUT_NONCE_PREFIX.length);
        buf.writeString(BasePoolMiner.PAYOUT_NONCE_PREFIX, BasePoolMiner.PAYOUT_NONCE_PREFIX.length);
        buf.writeUint64(this.nonce);
        const signature = Signature.create(this._ourWallet.keyPair.privateKey, this._ourWallet.keyPair.publicKey, buf);
        const signatureProof = SignatureProof.singleSig(this._ourWallet.keyPair.publicKey, signature);
        this._send({
            message: 'payout',
            proof: BufferUtils.toBase64(signatureProof.serialize())
        });
    }

    _send(msg) {
        if (this._ws) {
            try {
                this._ws.send(JSON.stringify(msg));
            } catch (e) {
                Log.w(BasePoolMiner, 'Error sending: ' + e.message || e);
            }
        }
    }

    connect(host, port) {
        if (this._ws) throw new Error('Call disconnect() first');
        this._server = host;
        this._port = port;
        const ws = this._ws = new WebSocket(`wss://${host}:${port}`);
        this._ws.onopen = () => this._onOpen(ws);
        this._ws.onerror = (e) => this._onError(ws, e);
        this._ws.onmessage = (msg) => this._onMessage(JSON.parse(msg.data));
        this._ws.onclose = () => this._onClose(ws);
    }

    _onOpen(ws) {
        if (ws !== this._ws) {
            ws.close();
        } else {
            this._register();
        }
    }

    /**
     * @abstract
     */
    _register() {
    }

    _onError(ws, e) {
        Log.w(BasePoolMiner, e.message || e);
        if (ws === this._ws) {
            this._timeoutReconnect();
        }
        try {
            ws.close();
        } catch (e2) {
            Log.w(BasePoolMiner, e2.message || e2);
        }
    }

    _onClose(ws) {
        if (ws === this._ws) {
            this._timeoutReconnect();
        }
    }

    _timeoutReconnect() {
        this.disconnect();
        setTimeout(() => {
            this.connect(this._server, this._port);
        }, 30000); // after 30 sec
    }

    disconnect() {
        this._turnPoolOff();
        if (this._ws) {
            try {
                this._ws.close();
            } catch (e2) {
                Log.w(BasePoolMiner, e2.message || e2);
            }
            this._ws = null;
        }
    }

    _onMessage(msg) {
        if (msg && msg.message) {
            switch (msg.message) {
                case 'settings':
                    if (!msg.address || !msg.extraData) {
                        this._turnPoolOff();
                        this._ws.close();
                    } else {
                        this._onNewPoolSettings(Address.fromUserFriendlyAddress(msg.address), BufferUtils.fromBase64(msg.extraData), msg.target, msg.nonce);
                    }
                    break;
                case 'balance':
                    if (msg.balance === undefined || msg.confirmedBalance === undefined) {
                        this._turnPoolOff();
                        this._ws.close();
                    } else {
                        this._onBalance(msg.balance, msg.confirmedBalance);
                        this.payoutRequestActive = msg.payoutRequestActive;
                    }
                    break;
                case 'invalid-share':
                    Log.w(BasePoolMiner, 'Pool denied share: ', msg.reason);
                    break;
            }
        } else {
            Log.w(BasePoolMiner, 'Received unknown message from pool server: ' + msg.message);
            this._ws.close();
        }
    }

    /**
     * @param {number} balance
     * @param {number} confirmedBalance
     * @private
     */
    _onBalance(balance, confirmedBalance) {
        this.fire('balance', balance);
        this.fire('confirmed-balance', confirmedBalance);
    }

    _turnPoolOff() {
        this.address = this._ourWallet.address;
        this.extraData = this._ourExtraData;
        this.shareTarget = null;
    }

    /**
     * @param {Address} address
     * @param {Uint8Array} extraData
     * @param {number} target
     * @param {number} nonce
     * @private
     */
    _onNewPoolSettings(address, extraData, target, nonce) {
        this.address = address;
        this.extraData = extraData;
        this.shareTarget = target;
        this.nonce = nonce;
    }

    /**
     * @param {NetworkConfig} networkConfig
     * @returns {number}
     */
    static generateDeviceId(networkConfig) {
        return Hash.blake2b([
            BufferUtils.fromAscii('pool_device_id'),
            networkConfig.keyPair.privateKey.serialize()
        ].reduce(BufferUtils.concatTypedArrays)).serialize().readUint32();
    }
}
BasePoolMiner.PAYOUT_NONCE_PREFIX = 'POOL_PAYOUT';

Class.register(BasePoolMiner);
