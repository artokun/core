class GenesisConfig {
    static main() {
        GenesisConfig.init(GenesisConfig.CONFIGS['main']);
    }

    static test() {
        GenesisConfig.init(GenesisConfig.CONFIGS['test']);
    }

    static dev() {
        GenesisConfig.init(GenesisConfig.CONFIGS['dev']);
    }

    static bounty() {
        GenesisConfig.init(GenesisConfig.CONFIGS['bounty']);
    }

    /**
     * @param {{NETWORK_ID:number,NETWORK_NAME:string,GENESIS_BLOCK:Block,GENESIS_ACCOUNTS:string,SEED_PEERS:Array.<PeerAddress>}} config
     */
    static init(config) {
        if (GenesisConfig._config) throw new Error('GenesisConfig already initialized');
        if (!config.NETWORK_ID) throw new Error('Config is missing network id');
        if (!config.NETWORK_NAME) throw new Error('Config is missing network name');
        if (!config.GENESIS_BLOCK) throw new Error('Config is missing genesis block');
        if (!config.GENESIS_ACCOUNTS) throw new Error('Config is missing genesis accounts');
        if (!config.SEED_PEERS) throw new Error('Config is missing seed peers');

        GenesisConfig._config = config;
    }

    /**
     * @type {number}
     */
    static get NETWORK_ID() {
        if (!GenesisConfig._config) throw new Error('GenesisConfig not initialized');
        return GenesisConfig._config.NETWORK_ID;
    }

    /**
     * @type {string}
     */
    static get NETWORK_NAME() {
        if (!GenesisConfig._config) throw new Error('GenesisConfig not initialized');
        return GenesisConfig._config.NETWORK_NAME;
    }

    /**
     * @type {Block}
     */
    static get GENESIS_BLOCK() {
        if (!GenesisConfig._config) throw new Error('GenesisConfig not initialized');
        return GenesisConfig._config.GENESIS_BLOCK;
    }

    /**
     * @type {Hash}
     */
    static get GENESIS_HASH() {
        if (!GenesisConfig._config) throw new Error('GenesisConfig not initialized');
        if (!GenesisConfig._config.GENESIS_HASH) {
            GenesisConfig._config.GENESIS_HASH = GenesisConfig._config.GENESIS_BLOCK.hash();
        }
        return GenesisConfig._config.GENESIS_HASH;
    }

    /**
     * @type {string}
     */
    static get GENESIS_ACCOUNTS() {
        if (!GenesisConfig._config) throw new Error('GenesisConfig not initialized');
        return GenesisConfig._config.GENESIS_ACCOUNTS;
    }

    /**
     * @type {Array.<PeerAddress>}
     */
    static get SEED_PEERS() {
        if (!GenesisConfig._config) throw new Error('GenesisConfig not initialized');
        return GenesisConfig._config.SEED_PEERS;
    }
}
Class.register(GenesisConfig);

