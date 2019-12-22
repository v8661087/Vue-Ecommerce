<template>
  <div class="cart">
    <div v-if="cart.length">
      <div class="cart-header">
        <div class="active">1.確認購買清單</div>
        <div>2.填寫收件資訊</div>
        <div>3.完成訂單!</div>
      </div>
      <h1>購物車清單</h1>
      <div class="cart-information">
        <div class="cart-item">
          <div class="cart-item__action">操作</div>
          <div class="cart-item__name">商品</div>
          <div class="cart-item__quantity">數量</div>
          <div class="cart-item__price">單價</div>
          <div class="cart-item__total">小計</div>
        </div>
        <div class="cart-item" v-for="product of cart" :key="product.id">
          <div class="cart-item__action">
            <span @click="handleDelete(product)">x</span>
            </div>
          <div class="cart-item__name">
            <div>
              <img :src="product.src" :alt="product.name" />
            </div>
            <div>{{product.name}}</div>
          </div>
          <div class="cart-item__quantity">{{product.quantity}}</div>
          <div class="cart-item__price">${{product.price}}</div>
          <div class="cart-item__total">${{product.quantity * product.price}}</div>
        </div>
        <div class="cart-item total-price">總計金額 ${{totalPrice}}</div>
      </div>
      <div class="cart-action">
        <router-link to="/">
          <button class="step__normal">&lt;&lt; 繼續購物</button>
        </router-link>
        <router-link to="/createorder">
          <button class="step__blue">下一步：填寫收件資料</button>
        </router-link>
      </div>
    </div>
    <div v-else class="cart__empty">
      <h1>尚無商品</h1>
      <img src="../assets/smile.png" alt="">
      <div>
          <router-link to="/">
        <button class="step__normal">&lt;&lt; 繼續購物</button>
      </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "cart",
  components:{},
  computed: {
    cart() {
      return this.$store.state.cart;
    },
    totalPrice() {
      return this.cart.reduce(
        (total, product) => total + product.quantity * product.price,
        0
      );
    }
  },
  methods: {
    handleDelete(product) {
      this.$store.dispatch("deleteProductAction",product)
    }
  }
};
</script>

<style lang="scss">
</style>