<template>
<div class = 'card' id = 'widget'>
    <h4>Pay Using a ZRC20 token</h4>
    <p v-if = 'network != "mainnet"' class = 'subtitle'>({{ network.toUpperCase() }})</p>

    <p>You are paying {{ amount }} XGSD. You can pay this in any ZRC20 token</p>

    <label for ='tokens'>Choose token</label>
    <select id = 'token' v-model = 'paymentToken'>
        <option v-for = '(token, name, index) in tokens' :value = 'token' :key = 'index'>{{ name }}</option>
    </select>

    <button @click = 'pay'>Pay {{ amount }} </button>

</div>
</template>

<script src = './widget.js'></script>

<style scoped>
.card {
    border-radius: 1.5em;
    box-shadow: 1px 1px 10px rgba(165, 165, 165, 0.4);
    width: fit-content;
    padding: 1.5em;
}
input[type=submit] {
    display: block;
}
.subtitle {
    font-weight: bold;
    font-size: 0.8em;
}
</style>
