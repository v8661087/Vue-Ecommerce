<template>
  <div class="product">
    <img :src="product.src" alt srcset />
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
  name: "product",
  props: {
    product: Object
  },
  methods: {
    handleAdd() {
      this.$emit("add", this.product);
    }
  }
};
</script>

<style lang="scss">
$red: rgb(182, 0, 12);
.product {
  min-width: 231px;
  height: 300px;
  margin: 1%;
  border-radius: 5px;
  padding: 9px;
  text-align: center;
  &:hover{
    border: 0.5px solid rgb(0, 255, 128);
  }
  img {
    width: 180px;
    &:hover{
      transform: scale(1.3)
    }
  }
}
.add {
  color: rgb(255, 0, 0);
  border-color: $red;
  &:hover {
    color: white;
    background: $red;
  }
}
</style>