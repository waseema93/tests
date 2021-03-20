<template>
  <div id="app">
    <Checkout/>
  </div>
</template>

<script>
import Checkout from "./components/checkout.vue"
export default {
  name: 'App',
  components: {
    Checkout
  }
 
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0px;
  padding:0px;
}
body{
  margin: 0px;
  padding:0px;
  }

</style>
