<template>
  <div>
    <h1>訂單編號: {{order.id}}</h1>
    <div>日期: {{order.date}}</div>
    <div class="cart-information">
      <div class="cart-item">
        <div class="cart-item__name">商品</div>
        <div class="cart-item__quantity">數量</div>
        <div class="cart-item__price">單價</div>
        <div class="cart-item__total">小計</div>
      </div>
      <Cart v-for="item in cart" :product="item" :key="item._id" />
      <div class="cart-item total-price">總計金額 ${{totalPrice}}</div>
    </div>
    <Form :form="form" :paymentStatus="order.paymentStatus" />
  </div>
</template>

<script>
import Cart from "@/components/Cart.vue";
import Form from "@/components/Form.vue";
export default {
  components: {
    Cart,
    Form
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
    totalPrice() {
      return this.cart.reduce(
        (total, item) => total + item.quantity * item.price,
        0
      );
    },
    form() {
      return this.order.form;
    }
  },
};
</script>

<style>
</style>