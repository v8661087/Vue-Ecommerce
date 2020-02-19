<template>
  <div id="app">
    <Navbar :logining="logining" :cart="cart" />
    <router-view class="container" />
  </div>
</template>
<script>
import "@/assets/css/app.scss";
import Navbar from "@/components/Navbar";
import { mapState } from "vuex";
export default {
  name: "app",
  components: { Navbar },
  computed: mapState(["cart", "logining"]),
  methods: {
    fetchData() {
      this.fetchProducts();
      this.fetchOrders();
      this.fetchCoupons();
    },
    fetchProducts() {
      this.$store.dispatch("getProducts", process.env.VUE_APP_PRODUCTS_URL);
    },
    fetchOrders() {
      this.$store.dispatch("getOrders", process.env.VUE_APP_ORDERS_URL);
    },
    fetchCoupons() {
      this.$store.dispatch("getCoupons", process.env.VUE_APP_COUPONS_URL);
    }
  },
  created() {
    if (localStorage.getItem("cart")) {
      this.$store.state.cart = JSON.parse(localStorage.getItem("cart"));
    }
    this.fetchData();
  }
};
</script>
<style lang="scss">
</style>