GenesisConfig.CONFIGS = {
    // TODO 'main': { }
    'test': {
        NETWORK_ID: 1,
        NETWORK_NAME: 'test',
        SEED_PEERS: [
            WsPeerAddress.seed('seed1.nimiqtest.net', 8080, '175d5f01af8a5911c240a78df689a76eef782d793ca15d073bdc913edd07c74b'),
            WsPeerAddress.seed('seed2.nimiqtest.net', 8080, '2c950d2afad1aa7ad12f01a56527f709b7687b1b00c94da6e0bd8ae4d263d47c'),
            WsPeerAddress.seed('seed3.nimiqtest.net', 8080, '03feec9d5316a7b5ebb69c4e709547a28afe8e9ef91ee568df489d29e9845bb8'),
            WsPeerAddress.seed('seed4.nimiqtest.net', 8080, '943d5669226d3716a830371d99143af98bbaf84c630db24bdd67e55ccb7a9011')
        ],
        GENESIS_BLOCK: new Block(
            new BlockHeader(
                new Hash(null),
                new Hash(null),
                Hash.fromBase64('9rorv34UeKIJBXAARx1z+9wo3wtxd0fZKc/egpxBIPY='),
                Hash.fromBase64('LgLaPRYuIPqYICnb3pzCD2tDGrBd8XZPNK9MYqTysz8='),
                BlockUtils.difficultyToCompact(1),
                1,
                1522735199,
                79001,
                BlockHeader.Version.V1),
            new BlockInterlink([], new Hash(null)),
            new BlockBody(Address.fromBase64('AAAAAAAAAAAAAAAAAAAAAAAAAAA='), [], BufferUtils.fromBase64('VGVzdE5ldA=='))
        ),
        GENESIS_ACCOUNTS:
            'AGRtpYhkbK5oQO5sU0S0+SMRztHCSQAAAAI2YQIo76+W/Qdx18mqTunnsgXJOKCOD3tLAAAAAd9ogj9y' +
            'lKw7pwp10pk+949jFlqJxAmT0O0BAAADY/CKKve10FB3Vykom6+T63UZ+l5RdMqVCAAAAAEAABaAAAAD' +
            'Y/CKKvcAAANj8Ioq917gf/WlrJ6y1E8IQ2okMCP6nphjAQAAA+ZJ4h5o2f56lf7OXSVX/+pPPMh1E/V7' +
            'F3MAAAABAAAWgAAAA+ZJ4h5oAAAD5kniHmj1lhDTt0y0ONlmMNJecaymzJJFDAAAAAILzN2PaaO+PKDZ' +
            'QKTKVnNrImV/jtIq1JVnAQAAAl2Pzuo8WJqJbnQMHTNrCIilQtfH+0/l8R4AAAABAAALQAAAAGTtTScK' +
            'AAACXY/O6jxQUKUSMKfMvmGTPwmD1sAScTjceQEAAAD1FNRPHJq+yIJf+QThlgj/uV2zDk8R0/ejAAAA' +
            'AQAAFoAAAAD1FNRPHAAAAPUU1E8ckmdk1CPLIiMkQSldqbWvVZblMQMBAAABW9MKiWkhVWQl5UDggSKP' +
            'KkJQikt4ltYOwwAAAAEAAAtAAAAAOfiBwZIAAAFb0wqJaa1WzaUO7G4NCi8oMKFCwq23XsAbAQAAAjET' +
            'oSPQnzWIh98MHDKYWhEEkO1+hpLrVe8AAAABAAAWgAAAAjEToSPQAAACMROhI9BSc3ly9rKarERDLtgL' +
            '0p1+Z91nmwAAAAFZpzPQK5IydxwdnXub6OYHp1kTgVA39ekBAQAAAk+9TT+9KMQEm2JEquqqHs9sxvEP' +
            'CSPlO1QAAAABAAAWgAAAAk+9TT+9AAACT71NP73r6DhrXOcvSMVlMHjxxJGiY/yRtwEAAAPAAJXcxOA9' +
            'UO5dsui8VI61yzogToSKifxaAAAAAQAAFoAAAAPAAJXcxAAAA8AAldzEWH8rLbLbKoRm321v0VFa5iqt' +
            'X8wBAAABa5+Pz7TVnIzuPKRuDTlBOsxZo7y33K+CjwAAAAEAAAtAAAAAPJqX9/QAAAFrn4/PtDiLaSDO' +
            'gHwkXgxtBKaCir2XDXKjAQAAAnUXHJrKG3/t01eblZWAWkiAzs/VQUA4h9EAAAABAAALQAAAAGjZL28i' +
            'AAACdRccmsrFnj2zLaZ4YvLdcnG0JCdEL1KfOwAAAAD/Em+d805Zn8TJrlep4lagCi+lcLQRWa+xAQAA' +
            'AeVb+PpCZp9dsB/E1OwQmE4GFHdbAhRL7p8AAAABAAALQAAAAFDkqX8LAAAB5Vv4+kIF6ZLAKDNObvGV' +
            'x22Ha9QOFewrcgAAAACDKCKIVQHOe7FSwWolUKvDT9FN8BvChJzmAQAAAIco91buAcOmTPSEHR0RLX93' +
            '8nmIGN3QzBAAAAABAAAWgAAAAIco91buAAAAhyj3Vu52wLbeHNtfyWI8M1rmUfsqZvM8kAAAAACycUQn' +
            '1EWzXlSWfL5j1NKrH1BwyMtnB0+ZAQAAA06PszJanoL7ebkCBwTwhjHB6jEJPnVsZGYAAAABAAALQAAA' +
            'AI0X8zMPAAADTo+zMloJPKLaQ03LThkywi5uAbkpKmeorAAAAAPttNS3OKK6Rk9sgeCCLFfIkFMnlYrx' +
            'iHxGAQAAAKa1mOYVDEuUc+eRf/0xs/O69qteFjrfQJ4AAAABAAAWgAAAAKa1mOYVAAAAprWY5hWyGdnP' +
            'ShceVlIWYr1jNInrFmSY2AAAAAC9GcQvl+FD9rlnVh+dePydT/HcD7JZMpgXAAAAALbBAO91yI6kP1LQ' +
            'kgfoFphhou6w28KrTOcAAAAD/rMPQ994M3FTR2rM5VzivXES6JSQKvWangEAAAHrQmTUYAVFtxMFAfCV' +
            'mOI/CPWw1uF69ie2AAAAAQAAC0AAAABR4GYjZgAAAetCZNRgh4HXIo5PmNiXNZFWh3xn3rv/czQBAAAA' +
            'vTxC6GxF+sNHOpl49EtdTkOc7X7iDrNQ8wAAAAEAAAtAAAAAH4oLJr0AAAC9PELobNAoM3MbWmAIt+jZ' +
            '3IkIkHmr3GrSAQAAALO+pRcvwEYkRnNpJQCXOWFutBiZ9lca2VcAAAABAAALQAAAAB31G4PeAAAAs76l' +
            'Fy/RvUUU3oGlMKTlTij1B0SiWuQkPgEAAAF7brhSaJG6NDLeE/+sz7K5ZGOZivNOntOeAAAAAQAAFoAA' +
            'AAF7brhSaAAAAXtuuFJonLXAwj7WoWE2DCa1W4GxRSYOJYIAAAADJ2oxNjxv3hEIxGMtXeEcBJxFz6n7' +
            'v+QclAEAAAG1a+EcqTKU5FdGvyUJcShqM2k8BjRk9SAyAAAAAQAAFoAAAAG1a+EcqQAAAbVr4RypQsgQ' +
            'WW0xaEsJuYNYKlFw8NpGOzYBAAAAA4toboMznVCwh/1oRz/3WnAoZlJYuQG3ZwAAAAEAABaAAAAAA4to' +
            'boMAAAADi2hug1a/+3i0b34JLF+Ps46aVUJ5JrTfAQAAAVu5f2l/U03YEcxPrclI122VDvHjtGyHeRsA' +
            'AAABAAALQAAAADn0P+brAAABW7l/aX8BqY/x0GFwsSp36hAxu5tFJuPIyAEAAACV8p6fGnPViEhKb0cD' +
            'DhmxXNF+o36tKGjkAAAAAQAAC0AAAAAY/cUahQAAAJXynp8aE8PH5kXg9J8wum/UC7eUytM/4zgBAAAC' +
            '1uw87ooJB9xfdNsCLTwluw52nDQSwatCAAAAAAEAABaAAAAC1uw87ooAAALW7Dzuij0a3qwPjiSXgdCt' +
            'asOASCDhFFrNAQAAAUKQwYjn4/JqJpoTqcVon2u1PFsf6br8xFoAAAABAAAWgAAAAUKQwYjnAAABQpDB' +
            'iOc67iZpZw+cF5hqyKoCPI3SIqczPwAAAALAElVwJOnsXdPfU3OWPgiSBSWFmatwOSp0AQAAATWuW4P0' +
            'nR2J0NWgsELIYprEHLwZA7zE1nYAAAABAAALQAAAADOdD0CpAAABNa5bg/QVNgm5lfTIXCeaAcHFllss' +
            'gcYGpgEAAAPP0jEZczZn15ceEW+6z4L25RdDyVIJmubqAAAAAQAAC0AAAACiowgu6QAAA8/SMRlzkIc9' +
            'WbLDTMQPF2VVqGuX+V4la88AAAADLOZAWTFOqn4vT+pOgOplxa6INDwvtRNQBwAAAAMsVwD1nq8c/smm' +
            'jqcvV9cq8un/zhTOXwDUAQAAAOYWT/u9mNFWv1LvXVNR6nFGYBW/Gf0rXjcAAAABAAALQAAAACZZDVSg' +
            'AAAA5hZP+73sTlo7xlXt8boPoPjmlnYkK6umNgEAAAMO0bYkx508+RS/1ID91Wv36UCE0mDA9g3ZAAAA' +
            'AQAAFoAAAAMO0bYkxwAAAw7RtiTHzT173148/NQiL4OIorQAhaxlq80BAAAARRXX/sh8WYG6g+OYfDLs' +
            'Nv7BV+7wr59eeQAAAAEAABaAAAAARRXX/sgAAABFFdf+yN3L7gDGvez1wUpIw6XpaKkk047lAAAAAeux' +
            'BjMFGoUGJ4pfHsWaxATJ0f1VzPR4tvEBAAADdp/vwBdBJEdEGpq6ln6tuWPD8lWRwKa1MQAAAAEAAAtA' +
            'AAAAk8VSoAQAAAN2n+/AF/V2HS/R/Dac99BojkjeAYwxnFsSAQAAAmPxNB6uVH9bjeFsVEZTftZGQqrC' +
            'JBckKmgAAAABAAAWgAAAAmPxNB6uAAACY/E0Hq4LRv4M59EHEX33FeDxs1HblS54wgAAAAHruSKAPr6i' +
            'V75K1i/LER/K5Fib23KFr2BmAAAAAQkRmkA+DGSuJaRUPeqk3/GIcze6QWIJZw8BAAAD+jADEhLUMDGf' +
            '7IORZDd+0ep9JoiexWPpIAAAAAEAAAtAAAAAqbKrLa4AAAP6MAMSEm/wcvuKgPvR93UC6gg7uLRGD0Cn' +
            'AQAAAbfE4Un/Tth3SP6WtJ9e4cH/Pzpds0otpp0AAAABAAALQAAAAElLeuGrAAABt8ThSf9xbemTSE50' +
            'kxXsbhDIlrTTPwQH0gEAAAJJqEmsdHOahlJLBDNDZyVO/QPk5ZvAe/ByAAAAAQAAC0AAAABhnAxHaQAA' +
            'AkmoSax0Lz6fTZjQY0nJ4XsSPNJYHcw+WkYAAAAD8zk5UlAV+Ugcx25Pq9qm/xDbbtMAeQdbQgEAAAEt' +
            'FcSBcSxB0RnkZXl+UCYK3YFp8AVvZPgUAAAAAQAAFoAAAAEtFcSBcQAAAS0VxIFxgUHH6VKl7R6Xxi+u' +
            'UC97xBX4anUBAAADuGVoFiU6+EzTmr38oz1z3IulyWo/wVRpqAAAAAEAAAtAAAAAnruRWQcAAAO4ZWgW' +
            'JW+ty2ixCIQ8AUfgE2EngV1h0/mOAAAAA/2TgfMeB9iI5gRi6lFt6xgKfvomo9e56WIBAAAASPsH4l3g' +
            '4q/fociq4refm1UI92gL9nhkXAAAAAEAABaAAAAASPsH4l0AAABI+wfiXVw3guq4ZlItQvBtd91YxP84' +
            '632UAQAAAIppTx4Wyiy9+VuiZtmk17xq0mcj7ozk+zQAAAABAAAWgAAAAIppTx4WAAAAimlPHhaov/PM' +
            'vxBsvJXJ2pU9D21cQSA0bgAAAAOaU8VU8iao8HvM6eW28IHG51giSV5NPHlYAAAABA+UpuhjG7yIsumW' +
            'M2hqSA6fuj0xCCCeN68AAAAAMmdwZLBQDurp31G0Lo1OzcI/BXoVKrRIrQEAAAOLqmH2Jpo78+QpFRSy' +
            'Nsc2jRp5vZY3xKWWAAAAAQAAFoAAAAOLqmH2JgAAA4uqYfYm6ngfyqe2caAdaxv4owt504u0tD0BAAAC' +
            '0xsm8PS4UmJXghyK3jFGzuGO+EXU7CEaXgAAAAEAAAtAAAAAeISGfX4AAALTGybw9DGZvJndi55QHQoZ' +
            'qJEDmLH3WufiAAAAAg6tFpRAqVky+V2UV4lwiAdvXsTJ/6DWQEIBAAAEAGwkiVAlWo9aaeMByXaRO16H' +
            'suw+01R3cAAAAAEAAAtAAAAAqrywwY4AAAQAbCSJUAV2ix0LBGomuH01sJsiX7Ieys7IAAAAACCibi1N' +
            'QotobPjZD+MVe53Fm8ID9jELIn0BAAAAk+4tGsTHKqv+0DZPz0LUnUQzoFdzI02LuAAAAAEAABaAAAAA' +
            'k+4tGsQAAACT7i0axDAU+Q7q2KbIbpNZXm3LMMNu+ekDAQAAA9jMyUAmbW9jmFTCzsO9mX57qTp4aECi' +
            'tKMAAAABAAAWgAAAA9jMyUAmAAAD2MzJQCZDJxiOABYC8VI0Knd3ocTMH8d5hgAAAADgfCs1F42jJ5xU' +
            'Cz/+x+hW0shZT+fc1oDtAQAAANg5F3AMLNkLSS6yG2I5Y9McB26kgRxf4k4AAAABAAALQAAAACQJg+gC' +
            'AAAA2DkXcAzvW4MjMmSAgY8dLJKQ/8BGADzWVQAAAALcpPnPMuwRHdERewIASHnutlrHLLjLc1xvAQAA' +
            'AYOT2RlsJath+IZkaytV0CJ35ljVRsIaSokAAAABAAALQAAAAECYpC7oAAABg5PZGWyxIzbC/my+XR6G' +
            'Ju/KrtZE73ZYYgEAAAJSMxQ8Ici1B0WKZ6HcvZU6rKynTexddOkiAAAAAQAAFoAAAAJSMxQ8IQAAAlIz' +
            'FDwhi9kVYzleAvzOpScLxYP6I3PZgpkBAAACk5CpCuE3vlhTO1h+gS4p8NlSvdrBPn/iAAAAAAEAABaA' +
            'AAACk5CpCuEAAAKTkKkK4eLsYBA2PrvNXpUCLnAh/NeoDUwbAQAAAnjO/Ejuj5AbWjuC8jCD3hkySdD3' +
            'vCsqBI8AAAABAAALQAAAAGl31LbTAAACeM78SO7Ig1fjLGT5FhxY8AE9cZQfJpvNPgAAAAHBQnP8HCrB' +
            'bBqoYIu/C4KtzVBr/ctzWlm2AAAAACcmXt9KRHkWXzlqMJoTxMJE34OUoFbau4IBAAAANTXtXH4wCtU7' +
            'yxorHKxU/QyckqEB/0NSiAAAAAEAABaAAAAANTXtXH4AAAA1Ne1cfuHjXwjoZvNc7Fy5FAnAifyyJn8T' +
            'AQAAAHxQ6I+F6IVTXopuOz9QB+vZdqvaMuEQAGAAAAABAAALQAAAABS4JsKXAAAAfFDoj4WT525f3PYm' +
            '83/j53THueEgHZ/faQEAAAGp9duzQDTM9Fd866ppgfGuLMGPfsQgU5XoAAAAAQAAC0AAAABG/k9IiwAA' +
            'Aan127NAC5ArbXKgC+8vqx8QIpRFcilnSXgAAAACjlESpeQDMrGuHehMpWgAsm7qthgaeObVFAAAAAGT' +
            'TWfJen+afpGqsUOhNXFhPBJ3JPgSpEr6AQAAAYN/fuya5Qc83TimGRduqCQX/YrLuSzQbpMAAAABAAAW' +
            'gAAAAYN/fuyaAAABg39+7JoS7//vP72Non9Iek1G5aNau6oeGgAAAAKapDnYzUQyrukN+Qc9Wwz9v4gh' +
            'LyNl71u8AQAAAnLNWV/XywPsi8BGZG+CKy1nw2+xObNJNDoAAAABAAALQAAAAGh3juVPAAACcs1ZX9cJ' +
            '/cMH1zlttVFiiGadwl0Bx/q3mwEAAAEjw58XBvPDv8tMvp43jcqAMli/E8j6jWoHAAAAAQAAFoAAAAEj' +
            'w58XBgAAASPDnxcGYr1tx3m56rnbCQnb+J8f/HMogokBAAABTLgwBl8EGS59TXS+JqdsNhqcLwBl7pzm' +
            'LQAAAAEAABaAAAABTLgwBl8AAAFMuDAGX/EQPIpkc/N55Av4Sbdh3mUsAThlAQAAAzxtX3wL72TYUh7F' +
            'YQMSITHJBHRSaI1GesgAAAABAAALQAAAAIoSOpStAAADPG1ffAtujoENPhZYsIUQgYFU/3HFztRL5AAA' +
            'AALAAz0XFFc6DCzvNOl7tZ2PZQpxA8bk6fsQAQAAAOJuyV+s+WZJFMueRHWG5Sf7EpSwjoeopQkAAAAB' +
            'AAALQAAAACW9IY/yAAAA4m7JX6y0m1xthoQ990S9ZPSJiJZYpnZQ3AEAAAKxCI3UbPt5RqRxj2wqJ+Kx' +
            'C/ZwHjgZUUVmAAAAAQAAFoAAAAKxCI3UbAAAArEIjdRs7Cq6ODYs9WF2hll8W+GWb8oYoUkBAAACyifu' +
            '9bOkg2SLC5uL67m1JmcVDp3LVm5sxgAAAAEAAAtAAAAAdwan054AAALKJ+71s8Y5qvGT75R/Wv75ANQP' +
            '9H8Sr6cbAQAAAFlJobUUoSJyHcj70jR1LoP+zhKRmOAtQqsAAAABAAAWgAAAAFlJobUUAAAAWUmhtRRd' +
            'v9EMhbsoP9ae+qfnk9KFs5ucFQAAAAF2AxI2dSusjJYD6ZgoaP3rOLetSacK2k++AQAAA+6eu5h6s85Q' +
            '+/EMixarDWjt7IGyv2yWxOUAAAABAAALQAAAAKfFH0QVAAAD7p67mHoMtMNYAELvRG0YKYwaVt61Px1O' +
            'xQEAAANTlgPXbArquAHccms33PTISgahBs9VhikxAAAAAQAAFoAAAANTlgPXbAAAA1OWA9dsoqedKVcu' +
            'SahNoD+jz9nBKnQm7I0AAAACvL5HapC9sU53zQABUPJHFl8I2k133lEq8gEAAAGdQiyW3elWejCK4NDE' +
            'y3pRe01EVBAudlMCAAAAAQAAFoAAAAGdQiyW3QAAAZ1CLJbdWykUMZN2YtPFE6u1gpr20fFpcj0BAAAB' +
            'D3x3iZuLTsWjstD9WDAkoIyWPabYoHJbewAAAAEAABaAAAABD3x3iZsAAAEPfHeJmxcC3BsssF43KiT4' +
            'Ts4BxINcbxyAAQAAHp2697bfmslKGkZzY2OiC45SB0ynaYHMQzkAAAABAAALQAAABRpJ0/PQAAAenbr3' +
            'tt8='
    },

    'dev': {
        NETWORK_ID: 2,
        NETWORK_NAME: 'dev',
        SEED_PEERS: [
            WsPeerAddress.seed('dev.nimiq-network.com', 8080, 'e65e39616662f2c16d62dc08915e5a1d104619db8c2b9cf9b389f96c8dce9837')
        ],
        GENESIS_BLOCK: new Block(
            new BlockHeader(
                new Hash(null),
                new Hash(null),
                Hash.fromBase64('JvMr9c9l2m8HWNdFAGTEastKH+aDZvln9EopXelhVIg='),
                Hash.fromBase64('1t/Zm91tN0p178+ePcxyR5bPxvC6jFLskqiidFFO3wY='),
                BlockUtils.difficultyToCompact(1),
                1,
                1522338300,
                12432,
                BlockHeader.Version.V1),
            new BlockInterlink([], new Hash(null)),
            new BlockBody(Address.fromBase64('AAAAAAAAAAAAAAAAAAAAAAAAAAA='), [], BufferUtils.fromBase64('RGV2TmV0'))
        ),
        GENESIS_ACCOUNTS:
            'AGTHyaGKKYtMW9zm81Nw2UYCIWr2bQAAAAOO9hgWyh/5Ezv+1Ldw9Oid2zwaY+LjRXAjAQAAAdpxepGo' +
            'TVTy25Dj9WOZXg1SAyoCtCmEkgYAAAABAAAWgAAAAdpxepGoAAAB2nF6kagxFAXrnWawCibXmNIocpEN' +
            'bY2M4QAAAACPgR32bdaFsm6G5Bg4H96UDFtJMFclfA8rAQAAA+Z8YTcn7eJ7xhfBV9k79a2bDLpb0SWE' +
            'gSIAAAABAAALQAAAAKZqEDPcAAAD5nxhNyfiENwK3NNQGB6fxKS62kvoApoe4gEAAAKLbf59cM8P40JX' +
            'yIKzSkr749mOqp5n1/ruAAAAAQAAC0AAAABsklUU6AAAAott/n1wZs9N9eWbNeUSLDy5qbhe6CW7Q94B' +
            'AAADLsSIL0WLcA6Nt5Ji+Pu2j2p4wJgN8lpIVwAAAAEAABaAAAADLsSIL0UAAAMuxIgvRXGosRRWBkji' +
            'IyWOFAzp3WZYGhQvAAAAAN+ByO6LKclRKAD8iueyAPGY/ZnTIbM5CbUBAAAAMXEUVZ+h9Kb5BH+lzQTK' +
            'HdVMiFfmRsJBWAAAAAEAAAtAAAAACD2DY5sAAAAxcRRVn+hB476I0A6qQDjCSzzvumwsQHf9AQAAA03B' +
            '6LO6vHPfpZtbnDWtPlN7WlO0l+aw1KIAAAABAAALQAAAAIz1psifAAADTcHos7qSQrji3cQRvdhZEyJa' +
            'a9OF/pUTGwEAAAEJawwO04GTmnyPT2hcnepKTWwqUe3rBlVwAAAAAQAAC0AAAAAsPIICeQAAAQlrDA7T' +
            'Kd6Wv+nDz7vTAMDCu39sALbKiawBAAABJAr6aFtkUf/rcih9aUVHVigY+8UIy2/+QQAAAAEAAAtAAAAA' +
            'MKx/EWUAAAEkCvpoW4oaIYhRvV3BULo9azzYYyKeeCxrAQAAA03cDnJSDjUiPbhnHIY/7aooMW/Y0Epe' +
            'T58AAAABAAAWgAAAA03cDnJSAAADTdwOclKFF7HkvjRHt0g5nwPzP59X9Uge9wEAAAGGEgl7kg2aSBjn' +
            '4A5Od5+0Lh5sBpm6dar7AAAAAQAAFoAAAAGGEgl7kgAAAYYSCXuSk87IwlS6e4YT+koCY6/lL28D3sYB' +
            'AAACjIEYqGyFuGHIpbQDcibbuM8kkiHguhEKAwAAAAEAABaAAAACjIEYqGwAAAKMgRiobCUh+XSo0plb' +
            '6NrVoCXHLwt7XzNZAAAAA1fLvw67icCbQBBXoglPtPMRkeln1StoiSYAAAACFc2B9ywrb3evyXkRn2lI' +
            'r99+cUgwAipdwwEAAAPxDMrFsmKBEu04Bg6LEqHvrJj2ewKnZ3qmAAAAAQAAFoAAAAPxDMrFsgAAA/EM' +
            'ysWyc3iG9qZDzL/uCLJEdhmwKaAHgIMBAAACPUMNm/Uu1vSoi1gBseNjIp1mp154Sw79UAAAAAEAABaA' +
            'AAACPUMNm/UAAAI9Qw2b9YcCc88Iyrx0NUbMZOK3rJdc/ggmAQAAAnsptOZZhrhJa+5Z89rK+wkxjzUt' +
            'hAHVfDoAAAABAAAWgAAAAnsptOZZAAACeym05lkhopvGoZgAsJ38XeT+KI6VFZ6HVQEAAAKZNR0cZ3N/' +
            'V/VlAJ1g1vBkidPGJBfIBQZcAAAAAQAAC0AAAABu3i+EvAAAApk1HRxnwWGEqi7rwr6bZ9df8Uhr5cG3' +
            'nAUAAAAB+ett5xJRyHYmu80aIhgssCKeD9KYKNlI+gEAAAHcmaAZJKAMxD+5u1O+u5ALn65VT4HGDIxw' +
            'AAAAAQAAC0AAAABPbvAEMQAAAdyZoBkkTOyyimPzT9JghHBHVSBRqHTY6qMBAAABMiMv3v3Fqy0Rq/yO' +
            'BHu3RlPy/l121QrKAwAAAAEAABaAAAABMiMv3v0AAAEyIy/e/TyTgfm1ATlfv11vqgZ2mGgLp5I3AAAA' +
            'BB6+ivcGqPmcXVPR6jFzANQ/oHcfYAbWLCAAAAACEUzY24RQtw7fskPYnAuOCrVYvYWjy/Sq2QEAAAA1' +
            'ejIu8T103OAjQ6dOO7R1qdl9voiJTyMzAAAAAQAAC0AAAAAI6bMH0wAAADV6Mi7xMF78LO+AmQt47Q2F' +
            '8lJOtFmP+8sBAAADIrN3lvTLTPW10LenULSqINB8dhRMCjZoqgAAAAEAAAtAAAAAhciT7n4AAAMis3eW' +
            '9PfpWIeCkAqinftTYf+jyT/iAxE2AAAAACtXQrrG1ENyC6MF0IZJhxjw1atz1xqHhPwBAAAAvi3c14rV' +
            'Vkylvnz2LXDSnAd0Ap9o6EcHkwAAAAEAAAtAAAAAH7JPeUIAAAC+LdzXityvfksBfLlWNu3IzdEXOAKK' +
            'juLqAAAAAWKGyagmDA2tPlgh/4bnCAHEUTy6X43XlxYAAAABpZApuaLoMq3LP2zjV1NWvIyyZ9WXhbjK' +
            'rgAAAAOSnw31GpWdLCHuiuqqRiU+c6/7QpNNu415AQAAA/PO43ur9pEsqZCx+ctQ0uLZPiPcQtZ4AtoA' +
            'AAABAAALQAAAAKiiez9IAAAD887je6ty7kyqfDlYpexa6zO61+OPc7PemgEAAAFVhN0jTzdIVM9Xza9g' +
            'EHJEU/NTXLDe1iXFAAAAAQAAC0AAAAA463owjgAAAVWE3SNP895JOb/wZK4ieF/UWFZvxGiH5yMAAAAB' +
            'WtMtyhV1iFBda1GZC0OkOSwt9AADUTkavAEAAAGLTWokGsi+QGXG5VciJh0XKhgY2Ffw3nFhAAAAAQAA' +
            'C0AAAABB4jxbWgAAAYtNaiQaxyj4UkPRXmdB4RUJOmY0/+DGi2sAAAABmtptM00N3PW8TiZSDGq75w65' +
            'ENAqIvV17gEAAAPVauIkr0eeRNW8s9uvLImxBON8OZc+nrJLAAAAAQAAC0AAAACjkdBbcwAAA9Vq4iSv' +
            'LMTqFpsInyV7LXX07AVlLB4LwK8AAAACVOJQdF94lWhUD0pOtwPsSpOcOfVM4c3lYAEAAAJZhQlPED5v' +
            'd70C9VJcR9E0/6kVRjND3chpAAAAAQAAC0AAAABkQNbigwAAAlmFCU8Q5+bT5k92M+EdyU87fjVCIOHg' +
            'JvQBAAABLAh445G4HY/gCBp8Ww86DjZzqu2656S1WwAAAAEAABaAAAABLAh445EAAAEsCHjjkfGu/x1G' +
            'ALyflu5s6H/RjA0uF2FJAQAAAfUQ1yISxqLt9R+tekR4gPOI6gjm8GCCewkAAAABAAAWgAAAAfUQ1yIS' +
            'AAAB9RDXIhLmoPJPmFOfClWZtRtz8SIHZV+RYgEAAAGb6NZw6ik9LhWvYkCsjo753C4xml4yhuLkAAAA' +
            'AQAAFoAAAAGb6NZw6gAAAZvo1nDq0lWfSarsXeQhGik+Wy00hFQPYNIBAAAC4wlfg1nMx6ncdUeIXQp/' +
            'MHyEH0Q1GZoNiAAAAAEAAAtAAAAAeyw6leUAAALjCV+DWRJzvcMi6fQ+RMgH4p3thxoZkT3KAQAAAplo' +
            'xifaQHmEokpWgPZUy2JkLz0fIsjxIz4AAAABAAALQAAAAG7my7FPAAACmWjGJ9ojMPo7C9y8Ib/ncXPh' +
            'wUC60bh5vwAAAACNnQv2v4inBpnu2xVZInd7VAlMXKKdYgukAQAAApBN6CyLt+TdIz09e58DxUKFW4PK' +
            '6+lckmcAAAABAAALQAAAAG1iUVzCAAACkE3oLIs/W2vCON/csGZ+BrXXzOfPf3+nwgAAAABdcEFzteZa' +
            'aSm87wyRZwS2rvearhLJb0wSAQAAA5l3BvfWMZXszk+sOGOzYCH6Scso0530ACEAAAABAAAWgAAAA5l3' +
            'BvfWAAADmXcG99Yn1+CSxVm0b9VEmdXSPU9MLZ6euQEAAACc7CZPBZWabWnc3dRvBQIYMyDgLCyx2AtM' +
            'AAAAAQAAC0AAAAAaJ1u31wAAAJzsJk8FMsv+RNrEAeMhkxQQ7swlQm/MWcsBAAAEFqz9ZzfxBC8ZD/h5' +
            'XbP5/TW158EyNFjtDwAAAAEAAAtAAAAArnIqO98AAAQWrP1nN9WW44AbwcH3rC9B0LDZEGH/6LGWAAAA' +
            'A0/mTvNyq+e4MxN7UI6LWMDrHl4bIjVbRqkBAAAADwRE4OfGbkb1M4LvJTsug5Guwv4UipUglQAAAAEA' +
            'AAtAAAAAAoC2JXwAAAAPBETg5xXn4XxmjRL8H7qyrMKtPOQ68d9gAQAAA+kpJjZRO8ds5r5Z15bsaAvU' +
            'z1Hi+igym+wAAAABAAALQAAAAKbcMQkOAAAD6SkmNlFtNRkkOze3mxqbEGn8LmugDYG9AAEAAAIeKgo/' +
            '6Q3VK9Fh4+5mvtU/qnCGKcL5eZe6AAAAAQAAC0AAAABaXFcKpwAAAh4qCj/pVkOr82XeobTRYSqMwBit' +
            '+DK26L0AAAADExdE1KGweTGwMNtOUr0mkTMuJZPdUx/lFgEAAAIYnmRDO5Us7NZLbPKbfSqFz9Qcz12x' +
            'p7EIAAAAAQAAC0AAAABZb7tgigAAAhieZEM7QJBbpsW5TySU3AOaRq0w6StqDbkBAAAAQYtUtY+neTkG' +
            'p0FX3yBWlI9VfXL9rY2T0AAAAAEAABaAAAAAQYtUtY8AAABBi1S1j6CfjxyppAST/5j+yNsnpZ4mb+LM' +
            'AQAAAwd7a4MeZabvmCauqJUxc/dnJt9Qdbu0C+sAAAABAAALQAAAAIE/PJXbAAADB3trgx6XwCRFCATy' +
            '6PT5xzl/tTynPq+pVwEAAAP3RVI223cMsae0V7OPJkgsuqVbHiDuSfwpAAAAAQAAFoAAAAP3RVI22wAA' +
            'A/dFUjbbqciNZ2beiMn+kVcprmWvCo0qNNYAAAAAp/x8AiuP0gOSmGXc+PyW+ma3l4h07YsKpAEAAAKh' +
            'uMUSlEiZItBpeLfj6hIFvBR6t0/1Zyh2AAAAAQAAFoAAAAKhuMUSlAAAAqG4xRKUMbR0l40dlxXJiTEF' +
            'uHD29zmRDB8BAAAC0qDOUYnujJP0QRa7dQ2AJ0h1cIE0IkEehgAAAAEAABaAAAAC0qDOUYkAAALSoM5R' +
            'iepA5phgkMYQo9vghvEMs6W2EXiXAQAAAsKfyTSX6ZAOU+orXNxOz0wdBuAqVHbOiV0AAAABAAAWgAAA' +
            'AsKfyTSXAAACwp/JNJcBVoZ5gIarGpvmG5G4a1OXW3821QEAAANETmvLWBcBCeyCAd6ZLaV8GnQ8Da54' +
            'gAyrAAAAAQAAFoAAAANETmvLWAAAA0ROa8tY+JrQTn9k06PB7If9N0CfYchk/C0BAAACrhSVuS2ezk3S' +
            'ZrOTLlI6dWuGTC76mwagfAAAAAEAAAtAAAAAcljDnt0AAAKuFJW5LYlQAlhiQPsfkWnHfepiRbygaVcw' +
            'AQAAAbh/Gb8NJqE45Cy7l+FzX6ekgF3R/5Mtr+4AAAABAAAWgAAAAbh/Gb8NAAABuH8Zvw0P094GHr/6' +
            'AsV1AwxF7c61Qq2RSAAAAAJQwqsff2pLw8MLHSdj/TYI/vua9S1qFloyAQAAAZMy1gvR0p1S/3oRAOZ8' +
            'nDanLv73M3Fv150AAAABAAAWgAAAAZMy1gvRAAABkzLWC9F4DlJe82PbL79kI4++HW6Glhr8OAEAAAAc' +
            'Kk11+SFNxI4R9S/ebQHQO2V5jHpCMS1hAAAAAQAAC0AAAAAEsbeTqgAAABwqTXX5sSvBMuNoUTbS19Um' +
            'etiaDp8t/vsBAAABkaKnSL2M6hWXx8/DUkVUtGxAV3Xd9gtcfAAAAAEAABaAAAABkaKnSL0AAAGRoqdI' +
            'vTi9K8WL24O90wK1LIuwvNvkRR9iAQAAAQ5MDkLw77e4PHxSapULV3EHaCWnRV0ELfQAAAABAAAWgAAA' +
            'AQ5MDkLwAAABDkwOQvB45gZiCw5zStBMXeShepM6iLltkgAAAAHfl0LN8u7wC1h8uhyRIY5s1I1gZPfF' +
            '1qn+AAAAA8xCKTupigAMUEItvNB1XfJi5d20TA4oijkBAAABheDAya/Vr7/+aeXTjjrLIAY/8G9+ps7j' +
            'DAAAAAEAAAtAAAAAQPrKzEgAAAGF4MDJrySGgRI77yf0Ksrs7U5YU1v43lFrAAAAAkrmY2OrF77xscYd' +
            'oQqK/Kr8Sc5nR/w91goBAAADoIlPx03C0gM7wMgvzaUglns4BJzvq8fWUQAAAAEAABaAAAADoIlPx00A' +
            'AAOgiU/HTR059QJNJ6egySnjQ5ssU/g987fwAQAAAOSjwgS4txd+4xsScIOZ2jJ8gm6PFGb4IPcAAAAB' +
            'AAALQAAAACYbSwDKAAAA5KPCBLgEEiPQ5L80JKvaQkZUqVTQVFocRQEAAAAgrZivoOKiOJFwOp94dsp2' +
            'dceiRnJRp2BDAAAAAQAAC0AAAAAFckQdRgAAACCtmK+gCouuvquET79GQpJvlDjxodZmWlIBAAADdflm' +
            'IVtOxwzhUy9DP2U/1dg443ziW+44fAAAAAEAAAtAAAAAk6mRBZAAAAN1+WYhW7W78iEqRWPDm9L0+nV1' +
            'sgxvC7aAAAAAAnjT5GbwylWQC2KwtxExw7D10y49vKcooJ0AAAADf6VG1QRSW6oEqsV40bK3bkmqzoXd' +
            'ot6i4gEAAAEy6r22pwWExn95sjo6xoCdI0e/eYKD/GftAAAAAQAAFoAAAAEy6r22pwAAATLqvbanD5Iv' +
            '+2lMo8wGu38cLQnhQWGpZEoBAAAB3Wk4Pnb/keSDfMbiKmBGXEB/R75Sm81yZQAAAAEAABaAAAAB3Wk4' +
            'PnYAAAHdaTg+dlD3NG/nQX9YueouG07G0GevJx2cAQAAASDQ25ZqoHTmauLeC1uxbbJc9puYK7ibUGQA' +
            'AAABAAAWgAAAASDQ25ZqAAABINDblmrDxe/R9ACThqXry6xBd28gwzmBbAAAAAA3JtwFy7gOad2nnAuf' +
            '4c9a2JDr8h65bBqxAQAAApIfgNiYaB9nad26DD093xiYPxcQq2fLUB0AAAABAAALQAAAAG2v6s7EAAAC' +
            'kh+A2JhP0wpVAIQo7aaYGJz1q+BQ/JvaAQEAAAELaF0K71KfkeqRPM7T8QipPJ8FVXyve5YUAAAAAQAA' +
            'FoAAAAELaF0K7wAAAQtoXQrvJ/jj56GUsaHxN9mDMXP5RsX08l8AAAADE1QMtlVNL/Tr3lfTfZGZ4SRd' +
            '7Ko1EbsleAEAAAKN3l0bwt3bQiKYf+QXt0o8YjRC4DeZwDgRAAAAAQAAC0AAAABs+mTZ9gAAAo3eXRvC' +
            'VJEHZ0qy+F1pvTVulg0P1CdMCToAAAACfGL6o0cNbRO/RL5C/tljM1b4X9GibgKJhgEAAAPEPtTYFS70' +
            'hIR9vGG5Bss2KK0fyL/Q7ZfwAAAAAQAAFoAAAAPEPtTYFQAAA8Q+1NgVjxMxbNwbSqmxFnDEgA2J2Io6' +
            'Q14AAAAB0Fl8OgAV2mEYfjb3jRucPYtRg9szNOY5LAEAAADjj9fBEDJIdjKxmX0e1aiPEla5rtes80Lh' +
            'AAAAAQAAC0AAAAAl7U6gLgAAAOOP18EQBkYuU4gvkHTrVpgVrymqlmeIV3cBAAAA2NjC3v910c484H8c' +
            'iZmr9lYIo66SCeFyQwAAAAEAAAtAAAAAJCQgeoAAAADY2MLe/1PF67K3QcuQJ+m4P7tOiIrVmdFhAQAA' +
            'AukCHDJUZrnHmLoVULR6r8HDBaygNH/gNE8AAAABAAAWgAAAAukCHDJUAAAC6QIcMlS4diPveIAR8ciq' +
            'f6WfLVCvxGQ1MQAAAAJlQHbfixmoGC8hAefMDjnblFS989zLCxhKAQAAA+519/AhViOdiXDAAdtc5/ue' +
            'TM0syon8VYoAAAABAAAWgAAAA+519/AhAAAD7nX38CH0clyiOijE/jV+sOwm6ZB5i5GvYQEAAAGy/GNM' +
            'TQyzah076TeqMT+jyMJhGgese8vbAAAAAQAAC0AAAABIf2XiDQAAAbL8Y0xNr/JNzMvTszgQcqMcDBEz' +
            'tfKONfgAAAARpIlShW0='
    },

    'bounty': {
        NETWORK_ID: 3,
        NETWORK_NAME: 'bounty',
        SEED_PEERS: [
            WsPeerAddress.seed('bug-bounty1.nimiq-network.com', 8080, '7e825872ee12a71bda50cba9f230c760c84ee50eef0a3e435467e8d5307c0b4e'),
            WsPeerAddress.seed('bug-bounty2.nimiq-network.com', 8080, 'ea876175c8b693c0db38b7c17d66e9c510020fceb4634f04e281af30438f8787'),
            WsPeerAddress.seed('bug-bounty3.nimiq-network.com', 8080, '5c0d5d801e85ebd42f25a45b2cb7f3b39b9ce14002d4662f5ed0cd79ce25165a')
        ],
        GENESIS_BLOCK: new Block(
            new BlockHeader(
                new Hash(null),
                new Hash(null),
                Hash.fromBase64('nPcJa/7i0KYsiPQ8FPOgvLYgpP3m05UMwPfIPJAdAvI='),
                Hash.fromBase64('sXZsIZDV40vD7NDdrnSk2tOsPMKKit/vH0xvz1RXmQo='),
                BlockUtils.difficultyToCompact(1),
                1,
                1522338300,
                67058,
                BlockHeader.Version.V1),
            new BlockInterlink([], new Hash(null)),
            new BlockBody(Address.fromBase64('AAAAAAAAAAAAAAAAAAAAAAAAAAA='), [], BufferUtils.fromBase64('Qm91bnR5TmV0'))
        ),
        GENESIS_ACCOUNTS:
            'AGROsO8mYpEUdwzEGQ0O6vnlpVKChwEAAAPgjSSR4LB4qqj8ygd5C6xKRfXafhN7T5fmAAAAAQAAC0AA' +
            'AAClbNttpgAAA+CNJJHgvj7dWIwWkgYczXTXDMe9WDwe7PIAAAABuvV0Xzr7uF1SMm0j0okevxuwhMCF' +
            'RbOerwEAAAAzj75naNS5u7vg6bLNCTc+tc++nDMzSMxcAAAAAQAAFoAAAAAzj75naAAAADOPvmdoLCur' +
            'wI3RXio3O082uOONNCaOL5EAAAAArvAV+ORfFg1aBKGWGk19uDxpWkV+fiIkWwEAAAJR5PbT4MvZdtuH' +
            'jLiimcdnhbNI6TKH2m4GAAAAAQAAC0AAAABi+354pgAAAlHk9tPgpgOUfVePZWnuO69XlvZf8BzHjTsA' +
            'AAACuA/6/UZ+myPLTv0rQR48yVjdYBj+xnx0gQEAAAH38jLPmHhUCPYh7IdSdeq5grLJ7N3/9k7oAAAA' +
            'AQAAC0AAAABT/bMimgAAAffyMs+YTpbsTx+qRTynShhe/OncI3F8UJUBAAACY7QNrF0kaFoknkqcBjWI' +
            'NhgkiICcLaGFqQAAAAEAABaAAAACY7QNrF0AAAJjtA2sXYy5yceBWd2UZHzOlLJ8bJT3XnkiAQAAAet+' +
            'mSFo/V6xEWOKhdqqy8rbsGtb0IpSTjsAAAABAAAWgAAAAet+mSFoAAAB636ZIWisTPQqBlMhdavdoB1d' +
            'Jg4hNeIzSQAAAAM9NgN2R9lbltBpK4dHZ0tyJFuWFqFXycS6AQAAABDdCzYOg7v1ZL/YGtYz6n/pqZ7k' +
            'BscS9EAAAAABAAALQAAAAALPgd5YAAAAEN0LNg4jeClst35OziQr18E8ongjqdUwkAAAAACSi46KoSGZ' +
            'ZZgRFEG1UmNVvuGnXlr/p8tLAAAAAo2Y+VdN6KsTS3g0BfG/5A2WO23wvPTR1wQBAAAABjp3o4OXWcPN' +
            'eS7zgUtJ1ZtdWMlPrUCjQQAAAAEAABaAAAAABjp3o4MAAAAGOnejg0HbqTyPwzbBbmZKac+AJldb1K8S' +
            'AQAAA2xCJZEUiCvMiRHOWl0TPvfiopaGoWuy/1MAAAABAAAWgAAAA2xCJZEUAAADbEIlkRSW5uOyFaGB' +
            'eE9iLFclv4dkn0b8hAEAAAAaof6tJK4CoBvPyIm5zYNslaFa0I0DAXdNAAAAAQAAC0AAAAAEcFUc3AAA' +
            'ABqh/q0k7md7N7SMnce8u1qZ7zza/iG1Tn4AAAAC2fbY76DyEhIrSQASeAudDPtSCBr5cZuxUwEAAADk' +
            '0kARBJH5qFOo09UHXzNlMp6yjMHoBVicAAAAAQAAFoAAAADk0kARBAAAAOTSQBEEBGm9ERoB+XwvUDmC' +
            'og0GIMYSA/0BAAACzQJNz/Z6A5yDJeNdyNSW1L+irfZN+NpYRQAAAAEAABaAAAACzQJNz/YAAALNAk3P' +
            '9grte35IRZZFznMf1gpDH0fsbgh6AAAAANIlCqNKBUnIybVhKsuJHiMrgaeH+72CipcAAAAArp3v7lub' +
            'ymFcF+x8X6sQer1ayMp1jrlWiwEAAAQQfjLXJ7IS3Zq3na6MsYcufha2Tm5gvr2xAAAAAQAAFoAAAAQQ' +
            'fjLXJwAABBB+Mtcn5XPFpovekv8bgRGTV2LSeiZleJUAAAACXoxQT4M7+VL2b5FDeiL8Y1dHlO1boy19' +
            '6AEAAAOcBs1QJwsPNgV1uujn9YRrWXf23JR0QKsvAAAAAQAAC0AAAACaASI4BwAAA5wGzVAnhdNFqitT' +
            '85qR1j+u1sme41jJRfkAAAAC6ttvlJrkUQTtZt4IVpXGMPPbiOARbrgajgAAAAHVpCh2w6PvV+HiS5PL' +
            '5s4wdjHd6qKO6i8PAAAAA2qxFnjjJl5FHtoCQxEJfO0uyXaCj9MG+OkBAAADFiD2hCtcPDqv69GPrUF7' +
            'J1ufmM68/Ru99gAAAAEAAAtAAAAAg7ApFggAAAMWIPaEK5BnIwlb6NRmmDQzimYNOTKOVNPjAAAAAY1F' +
            'x02zSd3uF8Vj4S/TaoBuM///DSp0gSwAAAADZ5wnyoHktQhKTfw0OpLTgiwg53rMarO+LQEAAAJflxqP' +
            'fHUakyXzvQFuqMGCr6xa8pbx1MG2AAAAAQAAFoAAAAJflxqPfAAAAl+XGo98TtdEztipo0zyipnMocYl' +
            'e2VSHzsAAAAB8OIqY4ZJ40Xz0UiBI4UHWjeUanUuMMH5qwEAAAIKm7AwSvDbPaXscFKMfNoshmPOuji4' +
            'FyTgAAAAAQAAFoAAAAIKm7AwSgAAAgqbsDBKluoH0jINLWuByiQ+CAG3gMo+8JgAAAAA1uRP/GEF1BOx' +
            '7I2paX5fa/wEkQDcMJcCTQEAAAH5Z+cQz7kBi6Rgajd3MHk58AA3NwBGMyJiAAAAAQAAC0AAAABUO/vY' +
            'IwAAAfln5xDP/3+ug/4aXTjAo5YwpNMt+nZ+lB0AAAAC4xiGzk8p0EDsMgk7BZ2Lp/Ipqs/8QkvT6wEA' +
            'AAGe+TeyjXZtAVYZPw0/Wm+gH1sTuonDC+zdAAAAAQAAFoAAAAGe+TeyjQAAAZ75N7KNxcAvQyI0dTnE' +
            'OU4b5XGOOLIXrOYBAAADvPpJRzblSEO08l6xF6oGQvBQPB7VBBg0cwAAAAEAAAtAAAAAn38MNokAAAO8' +
            '+klHNocR7UAAXunjaoZ8raL1kqQqMhaBAQAAA8avedwClf/LVcuz9RkrElWM+SyAjp8k+1sAAAABAAAL' +
            'QAAAAKEdPvoBAAADxq953ALOttlrLzsnbOrQj8LjeGNjY8MCmAEAAAEeregRRXA2d50cqQgJcXF4rsQ1' +
            'Iy0wCdkPAAAAAQAAC0AAAAAvx6atjAAAAR6t6BFF5pw0DA0RHO6/7cAqKwohgusbMJ4BAAABnR1KdPep' +
            'yuvGAvBWqAB0Mij3qHXgmM3pQgAAAAEAABaAAAABnR1KdPcAAAGdHUp092IPe5Uo8L6bEBfIcBszCCaU' +
            '3ZCFAQAAAlApip6i7sSV9Xf/cZOWcSnR3lvQ6qnjYiEAAAABAAALQAAAAGKxlxpxAAACUCmKnqLHZ87+' +
            '742b7VCY+mdcXgUivnErUQEAAAJc6SBPCXsPV1cyJmrWJbyix0y0MGvNdAxnAAAAAQAAC0AAAABk0YVi' +
            'ggAAAlzpIE8JJhdSTzJWBddPXWISNCnXKQbdSOEAAAAAshscJDuUrLmff96PmMXSHjv6iLnuakcuEQEA' +
            'AAF3oHpkI8BjHIpOQcNWshd7j/h9mICI5myBAAAAAQAAC0AAAAA+mr8QsQAAAXegemQjbgkIzm9ttUga' +
            'Xm481y+qKRjSeqwBAAAB7DzablqAf2gbs+/9SYhcADbIRJbS7G3c+QAAAAEAABaAAAAB7DzabloAAAHs' +
            'PNpuWtJEhwUaSZ9Tg+yvkFZ242oTVaxrAQAAA8zovmmlJrUqvQ9XKD75Ql3t/wHtYw/hqi4AAAABAAAL' +
            'QAAAAKImymbxAAADzOi+aaUscN6LWAC41YIiEiyUFT4nl8DbwwEAAAJrqfvqURra+7HArgPHeoZuZGfB' +
            'nZxo4oZcAAAAAQAAC0AAAABnRv9RuQAAAmup++pRZ77cbnKDpVQw4BL39bEWeOSwHw0AAAACC47Ibf40' +
            'xdAvwpS6spKJEDfGUOP0dfLvNgEAAADExu0Of/wIe/ktutHQJVsqBotvETusEBk8AAAAAQAAFoAAAADE' +
            'xu0OfwAAAMTG7Q5/npgGH2YQ5O69Zb8InpcJ+3Xb3hMAAAABGivkj2P3t+w3wcJlDbqHHLeZjaGprCzm' +
            'FwAAAAFfg6V+9IxjkTpCkTZ2heqwjjcQb3GjCEZTAQAAAZIMcUVqJ0k1ifmmNQt79Rs1dX0L2Mq+MloA' +
            'AAABAAAWgAAAAZIMcUVqAAABkgxxRWp9VLAV2l/GjEWTAZzpxeDaUsxNkgEAAAN2uVrw4g9W2DDeukSz' +
            'TyLxYqm5KFcw72fJAAAAAQAAFoAAAAN2uVrw4gAAA3a5WvDii7RScEJSU1x6ZmCL5M3F50xRHfQAAAAC' +
            '+CK5BiiMrHZJ7TrhEFQ8n0YRfoLMUczX2QAAAAJNvBcYruLQJ2TltxpinmOSf13f+cXn3J3jAAAAA5w4' +
            'C/BjVTkfE0Phx+Rb2fsm3J8RI3wFwTsBAAAAC+MMUH8dzPNaHQGQKnjqTKs7aWbbdH7dEwAAAAEAAAtA' +
            'AAAAAfssuBYAAAAL4wxQf4FwpwRoMuHItz9YGBRc6x1o3amtAQAAACwQMTvDUlbrOHxQG5guU3iG0q9/' +
            '+CrDFXMAAAABAAALQAAAAAdYCDShAAAALBAxO8MhD4gQOrLQfWJGyCsI5ZUmVdh8pQAAAADdRRBrv3G4' +
            'F2Tq3ImF+xUVZz2gqjVpGdAaAQAAAZYf2OJvN1smnhwcM8c/aZznmfFtvxDRU9gAAAABAAAWgAAAAZYf' +
            '2OJvAAABlh/Y4m8eR91nBeBI9qdg1mlPf8ZIzFLPmQEAAAI3vx7Pa5ty9e+2jB6gL+lO95IuG4TdDN1v' +
            'AAAAAQAAFoAAAAI3vx7PawAAAje/Hs9rgCRUm9RKMk+J4Mqy1pCGgnExdFcAAAAAUWefBW7kQ4xPetD+' +
            '/je2JzS83YLr60juHAEAAAGA5ARRy0KuCQ/K40H+qr7fyuDRlNACqSihAAAAAQAAC0AAAABAJgC4TQAA' +
            'AYDkBFHLlRXf6DznkAPPYQG5bSgjCxCB6WIBAAAB0PAwzsvj1VjB3iefUVXm0uENgye1iH8GWgAAAAEA' +
            'ABaAAAAB0PAwzssAAAHQ8DDOy2SmQ0XvARmN17wy1azFVYOFl8LmAAAAAuymvWJbap1uaBnvqo22bGoC' +
            'cg9XRK1olasAAAAA/lMYYTxyjHLVR/Pxkp4el+dp5sGYw2CyNwAAAANzjeaeP6Vn5Qo6zPTuJbEby9W8' +
            'yGOUlpj0AAAAAGJvsBrGU9LXiImw0pNsAfYsGPpChDfzxqUAAAACnha01XkWHT3K98ZVf4qFZ+eVZk69' +
            'HXgTZAAAAADG+hJMiXbLXYotByvgurHAZkCIfeoD4j/GAQAAAnwS195BXMR4RF6S2HEut98KOu46WyAn' +
            'MgUAAAABAAAWgAAAAnwS195BAAACfBLX3kGB7YYZXaVHVYpvlS5pPB0rTmAdhgEAAAOw7V2WAkTXOeZB' +
            'hAQ3gO4hKDzaPoI/obIIAAAAAQAAFoAAAAOw7V2WAgAAA7DtXZYCexCLXdJmUo3et6zTrM4JHLAHvHcB' +
            'AAAAo52G7qeniYMBQPn2IGmF4SyZvtqO5T3j8QAAAAEAAAtAAAAAG0Tr0nIAAACjnYbup/82u4K2pI3Z' +
            'h8SrLR0y1SaJZ5l2AQAAAM0wkaKTtJYt5lBGk9KdUOfTPfmHPMJYvIwAAAABAAAWgAAAAM0wkaKTAAAA' +
            'zTCRopP8K2cAplRi+V/cwUxuZsSR4QZlJQEAAAFrnAUfbjFv4oFVJrnxAqoTAfT+ir0cddG8AAAAAQAA' +
            'C0AAAAA8mgDakwAAAWucBR9uS6QEmO4u5Y4uSMXTZDH8ysKkgeUAAAABJql00I3a+i/3sQxVGNO8jvSH' +
            'NvKIDDwpCAAAAAG5PG0zfZL63kNtVx8yC/1rU/YJ+beMCq/MAQAAAfyrrlYeV08n7pDCSKBTHhoQtuof' +
            'LbLc5vIAAAABAAAWgAAAAfyrrlYeAAAB/KuuVh6t32k0jFALkuXmJTd3CVbsSVqr9gAAAAJGVwd4qfoE' +
            '4hQZ0AIEtzoGqvhfroylPD7hAAAAATCkdqWwldyF7Ow6kOLADIO7fufoY/2MCtwBAAADn+uup3jSsj0K' +
            '3MSzvXONYK4E0E+ydYu0MQAAAAEAABaAAAADn+uup3gAAAOf666neJlIQtZB2w+EQBPHLR9hU4c7Pc8p' +
            'AQAAAHrMSxVGaFi1A/Bg67LMchAQLHHATlbxJ1oAAAABAAALQAAAABR3YdjhAAAAesxLFUaL9KQCAqp4' +
            'Q5SOagEaGjf7lDpynQAAAABBumWs5OROJv8K/JWHN97QVURIoPj96+bXAQAAAzOvVCYV6OmPb3ZVZhDT' +
            'huOTXPAGcUPCMUAAAAABAAAWgAAAAzOvVCYVAAADM69UJhWOjYkDOqh2GLtyhACzalkqt6i5GAAAAABk' +
            'HOEzHn2NueFUN/i1nufAJm5Ac7Whv/IvAQAAAnaJFcF5fLjdbjLqfgEZqSxvEzn1UcW6XekAAAABAAAL' +
            'QAAAAGkW2PWVAAACdokVwXmQSClXUuSIAuzoqKB4jFwZAJuMdgEAAAHsD0/gGtLI0Rhf68pXNo8w6tke' +
            'Dbl7/leEAAAAAQAAFoAAAAHsD0/gGgAAAewPT+AaCOUy0dRimkU3sK1J9IqLyEwVekoBAAAD1asYkCaI' +
            'LiY2H+HviJLKv8bvJpZp3yEU5AAAAAEAAAtAAAAAo5yEGAcAAAPVqxiQJviZYUNe7PwjCxRRwmdn2qbL' +
            'ShqZAQAAAj7b2zm/blSYRSUbnvVCJTGqqdqvIGdeXlIAAAABAAAWgAAAAj7b2zm/AAACPtvbOb9X+fT7' +
            '4TMZImyXLXIuIgWFUyD5uAEAAAIPegL2Y5UScwJ9ZTWVekf09n4XUKQhwkvjAAAAAQAAC0AAAABX6asp' +
            'EQAAAg96AvZjv7BLmwd9zQiXxIRalCtzU+r8G3wBAAAEBj9a7W52WYLujJxZpIibUJZrq7ka4SDDEQAA' +
            'AAEAABaAAAAEBj9a7W4AAAQGP1rtbvPLOoPC9Vea1GXBedP3t7MHPoMsAQAAAgBURMd+ePmpTRjQCgCi' +
            '5pVFGkD2qs/bOPIAAAABAAAWgAAAAgBURMd+AAACAFREx35sf7kDiNf4hPKBPARdgY4/AAtsaAEAAAEI' +
            'I2jMolR1W14pluv9x/6myqzxn3ZUEenzAAAAAQAAFoAAAAEII2jMogAAAQgjaMyiEIZJWfKO8Y1GoDU9' +
            'rEsVumVGFgEAAAABDnO2+5f7Yo9xYe4kL5omlRWQaOFVp1fkRwEAAABQ82mtvY9XMFguE8guQcqN7PcZ' +
            'aP59u73nAAAAAQAAFoAAAABQ82mtvQAAAFDzaa29HbkxrjlvrxypwVCKBXGLscWZxBsBAAACbbcPl4DZ' +
            'q3f07ciGYXAPXG+EQbptqwEXgAAAAAEAAAtAAAAAZ56CmUAAAAJttw+XgKh3+qgc1B4nsn6iKBWKH8/1' +
            'k3DaAQAAAygH/3wfau3GDF2ltpK1zQVT/YbUHG1O6BUAAAABAAAWgAAAAygH/3wfAAADKAf/fB8SWgnh' +
            'KY7eEBq1dn7EdblSHhwwiAEAAAMiqJ4ySyyTQbUeHOhqhls8J6pSa9FOTdORAAAAAQAAC0AAAACFxsUI' +
            'YgAAAyKonjJL13wA6mHCW2/OQD28IMlARXIpkYABAAAiUPS1kYdh8z8IT9HgqMC1auELaAZIShQtEgAA' +
            'AAEAAAtAAAAFuCjI7ZcAACJQ9LWRhw=='
    }
};
// TODO
GenesisConfig.CONFIGS['main'] = GenesisConfig.CONFIGS['test'];
