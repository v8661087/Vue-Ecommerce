<template>
  <div>
    <div class="cart-item">
      <div class="cart-item__name">商品</div>
      <div class="cart-item__quantity">數量</div>
      <div class="cart-item__price">單價</div>
      <div class="cart-item__total">小計</div>
    </div>
    <div class="cart-item" v-for="product in cart" :key="product.id">
      <div class="cart-item__name">
        <img :src="product.src" :alt="product.name" />
        <div>{{product.name}}</div>
      </div>
      <div class="cart-item__quantity">{{product.quantity}}</div>
      <div class="cart-item__price">${{product.price}}</div>
      <div class="cart-item__total">${{product.quantity * product.price}}</div>
    </div>
    <div class="cart-item total-price">總計金額 ${{totalPrice}}</div>
    <div class="cart-item total-price discount" v-if="discountPrice">折扣後金額 ${{discountPrice}}</div>
  </div>
</template>

<script>
export default {
  name: "Cart",
  props: { cart: Array, totalPrice: Number, discountPrice: Number }
};
</script>

<style>
</style>