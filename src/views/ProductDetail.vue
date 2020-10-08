<template>
  <div class="product-detail">
    <div class="product-image">
      <img :src="product.src" />
    </div>
    <div class="product-information">
      <div>{{ product.name }}</div>
      <div>
        <b style="font-size: 45px" class="text-success">${{ product.price }}</b>
      </div>
      <div>屬性 {{ product.type }}</div>
      <div class="product__quantity">
        <span>數量</span>
        <button @click="decreaseQuantity">-</button>
        <input type="text" @input="changeInput" v-model="currQuantity" />
        <button @click="increaseQuantity">+</button>
        <span>還剩{{ product.remaining }}件</span>
      </div>
      <div class="product__action">
        <button class="add" @click="addToCart">
          <img src="../assets/cart-icon.png" /> 加到購物車
        </button>
      </div>
    </div>
    <!-- popup -->
    <div id="popup"></div>
    <!-- CartDrawer -->
    <CartDrawer :cart="cart" />
  </div>
</template>

<script>
import CartDrawer from "@/components/CartDrawer.vue";
export default {
  data() {
    return {
      currQuantity: 1,
    };
  },
  components: {
    CartDrawer,
  },
  computed: {
    cart() {
      return this.$store.state.cart;
    },
    product() {
      return this.$store.state.products.find(
        (product) => product._id === this.$route.params.id
      );
    },
  },
  methods: {
    decreaseQuantity() {
      if (this.currQuantity > 1) {
        this.currQuantity--;
      }
    },
    increaseQuantity() {
      if (this.currQuantity < this.product.remaining) {
        this.currQuantity++;
      }
    },
    addToCart() {
      if (this.currQuantity === "") {
        this.currQuantity = 1;
      }
      this.product.quantity = this.currQuantity;
      this.$store.commit("addToCart", this.product);
    },
    changeInput() {
      const max = +this.product.remaining;
      this.currQuantity = this.currQuantity.replace(/^0|\D/g, "");
      if (this.currQuantity > max) {
        this.currQuantity = max;
      }
      if (this.currQuantity !== "") {
        this.currQuantity = +this.currQuantity;
      }
    },
  },
};
</script>

<style lang="scss">
</style>