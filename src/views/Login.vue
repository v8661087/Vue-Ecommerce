<template>
  <div class="login">
    <form @submit.prevent="login" autocomplete="off" method="post">
      <div class="form-group">
        <label for="useremail">Email</label>
        <input type="email" id="useremail" name="email" required="true" v-model="email" />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" name="password" required="true" v-model="password" />
      </div>
      <input type="submit" value="登入" ref="button" />
    </form>
    <div class="loading" v-show="loading"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "test@test.com",
      password: "test",
      loading:false
    };
  },
  methods: {
    login() {
      const accounts = this.$store.state.accounts;
      let account = accounts.find(
        item => item.email == this.email && item.password == this.password
      );
      if (account) {
        this.loading = true
        setTimeout(() => {
          this.$store.state.logining = true;
          this.loading = false
          this.$router.push("/dashboard");
        }, 500);
      }
    }
  },
  computed: {
    account() {
      return this.$store.state.accounts;
    }
  },
  mounted(){
    if(this.$store.state.logining){
      this.$router.push("/")
    }
  },
};
</script>

<style lang='scss'>
</style>