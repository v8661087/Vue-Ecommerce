<template>
  <div class="home">
    <div class="list">
      <h4>條件篩選</h4>
      <span>屬性</span>
      <ul>
        <List
          v-for="(list,index) in data.lists"
          :class="{active: list === currtype}"
          :list="list"
          :key="index"
          @active="handleActive(list)"
        />
      </ul>
    </div>
    <div class="products">
      <Product
        v-for="product in filteredProducts"
        :product="product"
        :key="product.id"
        @add="handleAdd(product)"
      />
    </div>
    <div class="drawer" @click="showCartDrawer= !showCartDrawer">
      <img src="../assets/cart-icon.png" alt />
      <span>{{data.cart.length}}</span>
    </div>
    <div v-show="showCartDrawer" class="drawer-items">
      <div v-show="data.cart.length">
        <div class="drawer-item" v-for="item of data.cart" :key="item.id">
          <img :src="item.src" alt />
          <div class="drawer-item__name">{{item.name}}</div>
          <div class="drawer-item__total">
            <span>
              <b>${{item.price}}</b>
              * {{item.quantity}}
            </span>
            <div @click="handleDelete(item)"><span>刪除</span></div>
          </div>
        </div>
        <router-link to="cart">
          <div class="link">
            查看購物車
          </div>
        </router-link>
      </div>
      <div v-show="!data.cart.length" class="drawer__empty">
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
    data() {
      return this.$store.state;
    },
    filteredProducts: function() {
      if (this.currtype === "全部") {
        return this.data.products;
      }
      return this.data.products.filter(item => item.type === this.currtype);
    }
  }
};
</script>

<style lang="scss">
.home {
  display: flex;
  justify-content: center;
  text-align: center;
  ul {
    max-width: 150px;
    margin: 0 auto;
    padding: 1%;
  }
}
.list {
  max-width: 210px;
  width: 100%;
}

.products {
  width: 100%;
  min-width: 294px;
  display: flex;
  flex-wrap: wrap;
  padding: 15px 9px;
}
.active {
  background: #479e25;
  color: rgb(255, 255, 255);
}
.drawer {
  cursor: pointer;
  width: 66px;
  height: 66px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  background: #2079ee;
  border-radius: 50%;
  right: 30px;
  bottom: 30px;
  z-index: 1;
  > img {
    width: 42px;
  }
  > span {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    position: absolute;
    right: 0;
    top: 0;
    background: #ad0026;
  }
  &-items {
    max-height: 336px;
    overflow: auto;
    padding: 9px 15px;
    position: fixed;
    background: #17181c;
    right: 39px;
    bottom: 111px;
    border: 1px solid gray;
    border-radius: 5px;
    z-index: 1;
  }
  &-item {
    width: 100%;
    display: flex;
    align-items: center;
    text-align: left;
    padding: 3px;
    margin-bottom: 6px;
    img {
      width: 39px;
    }
    &__name {
      width: 120px;
    }
    &__total {
      width: 90px;
      text-align: right;
      b {
        color: #5bee22;
      }
      div{
        text-align: right
      }
      div span{
        cursor: pointer;
      }
    }
    &:hover {
      background: #2c2e36;
    }
  }
  &__empty {
    padding: 15px;
    height: 150px;
    img {
      padding-top: 9px;
      width: 120px;
    }
  }
}
.add-to-cart {
  width: 210px;
  height: 60px;
  right: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  background: #17181c;
  border: 1px solid gray;
  z-index: 1;
}
.link{
  background: #2079ee;
  padding: 9px 12px;
}
.triangle{
  position: fixed;
  right: 42px;
  bottom: 90px;
  width: 0;
  height: 0;
  border-style: solid;
border-width: 21px 21px 0 21px;
border-color: #5bee22 transparent transparent  transparent;

}
</style>