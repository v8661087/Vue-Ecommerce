<template>
  <div v-if="order" class="cart">
    <div class="cart-header">
      <div>1.確認購買清單</div>
      <div>2.填寫收件資訊</div>
      <div class="active">3.完成訂單!</div>
    </div>
    <h1>訂單資訊</h1>
    <div class="cart-information">
      <CartItem
        :cart="cart"
        :totalPrice="totalPrice"
        :discountPrice="discountPrice"
      />
    </div>
    <div v-if="!order.paymentStatus">
      <OrderForm :form="form" :paymentStatus="status" />
      <router-link to="/">
        <button class="step__shopping">&lt;&lt; 繼續購物</button>
      </router-link>
      <button v-if="!status" @click="handlePayment">立即付款</button>
    </div>
    <div v-else>
      <OrderForm :form="form" :paymentStatus="order.paymentStatus" />
      <router-link to="/">
        <button class="step__shopping">&lt;&lt; 繼續購物</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import CartItem from "../components/CartItem";
import OrderForm from "../components/OrderForm";
import axios from "axios";
export default {
  components: { CartItem, OrderForm },
  data() {
    return {
      status: false,
    };
  },
  computed: {
    order() {
      return this.$store.state.orders.find(
        (item) => item.id === this.$route.params.id
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
      return this.order.totalPrice;
    },
    discountPrice() {
      return this.order.discountPrice;
    },
  },
  methods: {
    handlePayment() {
      setTimeout(() => {
        this.status = true;
        axios.patch(process.env.VUE_APP_ORDERS_URL + this.order._id, {
          paymentStatus: true,
        });
      }, 500);
    },
  },
  created() {
    this.$store.dispatch("getOrders", process.env.VUE_APP_ORDERS_URL);
  },
};
</script>

<style lang="scss">
</style>