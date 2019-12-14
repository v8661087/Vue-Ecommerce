<template>

<div class="cart">
<div class="cart-header">
      <div>1.確認購買清單</div>
      <div >2.填寫收件資訊</div>
      <div class="active">3.完成訂單!</div>
    </div>
    <h1>訂單資訊</h1>
    <div class="cart-information">
    <div class="cart-item">
      <div class="cart-item__name">商品</div>
      <div class="cart-item__quantity">數量</div>
      <div class="cart-item__price">單價</div>
      <div class="cart-item__total">小計</div>
    </div>
    <Cart v-for="item in cart" 
          :product="item"
          :key="item.id"
    />
    <div class="cart-item total-price">總計金額 ${{totalPrice}}</div>
    </div>
    <Form :form="form" :paymentStatus="paymentStatus" />
    <button v-if="!paymentStatus" @click="handlePayment" >立即付款</button>
    <router-link v-if="paymentStatus" to="/">
          <button  class="step__normal">&lt;&lt; 繼續購物</button>
        </router-link>
</div>

</template>

<script>
import Cart from "../components/Cart"
import Form from "../components/Form"
export default {
  components:{Cart,Form},
  computed: {
    order(){
      return this.$store.state.orders.find(item=>item.id == this.$route.params.id)
    },
    cart(){
      return this.order.cart
    },
    form(){
      return this.order.form
    },
    paymentStatus(){
      return this.order.paymentStatus
    },
    totalPrice() {
      return this.cart.reduce(
        (total, item) => total + item.quantity * item.price,
        0
      );
    }
  },
  created(){
    this.$set(this.order,'paymentStatus',false)
  },
  methods:{
    handlePayment(){
      setTimeout(()=>this.order.paymentStatus = true,500)
    }
  }
}
</script>

<style lang="scss">

</style>