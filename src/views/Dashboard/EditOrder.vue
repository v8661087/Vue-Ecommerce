<template>
  <div>
    <h1>訂單編號: {{ order._id }}</h1>
    <div>日期: {{ order.date }}</div>
    <div class="cart-information">
      <CartItem
        :cart="cart"
        :totalPrice="totalPrice"
        :discountPrice="discountPrice"
      />
    </div>
    <OrderForm :form="form" :paymentStatus="order.paymentStatus" />
  </div>
</template>

<script>
import CartItem from "@/components/CartItem.vue";
import OrderForm from "@/components/OrderForm.vue";
export default {
  components: {
    CartItem,
    OrderForm,
  },
  computed: {
    order() {
      return this.$store.state.orders.find(
        (item) => item._id === this.$route.params._id
      );
    },
    cart() {
      return this.order.cart;
    },
    totalPrice() {
      return this.order.totalPrice;
    },
    discountPrice() {
      return this.order.discountPrice;
    },
    form() {
      return this.order.form;
    },
  },
};
</script>

<style lang="scss" scoped>
h1 {
  width: 70%;
}
</style>