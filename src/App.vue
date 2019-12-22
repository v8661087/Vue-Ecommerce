<template>
  <div id="app">
    <Navbar :logining="logining" :cart="cart" />
    <router-view class="container" />
    <Footer />
  </div>
</template>
<script>
import "@/assets/css/app.scss";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import axios from "axios";
import store from "./store";
import {mapState} from "vuex"
export default {
  name: "app",
  components: { Navbar, Footer },
  computed:mapState(["cart","logining"]),
  methods: {
    fetchData() {
      this.fetchProducts();
      this.fetchOrders();
    },
    fetchProducts() {
      axios
        .get(process.env.VUE_APP_PRODUCTS_URL)
        .then(response => {
          store.state.products = response.data;
        })
        .catch(error => console.log(error));
    },
    fetchOrders() {
      axios
        .get(process.env.VUE_APP_ORDERS_URL)
        .then(response => {
          store.state.orders = response.data;
        })
        .catch(error => console.log(error));
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
  padding: 69px 0;
  text-align: center;
}
</style>
