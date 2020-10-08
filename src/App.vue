<template>
  <div id="app">
    <Navbar :logining="logining" :cart="cart" />
    <keep-alive include="product,game,cart">
      <router-view class="container" />
    </keep-alive>
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
  created() {
    if (localStorage.getItem("cart")) {
      this.$store.state.cart = JSON.parse(localStorage.getItem("cart"));
    }
  },
};
</script>
<style lang="scss">
</style>
