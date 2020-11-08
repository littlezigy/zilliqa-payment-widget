import { Zilswap } from 'zilswap-sdk';
import axios from 'axios';

export default {
    data() {
        return {
            wallet: null,
            amount: 100,
            tokens: [],
            paymentToken: null,
            network: '',
            testnet: { tokens: [] },
            mainnet: { tokens: [] },
            merchantAddress: 'zil15q2gxq7tze6k025apsa3c362chz6k76zrmnzkk'
        }
    },
    methods: {
        pay: function() {
            if(this.paymentToken == this.tokens.XSGD)
                return this.payXSGD();
            else return this.payInZRC20();
        },
        payXSGD: function() {
        },
        payInZRC20: function() {
            // TODO: Fix constructor function error
            let zilSwap = new Zilswap(this.network, window.zilPay);
            console.log('ZILSWAP OBJ', zilSwap);
            return zilSwap.swapWithExactOutput(this.paymentToken, this.tokens.XSGD, this.amount, 200, this.merchantAddress)
            .then(res => {
                console.log('RESPONSE', res);
            });
        },
        detectNetwork: function() {
            console.log('SETTING NETWORK');
            console.log('NETWORK IS', window.zilPay.wallet.net);
            this.network = window.zilPay.wallet.net;
            console.log('NETWOK SET', this.network);
        },
        fetchTokens: function() {
            return axios.get('https://raw.githubusercontent.com/Switcheo/zilswap-token-list/master/tokens.json')
            .then(res => {
                this.mainnet.tokens = res.data.MainNet;
                this.testnet.tokens = res.data.TestNet;
            });
        },
        setTokens: function() {
            console.log('SETTING TOKENS');
            console.log('NETWORK', this.network);
            if (this.network == 'testnet') 
                this.tokens = this.testnet.tokens;
            else if(this.network == 'mainnet')
                this.tokens = 'mainnet';
        }
    },
    mounted() {
        if(typeof window.zilPay == 'undefined') {
            alert("You need to have the ZilPay browser extension installed\nGet it here: https://chrome.google.com/webstore/detail/zilpay/klnaejjgbibmhlephnhpmaofohgkpgkd");
        } else {
            console.log('ZILPAY', typeof window.zilPay);
            return window.zilPay.wallet.connect()
            .then(res => {
                if(res === true) {
                    this.wallet = window.zilPay.wallet.defaultAccount;

                    this.detectNetwork();

                    return this.fetchTokens()
                    .then(() => this.setTokens())
                    .then(() => this.paymentToken = this.tokens[0]);

                } else if(res === false)
                    alert("Could not connect to ZilPay wallet");
                else {
                    alert("Something else is the matter. Check console");
                    console.log('res', res);
                }
            });
        }
    }
}
