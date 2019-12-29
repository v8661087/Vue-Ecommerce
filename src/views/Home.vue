<template>
  <div class="home">
    <div class="list">
      <span>屬性</span>
      <ul>
        <List
          v-for="(list,index) in lists"
          :class="{active: list === currtype}"
          :list="list"
          :key="index"
          @active="handleActive(list)"
        />
      </ul>
    </div>
    <div v-show="!products.length" class="loading"></div>
    <div class="products">
      <Product
        v-for="product in filteredProducts"
        :product="product"
        :key="product._id"
        @add="handleAdd(product)"
      />
    </div>
    <div class="drawer" @click="showCartDrawer= !showCartDrawer">
      <img src="../assets/cart-icon.png" alt />
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
            <div @click="handleDelete(item)"><span class="delete">刪除</span></div>
          </div>
        </div>
        <router-link to="cart">
          <div class="link">
            查看購物車
          </div>
        </router-link>
      </div>
      <div v-else class="drawer__empty">
        <div>尚無商品</div>
        <img src="../assets/smile.png" alt />
      </div>
      <div class="triangle"></div>
    </div>
    <div v-show="showAddToCart" class="add-to-cart">商品已加入購物車</div>
  </div>
</template>

<script>
// @ is an alias to /src
import Product from "@/components/Product.vue";
import List from "@/components/List.vue";
import {mapState} from "vuex"
export default {
  name: "home",
  data() {
    return {
      currtype: "全部",
      showAddToCart: false,
      showCartDrawer: false
    };
  },
  components: {
    Product,
    List
  },
  methods: {
    handleActive(list) {
      this.currtype = list;
      window.scroll(0,0)
    },
    handleAdd(product) {
      this.$store.dispatch("addToCartAction",product)
      this.showAddToCart = true;
      setTimeout(() => (this.showAddToCart = false), 1500);
    },
    handleDelete(product) {
      this.$store.dispatch("deleteProductAction",product)
    }
  },
  computed: {
    ...mapState(["lists","products","cart"]),
    filteredProducts: function() {
      if (this.currtype === "全部") {
        return this.products;
      }
      return this.products.filter(item =>item.type.indexOf(this.currtype)> -1);
    }
  }
};
</script>

<style lang="scss">
</style>