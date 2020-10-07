<template>
  <div class="home">
    <Slider />
    <main>
      <!-- List -->
      <div class="type">
        <ul>
          <List
            v-for="(list, index) in lists"
            :class="{ active: list === currtype }"
            :list="list"
            :key="index"
            @active="handleActive"
          />
        </ul>
      </div>
      <div v-show="!products.length" class="loading"></div>
      <h2 v-show="!products.length">商品資料讀取中...</h2>
      <!-- Product -->
      <div class="products">
        <Product
          v-for="product in filteredProducts.slice(
            (currPage - 1) * itemOfPage,
            currPage * itemOfPage
          )"
          :product="product"
          :key="product._id"
          @add="handleAdd(product)"
        />
      </div>
    </main>
    <!-- Pagination -->
    <Pagination
      :currPage="currPage"
      :totalPage="totalPage"
      @setPage="setPage"
    />
    <!-- CartDrawer -->
    <CartDrawer :cart="cart" />
    <!-- popup -->
    <div id="popup"></div>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Slider from "@/components/Slider.vue";
import List from "@/components/List.vue";
import Product from "@/components/Product.vue";
import Pagination from "@/components/Pagination.vue";
import CartDrawer from "@/components/CartDrawer.vue";
import Footer from "@/components/Footer.vue";
import { mapState } from "vuex";
export default {
  metaInfo: {
    title: "vue-ecommerce",
    meta: [
      {
        // set meta
        name: "keyWords",
        content: "vue-ecommerce v8661087 StevenKuo",
      },
      {
        name: "description",
        content:
          "vue-ecommerce電商網站，使用技術vue-router、vuex、vue-awesome-swiper、vue-lazyload、vue-loading-overlay、vue-meta-info。",
      },
    ],
  },
  name: "home",
  data() {
    return {
      currtype: "全部",
      currPage: 1,
    };
  },
  components: {
    Slider,
    List,
    Product,
    Pagination,
    CartDrawer,
    Footer,
  },
  methods: {
    handleActive(list) {
      if (this.currtype !== list) {
        this.currtype = list;
        this.currPage = 1;
        this.scrollToProducts();
      }
    },
    handleAdd(product) {
      this.$store.commit("addToCart", product);
    },
    setPage(n) {
      if (this.currPage !== n) {
        this.currPage = n;
        this.scrollToProducts();
      }
    },
    scrollToProducts() {
      const getHeight = document.getElementById("slider").scrollHeight;
      window.scrollTo(0, getHeight);
    },
  },
  computed: {
    ...mapState(["lists", "products", "cart", "itemOfPage"]),
    filteredProducts: function () {
      if (this.currtype === "全部") {
        return this.products;
      }
      return this.products.filter(
        (item) => item.type.indexOf(this.currtype) > -1
      );
    },
    totalPage() {
      return Math.ceil(this.filteredProducts.length / this.itemOfPage);
    },
  },
};
</script>

<style lang="scss">
</style>