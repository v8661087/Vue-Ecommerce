<template>
  <nav id="nav">
    <router-link style="text-decoration:none" id="logo" to="/">
      <img src="../assets/pokeball.png" alt="pokeball" />Pokemon
    </router-link>
    <router-link to="/">首頁</router-link>
    <router-link to="/about">關於</router-link>
    <router-link to="/game">Game</router-link>
    <router-link to="/cart">購物車({{cart.length}})</router-link>
    <router-link v-if="!logining" to="/login">登入</router-link>
    <router-link v-else to="/dashboard">Dashboard</router-link>
    <a v-if="logining" @click="logout">登出</a>
  </nav>
</template>

<script>
export default {
  name: "Navber",
  props: { logining: Boolean, cart: Array },
  methods: {
    logout() {
      setTimeout(() => {
        this.$store.state.logining = false;
        this.$router.push("/login");
      }, 500);
    },
  },
};
</script>

<style>
</style>