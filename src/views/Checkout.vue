<template>
  <div v-if="order" class="cart">
    <div class="cart-header">
      <div>1.確認購買清單</div>
      <div>2.填寫收件資訊</div>
      <div class="active">3.完成訂單!</div>
    </div>
    <h1>訂單資訊</h1>
    <div class="cart-information">
      <div class="cart-item">
        <div class="cart-item__name">商品</div>
        <div class="cart-item__quantity">數量</div>
        <div class="cart-item__price">單價</div>
        <div class="cart-item__total">小計</div>
      </div>
      <Cart v-for="item of cart" :product="item" :key="item._id" />
      <div class="cart-item total-price">總計金額 ${{totalPrice}}</div>
    </div>
    <div v-if="!order.paymentStatus">
      <Form :form="form" :paymentStatus="Status" />
      <router-link to="/">
        <button class="step__normal">&lt;&lt; 繼續購物</button>
      </router-link>
      <button v-if="!Status" @click="handlePayment">立即付款</button>
    </div>
    <div v-else>
      <Form :form="form" :paymentStatus="order.paymentStatus" />
      <router-link to="/">
        <button class="step__normal">&lt;&lt; 繼續購物</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import Cart from "../components/Cart";
import Form from "../components/Form";
import axios from "axios";
export default {
  components: { Cart, Form },
  data() {
    return {
      Status: false
    };
  },
  computed: {
    order() {
      return this.$store.state.orders.find(
        item => item.id == this.$route.params.id
      );
    },
    cart() {
      return this.order.cart;
    },
    form() {
      return this.order.form;
    },
    paymentStatus() {
      return this.order.paymentStatus;
    },
    totalPrice() {
      return this.cart.reduce(
        (total, item) => total + item.quantity * item.price,
        0
      );
    }
  },
  methods: {
    handlePayment() {
      setTimeout(() => {
        this.Status = true;
        axios.patch(process.env.VUE_APP_ORDERS_URL + this.order._id, {
          cart: this.order.cart,
          form: this.order.form,
          paymentStatus: true
        });
      }, 500);
    }
  }
};
</script>

<style lang="scss">
</style>