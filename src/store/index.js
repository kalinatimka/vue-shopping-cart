import Vue from 'vue';
import Vuex from 'vuex';
import shop from '../api/shop';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    cart: [],
  },

  getters: { // == computed properties
    availableProducts(state) {
      return state.products.filter(item => item.inventory > 0);
    },

    cartProducts(state) {
      return state.cart.map(cartItem => {
        const product = state.products.find(product => product.id === cartItem.id);
        return {
          id: product.id,
          title: product.title,
          price: product.price,
          quantity: cartItem.quantity,
        }
      }).filter(item => item.quantity > 0);
    },

    cartTotalPrice(state, getters) {
      return getters.cartProducts.reduce((acc, item) => {
        return acc += item.price * item.quantity;
      }, 0);
    }
  },

  actions: {
    fetchProducts({ commit }) {
      return new Promise((res) => {
        shop.getProducts(products => {
          commit('setProducts', products);
          res();
        })
      })
    },

    addProductToCart(store, product) {
      if (product.inventory > 0) {
        const cartItem = store.state.cart.find(item => item.id === product.id);
        if (!cartItem) {
          store.commit('pushProductToCart', product.id);
        }
        else {
          store.commit('incrementItemCount', cartItem);
        }
        store.commit('decrementItemInventory', product);
      }
    },

    removeProductFromCart(store, cartItemId) {
      const cartItem = store.state.cart.find(item => item.id === cartItemId);
      store.commit('removeItemFromCart', cartItem);
      const productItem = store.state.products.find(item => item.id === cartItemId);
      store.commit('backItemToList', productItem);
    }

  },

  mutations: {
    setProducts(state, products) {
      state.products = products;
    },

    pushProductToCart(state, productId) {
      state.cart.push({
        id: productId,
        quantity: 1,
      });
    },

    incrementItemCount(state, cartItem) {
      cartItem.quantity++;
    },

    removeItemFromCart(state, cartItem) {
      cartItem.quantity--;
    },

    decrementItemInventory(state, product) {
      product.inventory--;
    },

    backItemToList(state, product) {
      product.inventory++;
    }
  }
});