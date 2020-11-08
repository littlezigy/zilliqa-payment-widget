<template>
  <div id="app">
    <Widget merchantAddress = 'merchantAddress' :amount = 'amount' msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import Widget from './components/widget.vue'

export default {
    name: 'App',
    data() {
        return {
            amount: 100,
            merchantAddress: 'zil15q2gxq7tze6k025apsa3c362chz6k76zrmnzkk'
        }
    },
    components: {
        Widget
    }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
