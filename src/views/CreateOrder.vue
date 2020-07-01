<template>
  <div class="cart">
    <loading :active.sync="isLoading" :color="'white'" :background-color="'#17181c'"></loading>
    <div class="cart-header">
      <div>1.確認購買清單</div>
      <div class="active">2.填寫收件資訊</div>
      <div>3.完成訂單!</div>
    </div>
    <h1>購物車清單</h1>
    <div class="cart-information">
      <CartItem :cart="cart" :totalPrice="totalPrice" :discountPrice="discountPrice" />
    </div>
    <h1>請填寫收件資訊</h1>
    <form @submit.prevent="checkout">
      <div class="form-group">
        <label for="useremail">Email</label>
        <input
          type="email"
          id="useremail"
          name="email"
          placeholder="請輸入Email"
          required="true"
          v-model="form.email"
          ref="emailInput"
        />
        <label v-show="form.email">{{emailError}}</label>
      </div>
      <div class="form-group">
        <label for="username">收件人姓名</label>
        <input
          type="text"
          id="username"
          name="name"
          placeholder="輸入姓名"
          required="true"
          v-model="form.username"
        />
      </div>
      <div class="form-group">
        <label for="usertel">收件人電話</label>
        <input
          type="tel"
          name
          id="usertel"
          placeholder="請輸入電話"
          required="true"
          v-model="form.usertel"
        />
      </div>
      <div class="form-group">
        <label for="useraddress">收件人地址</label>
        <input
          type="address"
          id="useraddress"
          placeholder="請輸入地址"
          required="true"
          v-model="form.useraddress"
        />
      </div>
      <div class="form-group">
        <label for="message">留言</label>
        <textarea name="message" id="message" cols="30" rows="10" v-model="form.message"></textarea>
      </div>
      <input style="display:none" type="submit" value="送出表單" ref="button" />
    </form>
    <div class="cart-action">
      <router-link to="/">
        <button class="step__normal">&lt;&lt; 繼續購物</button>
      </router-link>
      <div>
        <router-link to="/cart">
          <button class="step__blue">上一步</button>
        </router-link>
        <button @click="handleSubmit" class="step__danger">下一步：完成訂單</button>
      </div>
    </div>
    <div class="modal" v-show="showSuccess">訂單完成!</div>
  </div>
</template>

<script>
import CartItem from "../components/CartItem";
import axios from "axios";
import { mapState } from "vuex";
export default {
  name: "order",
  components: { CartItem },
  data() {
    return {
      reg: /^.*?@[a-z]+\.[a-z]+/,
      showSuccess: false,
      isLoading: false
    };
  },
  computed: {
    ...mapState(["cart", "form", "totalPrice", "discountPrice"]),
    emailError() {
      return this.form.email == ""
        ? ""
        : this.reg.test(this.form.email)
        ? ""
        : "請輸入正確的Email格式";
    }
  },
  methods: {
    async checkout() {
      function uid() {
        return Math.random()
          .toString(36)
          .substring(2);
      }
      const id = uid() + uid();
      const date = new Date().toLocaleString();
      const data = {
        id,
        date,
        cart: [...this.cart],
        form: { ...this.form },
        totalPrice: this.totalPrice,
        discountPrice: this.discountPrice,
        paymentStatus: false
      };
      this.isLoading = true;
      await axios.post(process.env.VUE_APP_ORDERS_URL, data);
      this.isLoading = false;
      this.showSuccess = true;
      setTimeout(() => {
        this.$router.push("/checkout/" + id);
        this.showSuccess = false;
        this.$store.state.cart = [];
        localStorage.setItem("cart", JSON.stringify(this.$store.state.cart));
        this.$store.state.form = {};
        this.$store.percentDiscount = null;
      }, 1000);
    },
    handleSubmit() {
      if (this.emailError) {
        this.$refs.emailInput.focus();
      } else {
        this.$refs.button.click();
      }
    }
  },
  mounted() {
    if (this.$store.state.cart.length == 0) {
      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss">
</style>