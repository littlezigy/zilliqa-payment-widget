<template>
  <div id="widget">
    <Widget :merchantAddress = 'merchantAddress || merchantaddress' :amount = 'amount' :debug = 'debug' msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import Widget from './components/widget.vue'

export default {
    name: 'App',
    props: [
        'amount',
        'merchantAddress',
        'merchantaddress',
        'debug'
    ],
    components: {
        Widget
    }
}
</script>

<style>
#widget {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.debug {
    font-size: 0.8em;
    color: darkblue;
    font-weight: bold;
}
.debug em {
    font-size: 1.3em;
    font-style: unset;
}
.error {
    font-size: 0.8em;
    color: red;
}
p {
    max-width: 300px;
}
button[disabled]:hover,
button[disabled] {
    background: white;
    color:grey;
    border-color: grey;
    cursor: not-allowed;
}
</style>

