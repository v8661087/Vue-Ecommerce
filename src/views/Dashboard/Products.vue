<template>
  <div>
    <loading
      :active.sync="isLoading"
      :color="'white'"
      :background-color="'#17181c'"
    ></loading>
    <h1>Products</h1>
    <router-link to="/dashboard/new">
      <button class="new">新增商品</button>
    </router-link>
    <div class="table">
      <div class="table-item">
        <div>縮圖</div>
        <div>名稱</div>
        <div>價格</div>
        <div>數量</div>
        <div>屬性</div>
        <div>操作</div>
      </div>
      <div
        class="table-item"
        v-for="product in products.slice(
          (currPage - 1) * itemOfPage,
          currPage * itemOfPage
        )"
        :key="product._id"
      >
        <div>
          <img width="30px" :src="product.src" alt />
        </div>
        <div>{{ product.name }}</div>
        <div>${{ product.price }}</div>
        <div>{{ product.remaining }}</div>
        <div>{{ product.type }}</div>
        <div>
          <router-link :to="{ path: '/dashboard/edit/' + product._id }">
            <button class="edit">編輯</button>
          </router-link>
          <button class="delete" @click="showAlert = true">刪除</button>
          <!-- alert -->
          <div class="modal" v-show="showAlert">
            <div>確定要刪除這個商品嗎?</div>
            <button @click="handleDelete(product)">確定</button>
            <button @click="showAlert = false">取消</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal" v-show="showDelete">刪除成功</div>
    <!-- Pagination -->
    <Pagination
      :currPage="currPage"
      :totalPage="totalPage"
      @setPage="setPage"
    />
  </div>
</template>

<script>
import axios from "axios";
import Pagination from "@/components/Pagination.vue";
import { mapState } from "vuex";
export default {
  name: "products",
  data() {
    return {
      showAlert: false,
      showDelete: false,
      currPage: 1,
    };
  },
  components: {
    Pagination,
  },
  computed: {
    ...mapState(["products", "itemOfPage", "isLoading"]),
    totalPage() {
      return Math.ceil(this.products.length / this.itemOfPage);
    },
  },
  methods: {
    setPage(n) {
      if (this.currPage !== n) {
        this.currPage = n;
        window.scrollTo(0, 0);
      }
    },
    async handleDelete(product) {
      this.$store.state.isLoading = true;
      this.showAlert = false;
      try {
        await axios.delete(process.env.VUE_APP_PRODUCTS_URL + product._id, {
          headers: { token: this.$store.state.token },
        });
        this.fetchProducts();
        this.showDelete = true;
        setTimeout(() => {
          this.showDelete = false;
        }, 1000);
      } catch (err) {
        alert("此帳號無法進行操作");
        this.$store.state.isLoading = false;
      }
    },
    fetchProducts() {
      this.$store.dispatch("getProducts", process.env.VUE_APP_PRODUCTS_URL);
    },
  },
  created() {
    this.fetchProducts();
  },
  updated() {
    if (this.totalPage === 1) {
      this.currPage = 1;
    }
  },
};
</script>

<style lang="scss">
</style>