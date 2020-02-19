<template>
  <div class="cart">
    <loading :active.sync="isLoading" :color="'white'" :background-color="'#17181c'"></loading>
    <div v-if="cart.length">
      <div class="cart-header">
        <div class="active">1.確認購買清單</div>
        <div>2.填寫收件資訊</div>
        <div>3.完成訂單!</div>
      </div>
      <h1>購物車清單</h1>
      <div class="cart-information">
        <div class="cart-item">
          <div class="cart-item__action">
            <button @click="clearAll">全部清除</button>
          </div>
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
            <img :src="product.src" :alt="product.name" />
            <div>{{product.name}}</div>
          </div>
          <div class="cart-item__quantity">{{product.quantity}}</div>
          <div class="cart-item__price">${{product.price}}</div>
          <div class="cart-item__total">${{product.quantity * product.price}}</div>
        </div>
        <div class="cart-item total-price">總計金額 ${{totalPrice}}</div>
        <div class="cart-item total-price discount" v-show="discountPrice">折扣後金額 ${{discountPrice}}</div>
        <div class="coupon">
          <input type="text" v-model="couponCode" placeholder="請輸入優惠碼" />
          <input type="button" value="套用優惠碼" @click="submitCoupon" />
        </div>
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
      <img src="../assets/smile.png" alt />
      <div>
        <router-link to="/">
          <button class="step__normal">&lt;&lt; 繼續購物</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "cart",
  data() {
    return {
      couponCode: "30off",
      isLoading: false
    };
  },
  computed: { ...mapState(["cart", "totalPrice", "discountPrice"]) },
  methods: {
    handleDelete(product) {
      this.$store.dispatch("deleteProductAction", product);
    },
    clearAll() {
      this.$store.state.cart = [];
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    submitCoupon() {
      this.isLoading = true;
      const index = this.$store.state.coupons.findIndex(
        item => item.code === this.couponCode
      );
      setTimeout(() => {
        if (index !== -1) {
          const foundCoupon = this.$store.state.coupons[index];
          const today = new Date().getTime();
          if (!foundCoupon.is_enabled) {
            alert("找不到優惠券"); //未啟用
          } else if (new Date(foundCoupon.due_date).getTime() <= today) {
            alert("優惠券已過期"); //過期
          } else {
            this.$store.state.percentDiscount = this.$store.state.coupons[
              index
            ].percent;
          }
        } else {
          alert("找不到優惠券");
          this.$store.state.percentDiscount = null;
        }
        this.isLoading = false;
      }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
.coupon {
  margin: 9px 0;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  input {
    border: 1px solid gray;
    outline: none;
    padding: 12px 18px;
    background: #17181c;
    color: white;
    &[type="text"] {
      width: 100%;
      max-width: 510px;
    }
    &[type="button"] {
      width: 180px;
      cursor: pointer;
      &:hover {
        background: gray;
      }
    }
  }
}
</style>