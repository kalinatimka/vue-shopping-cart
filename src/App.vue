<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <ProductsList/>
    <Cart/>
  </div>
</template>

<script>
  import ProductsList from './components/ProductsList.vue'
  import Cart from './components/Cart.vue'

  export default {
    name: 'App',
    components: {
      ProductsList,
      Cart,
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

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
