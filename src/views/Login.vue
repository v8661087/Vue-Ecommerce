<template>
  <div class="login">
    <form @submit.prevent="login" autocomplete="off" method="post">
      <div class="form-group">
        <label for="useremail">Email</label>
        <input type="email" id="useremail" name="email" required="true" v-model="email" />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          required="true"
          v-model="password"
          autocomplete="off"
        />
      </div>
      <input type="submit" value="登入" />
    </form>
    <div class="loading" v-show="loading"></div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      email: "test@test.com",
      password: "test",
      loading: false
    };
  },
  methods: {
    async login() {
      this.loading = true;
      try {
        await axios
          .post(process.env.VUE_APP_LOGIN_URL, {
            email: this.email,
            password: this.password
          })
          .then(res => {
            this.$store.state.token = res.data.token;
          });
        setTimeout(() => {
          this.$store.state.logining = true;
          this.loading = false;
          this.$router.push("/dashboard");
        }, 500);
      } catch (err) {
        const accounts = this.$store.state.accounts;
        let account = accounts.find(
          item => item.email === this.email && item.password === this.password
        );
        if (account) {
          this.loading = true;
          this.$store.state.token = "";
          setTimeout(() => {
            this.$store.state.logining = true;
            this.loading = false;
            this.$router.push("/dashboard");
          }, 500);
        } else {
          this.loading = false;
          alert("Email或Password錯誤");
        }
      }
    }
    /*login() {
      
      const accounts = this.$store.state.accounts;
      let account = accounts.find(
        item => item.email == this.email && item.password == this.password
      );
      if (account) {
        this.loading = true;
        setTimeout(() => {
          this.$store.state.logining = true;
          this.loading = false;
          this.$router.push("/dashboard");
        }, 500);
      }
    }*/
  },
  computed: {
    account() {
      return this.$store.state.accounts;
    }
  },
  mounted() {
    if (this.$store.state.logining) {
      this.$router.push("/");
    }
  }
};
</script>

<style lang='scss'>
</style>