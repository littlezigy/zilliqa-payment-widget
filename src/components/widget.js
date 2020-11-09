import { BigNumber } from 'bignumber.js';
import { Zilswap } from 'zilswap-sdk';
import axios from 'axios';

export default {
    data() {
        return {
            wallet: null,
            payAmount: null,
            tokens: [],
            paymentToken: {id: null, name: ''},
            network: '',
            testnet: { tokens: [] },
            mainnet: { tokens: [] },
            slippage: 0,
            slippageHigh: 5,
            slippageMax: 10,
            showAdvanced:false,

            success: null,
            error: false
        }
    },

    props: {
        merchantAddress: String,
        amount: Number,
        debug: Boolean
    },
    watch: {
        paymentToken: function() {
            this.payAmount = null;
            return this.fetchRates();
        }
    },
    methods: {
        fetchRates: function() {
            let amount = this.amount * (10**6);

            const provider = window.zilPay;
            let zilSwap = new Zilswap(this.network, provider);

            if(this.paymentToken.name == 'XSGD') {
                return this.payAmount = this.amount;
            } else {

                console.log(this.paymentToken.id, this.tokens.XSGD, this.amount.toString())
                return zilSwap.initialize()
                .then(() => zilSwap.getRatesForOutput(this.paymentToken.id, this.tokens.XSGD, amount.toString()))
                .then(res => {
                    console.log('RESS', res);
                    console.log('SLIPPAGE TO STR', new BigNumber(res.slippage).toString());
                    console.log('SLIPPAGE TO Number', new BigNumber(res.slippage).toNumber());
                    console.log('EXPECTED AMT String', new BigNumber(res.expectedAmount).toString());
                    console.log('EXPECTED AMT NUMBER', new BigNumber(res.expectedAmount).toNumber());

                    let exponent;

                    switch(this.paymentToken.name) {
                        case 'BOLT':
                            exponent = 18;
                            break;
                        case 'CARB':
                            exponent = 8;
                            break;
                        case 'gZIL':
                            exponent = 15;
                            break;
                        case 'RedC':
                            exponent = 2;
                            break;
                        case 'SERGS':
                            exponent = 5;
                            break;
                        case 'SHRK':
                            exponent = 6;
                            break;
                        case 'SWTH':
                            exponent = 8;
                            break;
                        case 'ZLF':
                            exponent = 5;
                            break;
                        case 'ZLP':
                            exponent = 18;
                            break;
                        case 'ZYF':
                            exponent = 3;
                            break;
                        default:
                        case 'ZIL':
                            exponent = 12;
                            break;
                    }

                    this.payAmount = res.expectedAmount / ( 10 ** exponent);
                    this.slippage = res.slippage;
                });
            }
        },

        pay: function() {
            // const pro = WalletProvider;
            if(this.paymentToken.name == 'XSGD')
                return this.payXSGD();
            else return this.payInZRC20();
        },
        payXSGD: function() {
        },
        payInZRC20: function() {
            const provider = window.zilPay;
            let amount = this.amount * (10**6);

            let zilSwap = new Zilswap(this.network, provider);
            console.log('ZILSWAP PARAMETERS');
            console.log(
                this.paymentToken.id, this.tokens.XSGD,
                this.amount.toString(), 2, this.merchantAddress
            );
            return zilSwap.initialize()
            .then(() => zilSwap.swapWithExactOutput(
                this.paymentToken.id, this.tokens.XSGD,
                amount.toString(), 10, this.merchantAddress
            )).then(res => {
                console.log('RESPONSE', res);
                this.success = true;
            }).catch(e => {
                if(e.message.includes('Insufficent') && e.message.includes('in wallet')) {
                    return this.error = 'Insufficent ' + this.paymentToken.name + ' in wallet';
                } else throw e;
            });
        },
        detectNetwork: function() {
            this.network = (window.zilPay.wallet.net == 'testnet') ? 'TestNet' : 'MainNet';
        },
        fetchTokens: function() {
            return axios.get('https://raw.githubusercontent.com/Switcheo/zilswap-token-list/master/tokens.json')
            .then(res => {
                this.mainnet.tokens = res.data.MainNet;
                this.testnet.tokens = res.data.TestNet;
            });
        },
        setTokens: function() {
            if (this.network.match(/testnet/i)) 
                this.tokens = this.testnet.tokens;
            else if(this.network.match(/mainnet/i))
                this.tokens = this.mainnet.tokens;
        }, 
        initZq: function() {
            return window.zilPay.wallet.connect()
            .then(res => {
                if(res === true) {
                    this.wallet = window.zilPay.wallet.defaultAccount;

                    this.detectNetwork();

                    return this.fetchTokens()
                    .then(() => this.setTokens())
                    .then(() => this.paymentToken = { id: this.tokens.ZIL, name: 'ZIL' });

                } else if(res === false)
                    alert("Could not connect to ZilPay wallet");
                else {
                    alert("Something else is the matter. Check console");
                }
            });
        }
    },
    mounted() {
        if(!this.merchantAddress) {
            this.error = 'Please supply merchantAddress to the widget component';
            throw 'Please supply merchantAddress to the widget component';
        }

        let counter = 5;
        let refresh = setInterval(() => {
            if(typeof window.zilPay !== 'undefined') {
                clearInterval(refresh);
                return this.initZq()
                .then(() => this.fetchRates());
            } else
                counter--;
            if(counter == 0) {
                return alert("You need to have the ZilPay browser extension installed\nGet it here: https://chrome.google.com/webstore/detail/zilpay/klnaejjgbibmhlephnhpmaofohgkpgkd");
            }
        }, 500);

    }
}
