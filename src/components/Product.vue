<template>
  <div class="product">
    <img :src="product.src" :alt="product.name" />
    <div>{{product.name}}</div>
    <div>${{product.price}}</div>
    <div>
      <router-link :to="{ path: '/product-detail/' + product._id}">
        <button>查看更多</button>
      </router-link>
      <button class="add" @click="handleAdd">加到購物車</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Product",
  props: {
    product: Object
  },
  methods: {
    handleAdd() {
      this.$emit("add");
    }
  }
};
</script>

<style lang="scss">
</style>