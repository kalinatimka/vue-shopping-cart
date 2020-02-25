<template>
  <div>
    <h2>Product List</h2>
    <img v-if="loading" src="../assets/loader.gif" alt />
    <ul>
      <li v-for="product in products" :key="product.id">
        {{ product.title }} - {{ product.price }}. In stock: {{ product.inventory }}
        <button
          @click="addToCart(product)"
          :disabled="!product.inventory"
        >Add to cart</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false
    };
  },

  computed: {
    products() {
      return this.$store.state.products;
      // return this.$store.getters.availableProducts;
    },

    cart() {
      return this.$store.state.cart;
    }
  },

  methods: {
    addToCart(product) {
      this.$store.dispatch("addProductToCart", product);
    }
  },

  mounted() {
    this.loading = true;
    this.$store.dispatch("fetchProducts").then(() => {
      this.loading = false;
    });
  }
};
</script>

<style scoped>
</style>