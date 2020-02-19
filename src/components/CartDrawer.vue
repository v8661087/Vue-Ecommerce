<template>
  <div>
    <div class="drawer" @click="showCartDrawer= !showCartDrawer">
      <img src="../assets/cart-icon.png" alt="cart" />
      <span>{{cart.length}}</span>
    </div>
    <div v-show="showCartDrawer" class="drawer-items">
      <div v-if="cart.length">
        <div class="drawer-item" v-for="item of cart" :key="item._id">
          <img :src="item.src" :alt="item.name" />
          <div class="drawer-item__name">{{item.name}}</div>
          <div class="drawer-item__total">
            <span>
              <b>${{item.price}}</b>
              * {{item.quantity}}
            </span>
            <div @click="handleDelete(item)">
              <span class="delete">刪除</span>
            </div>
          </div>
        </div>
        <router-link to="/cart">
          <div class="link">查看購物車</div>
        </router-link>
      </div>
      <div v-else class="drawer__empty">
        <div>尚無商品</div>
        <img src="../assets/smile.png" alt />
      </div>
      <div class="triangle"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartDrawer",
  data() {
    return {
      showCartDrawer: false
    };
  },
  props: {
    cart: Array
  },
  methods:{
    handleDelete(item){
      this.$store.dispatch("deleteProductAction", item);
    }
  }
};
</script>

<style>
</style>