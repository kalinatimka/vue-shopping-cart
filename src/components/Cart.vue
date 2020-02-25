<template>
  <div>
    <h2>My cart:</h2>
    <ul>
      <li v-for="cartItem in cart" :key="cartItem.id">
        {{ cartItem.title }} - {{ cartItem.price }}. In cart: {{ cartItem.quantity }}
        <button
          @click="removeFromCart(cartItem.id)"
        >Remove</button>
      </li>
    </ul>
    <p v-if="cart.length">Cart price: {{ cartTotal }}</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      cart: "cartProducts",
      cartTotal: "cartTotalPrice"
    })
  },
  methods: {
    removeFromCart(cartItem) {
      this.$store.dispatch("removeProductFromCart", cartItem);
    }
  }
};
</script>