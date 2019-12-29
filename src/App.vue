<template>
  <div id="app">
    <Navbar :logining="logining" :cart="cart" />
    <router-view class="container" />
    <TheFooter />
  </div>
</template>
<script>
import "@/assets/css/app.scss";
import Navbar from "@/components/Navbar";
import TheFooter from "@/components/TheFooter";
import {mapState} from "vuex"
export default {
  name: "app",
  components: { Navbar, TheFooter },
  computed:mapState(["cart","logining"]),
  methods: {
    fetchData() {
      this.fetchProducts();
      this.fetchOrders();
    },
    fetchProducts() {
      this.$store.dispatch("getProducts",process.env.VUE_APP_PRODUCTS_URL)
    },
    fetchOrders() {
      this.$store.dispatch("getOrders",process.env.VUE_APP_ORDERS_URL)
    }
  },
  mounted() {
    if (localStorage.getItem("cart")) {
      this.$store.state.cart = JSON.parse(localStorage.getItem("cart"));
    }
    this.fetchData();
  },
  updated() {
    this.fetchData();
  }
};
</script>
<style lang="scss">
.container {
  width: 100%;
  min-height: 70vh;
  background-image: url("./assets/pokemon-background.jpg");
  background-position: right;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  padding: 69px 0;
  text-align: center;
}
</style>
