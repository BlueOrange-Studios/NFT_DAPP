import Web3 from 'web3';

import logger from '../util/logger';

declare let window: any;

class Engine {
    web3: Web3;

    constructor() {
        // 1. Initializing this.web3
        this.initWeb3().then(()=>{
            // 2. Connect to block-chain
            this.connect();
        });
    }

    async initWeb3() {
        if(this.web3!=null) {
            logger.warn("web3 is already initialized");
        }else {
            logger.info("initializing web3");
            if (window.ethereum) {
                this.web3 = new Web3(window.ethereum);
                await window.ethereum.enable();
            }else if (window.web3) {
                this.web3 = new Web3(window.web3.currentProvider);
            }else {
                logger.error("Unable to initialize Web3");
                this.web3 = null;
            }
        }
    }

    /** Connect to block-chain
     * 
     */
    async connect() {
        logger.info("connecting to block-chain");

        const accounts = await this.web3.eth.getAccounts();
        // TODO initialize accounts
    }
}

const engine = new Engine();

export default engine;