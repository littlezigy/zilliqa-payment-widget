<template>
<div class = 'card' id = 'widget'>
    <img alt="Zilliqa logo" src="../assets/logo.png">
    <p class = 'title'>xdPay</p>
    <p v-if = 'network != "mainnet"' id = 'network'>({{ network }})</p>

    <p id = 'price'>{{ amount }} XGSD.</p>
    <p class = 'subtitle'>You can pay this in any ZRC20 token</p>

    <label for ='tokens'>Choose token</label>
    <select id = 'token' v-model = 'paymentToken'>
        <option v-for = '(token, name, index) in tokens' :value = '{ id: token, name}' :key = 'index'>{{ name }}</option>
    </select>

    <p class = 'error' v-if = 'error'>{{ error }}</p>
    <button @click = 'pay'>Pay {{ payAmount.toFixed(4) }} {{ paymentToken.name }}</button>

    <button id = 'showAdvanced' @click = 'showAdvanced = !showAdvanced'>Show Advanced</button>

    <div class = 'debug'>
        <div v-if = 'slippage > slippageHigh'>
            <p v-if = 'slippage <= slippageMax'>Slippage is getting high. You are probably getting close to the pool limit. Try reducing the payment amount</p>
            <p v-else>Slippage is too high. You are probably getting close to the pool limit. Try reducing the payment amount</p>
            <p>Slippage: <em>{{ slippage.toFixed(2) }}%</em></p>
        </div>
    </div>

    <div id = 'advanced' v-if = 'showAdvanced'>
        <p>Slippage: {{ slippage }}</p>
    </div>

</div>
</template>

<script src = './widget.js'></script>

<style scoped>
.subtitle {
    font-size: 0.7em;
    font-weight: bold
}

#price {
    font-size: 2em;
}
.card {
    border-radius: 1.5em;
    box-shadow: 1px 1px 10px rgba(165, 165, 165, 0.4);
    width: fit-content;
    padding: 1.5em;
}
#network {
    font-weight: bold;
    font-size: 0.8em;
    text-transform: uppercase;
}
.title {
    text-transform: uppercase;
    font-weight: bold;
}


button,
input[type=submit] {
    display: block;
    margin: 1em auto;
    background: skyblue;
    border-radius: 5px;
    border: 2px solid skyblue;
    color: white;
    font-weight: bold;
    font-size: 1.5rem;
}

button:hover,
input[type=submit]:hover {
    border: 2px solid skyblue;
    color: #4d97b5;
    background: none;
}


select {
    margin: 2em;
}
select {
    margin: 2em;
}

input[type=text],
input[type=number],
select,
input[type=submit],
button {
    padding: 0.5em 1em;
}
#showAdvanced {
    border-top: none;
    border-left: none;
    border-right: none;
    color: #4d97b5;
    background: none;
    padding: 0 0 0.1em 0;
    font-size: 1rem;
    border-radius: 0;
}
</style>
