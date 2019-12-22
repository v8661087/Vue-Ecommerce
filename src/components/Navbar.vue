<template>
  <div id="nav">
    <router-link to="/">Home</router-link>|
    <router-link to="/cart">購物車({{cart.length}})</router-link>|
    <router-link v-show="!logining" to="/login">登入</router-link>
    <router-link v-show="logining" to="/dashboard">Dashboard</router-link>|
    <a style="cursor:pointer" v-show="logining" @click="logout">登出</a>
  </div>
</template>

<script>
export default {
  name: "navber",
  props: { logining: Boolean, cart: Array },
  methods: {
    logout() {
      this.$store.state.logining = false;
      this.$router.push("/login");
    }
  }
};
</script>

<style>
</style>