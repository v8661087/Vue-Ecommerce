<template>
  <div class="product-detail">
    <div class="product-image">
      <img :src="product.src" />
    </div>
    <div class="product-information">
      <div>{{product.name}}</div>
      <div>${{product.price}}</div>
      <div class="product__quantity">
        <span>數量</span>
        <button @click="handleDecrement">-</button>
        <input type="text" @input="handleChange" v-model="currQuantity" />
        <button @click="handleIncrement">+</button>
        <span>還剩{{product.remaining}}件</span>
      </div>
      <div class="product__action">
        <button class="add" @click="handleAdd">
          <img src="../assets/cart-icon.png" /> 加到購物車
        </button>
      </div>
    </div>
    <div v-show="showAddToCart" class="add-to-cart">商品已加入購物車</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currQuantity: 1,
      showAddToCart: false
    };
  },
  computed: {
    product() {
      return this.$store.state.products.find(
        product => product._id == this.$route.params.id
      );
    }
  },
  methods: {
    handleDecrement() {
      if (this.currQuantity > 1) {
        this.currQuantity--;
      }
    },
    handleIncrement() {
      if(this.currQuantity < this.product.remaining){
        this.currQuantity++;
      }
    },
    handleAdd() {
      if (this.currQuantity === "") {
        this.currQuantity = 1;
      }
      this.product.quantity = this.currQuantity;
      this.$store.dispatch("addToCartAction", this.product);
      this.showAddToCart = true;
      setTimeout(() => (this.showAddToCart = false), 1500);
    },
    handleChange() {
      const max = +this.product.remaining
      this.currQuantity = this.currQuantity.replace(/^0|\D/g, "");
      if (this.currQuantity > max) {
        this.currQuantity =  max
      }
      if (this.currQuantity !== "") {
        this.currQuantity = +this.currQuantity;
      }
    }
  }
};
</script>

<style lang="scss">
</style>