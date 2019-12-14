<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/cart">購物車({{cart.length}})</router-link> |
      <router-link v-show="!this.$store.state.logining" to="/login">登入</router-link>
      <router-link v-show="this.$store.state.logining" to="/dashboard">Dashboard</router-link> |
      <a style="cursor:pointer" v-show="this.$store.state.logining" @click="logout">登出</a>
    </div>
      <router-view class="container"/>
    <footer>
      <div><a href="https://github.com/v8661087/Vue-Ecommerce" target="_blank">View Source on Github</a></div>
      <div>2019</div>
    </footer>
  </div>
</template>
<script>
export default {
  name:"app",
  computed:{
    cart(){
      return this.$store.getters.data.cart
    }
  },
  methods:{
    logout(){
      this.$store.state.logining = false
      this.$router.push("/login")
    }
  }
}
</script>
<style lang="scss">

html,body{
  margin:0;
  padding: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background:#17181c;
  color:white;
  user-select: none;
}
ul{
  list-style: none;
  margin: 0;
  padding:0
}
#app {
  min-height: 100vh;
  position: relative;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#nav {
  position: fixed;
  top:0;
  left:0;
  width: 100%;
  height: 45px;
  padding: 9px 15px;
  background: #17181c;
  display: flex;
  align-items: center;
  z-index: 1;
  a {
    font-weight: bold;
    text-decoration: none;
    color: white;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
input[type="submit"]{
  color:white;
  width: 100%;
  background: #167bff;
  border:none;
  outline:none;
  padding: 9px 18px;
  cursor: pointer;
  border-radius: 5px;
}
.container{
  width: 100%;
  min-height: 70vh;
  background-image: url("./assets/pokemon-background.jpg");
  background-position:right; 
  background-repeat: no-repeat;
  background-attachment: fixed;
  padding: 69px 0;
  text-align: center;
}
button{
  font-size: 18px;
  border: 1px solid gray;
  padding: 12px 18px;
  margin: 3px;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  background: none;
  color:white;
  &:hover{
    background: gray;
    color:white
  }
}
footer{
  padding:6px 0;
  width: 100%;
  position: absolute;
  left: 0;
  bottom:0;
  background: #3a3a3a;
  text-align: center
}
a {
  text-decoration: none;
  color:white;
}
.cart {
  &-header {
    display: flex;
    justify-content: center;
    div {
      padding: 2% 3%;
    }
  }
  &-information{
    max-width: 750px;
    margin: 0 auto;
  }
  &-item {
    height: 90px;
    border-bottom: 1px solid gray;
    display: flex;
    align-items: center;
    justify-content:space-between;
    text-align: center;
    &__action {
      width: 120px;
      span{
        cursor: pointer;
        &:hover{
          color: red
        }
      }
    }
    &__name {
      width: 210px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      div {
        margin: 0 auto;
      }
    }
    &__quantity {
      width: 120px;
    }
    &__price {
      width: 120px;
    }
    &__total {
      width: 120px;
    }
    img {
      width: 90px;
    }
  }
  &__empty {
    img{
      padding-top: 30px;
      width: 300px;
    }
  }
  &-action {
    max-width: 810px;
    display: flex;
    align-items: center;
    margin: 0 auto;
    height: 69px;
    justify-content: space-between;
  }
}
.total-price {
  justify-content: flex-end;
  padding-right: 33px
}
.step {
    &__normal{
        color:rgb(0, 195, 255);
        border-color:rgb(0, 134, 196);
        &:hover{
            color:white;
            background: rgb(0, 134, 196);
        }
    };
    &__blue{
        border: none;
    background: rgb(0, 134, 196);
    &:hover {
    background: rgb(0, 112, 163);
  }
    }
  
}
form {
  max-width: 330px;
  margin: 9px auto;
}
.form-group {
  margin-bottom: 15px;
  text-align: left;
  > label {
    display: block;
    text-align: left;
    margin-bottom: 9px;
  }
  > input,
  textarea {
    width: 100%;
    color:white;
    font-size: 18px;
    border: 1px solid gray;
    padding: 12px 18px;
    outline: none;
    background: #17181c;
    box-sizing: border-box;
  }
}


</style>
