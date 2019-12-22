<template>
  <div class="cart-item">
    <div class="cart-item__name">
      <img :src="product.src" :alt="product.name" />
      <div>{{product.name}}</div>
    </div>
    <div class="cart-item__quantity">{{product.quantity}}</div>
    <div class="cart-item__price">${{product.price}}</div>
    <div class="cart-item__total">${{product.quantity * product.price}}</div>
  </div>
</template>

<script>
export default {
  name: "cart",
  props: { product: Object }
};
</script>

<style>
</style>