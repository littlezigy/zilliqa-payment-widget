import { Zilswap } from 'zilswap-sdk';
import { Zilliqa } from '@zilliqa-js/zilliqa';
// import * as sdk from 'zilswap-sdk';
import axios from 'axios';

let zq = new Zilliqa();

export default {
    data() {
        return {
            wallet: null,
            payAmount: 100,
            tokens: [],
            paymentToken: {id: null, name: ''},
            network: '',
            testnet: { tokens: [] },
            mainnet: { tokens: [] },
        }
    },

    props: {
        merchantAddress: String,
        amount: Number
    },
    methods: {
        fetchRates: function() {
            const provider = window.zilPay;
            let zilSwap = new Zilswap(this.network, provider);
            zilSwap.initialize();
            console.log('ZIL SWAP', zilSwap);

            if(this.paymentToken.name == 'XSGD') {
                return this.amount;
            } else {
                let zilswap = new Zilswap(this.network, provider);

                return zilswap.getRatesForOutput(this.paymentToken.id, this.tokens.XSGD, this.amount)
                .then(res => {
                    console.log('RESULT RATES', res.data);
                    this.payAmount = res.data;
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
            zq = new Zilliqa(null, window.zilPay.provider);
            console.log('ZQ', zq);
            const provider = window.zilPay;

            let zilSwap = new Zilswap(this.network, provider);
            console.log('ZILSWAP OBJ', zilSwap);
            zilSwap.initialize();
            console.log('AFTER INIT', zilSwap);

            return zilSwap.swapWithExactOutput(this.paymentToken.id, this.tokens.XSGD, this.amount, 200, this.merchantAddress)
            .then(res => {
                console.log('RESPONSE', res);
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
                    delete zq.subscriptionBuilder;
                    //console.log('WIN ZILOPAY', zq);
                    //let zilswap = new Zilswap(this.network, { ...zq, wallet: this.wallet });
                    // console.log('ZILPAY', zilswap);

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
