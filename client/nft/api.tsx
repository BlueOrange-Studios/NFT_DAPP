import Web3 from 'web3';
import {AbiItem} from 'web3-utils';
import {Contract} from 'web3-eth-contract';

import meta from './meta.json';
import token from './Marmal.json';
import logger from '../util/logger';

declare let window: any;

class Engine {
    web3: Web3;
    account: String;
    contract: Contract;

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
                try {
                    await window.ethereum.enable();
                }catch(e){}
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

        // init account
        try {
            const accounts = await this.web3.eth.getAccounts();
            this.account = accounts[0];
            logger.info(`connected to account: ${this.account}`);
        }catch(e) {
            logger.warn(e);
        }

        // init contract
        this.contract = new this.web3.eth.Contract(token.abi as AbiItem[], meta.address);
        logger.info(`connected to contract: ${meta.address}`);
    }

    // implement
    async claim(long: number, lat: number, depth: number, name: String, kind: String) {
        if(this.contract && this.account) {
            this.contract.methods.claim(
                long,
                lat,
                depth,
                name,
                kind
            ).send({
                from: this.account,
                value: Web3.utils.toWei('0.015', 'ether')
            }).then(()=>{
                logger.info(`(long: ${long}, lat: ${lat}, depth: ${depth}, name: ${name}, kind: ${kind}) claimed!`);
            });
        } else {
            logger.error("contract or account is not initialized");
            await this.connect();
        }
    }
}

const engine = new Engine();

export default engine;