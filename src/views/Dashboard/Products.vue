<template>
  <div>
    <loading :active.sync="isLoading" :color="'white'" :background-color="'#17181c'"></loading>
    <h1>Products</h1>
    <router-link to="/dashboard/new">
      <button class="new">新增商品</button>
    </router-link>
    <!-- product table -->
    <table>
      <thead>
        <tr>
          <th>縮圖</th>
          <th width="33%">名稱</th>
          <th width="12%">價格</th>
          <th width="12%">數量</th>
          <th width="15%">屬性</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="product in products.slice((currPage-1) * itemOfPage,(currPage)*itemOfPage)"
          :key="product._id"
        >
          <td>
            <img width="30px" :src="product.src" alt />
          </td>
          <td>{{product.name}}</td>
          <td>${{product.price}}</td>
          <td>{{product.remaining}}</td>
          <td>{{product.type}}</td>
          <td>
            <router-link :to="{path:'/dashboard/edit/'+ product._id}">
              <button class="edit">編輯</button>
            </router-link>
            <button class="delete" @click="showAlert=true">刪除</button>
            <!-- alert -->
            <div class="modal" v-show="showAlert">
              <div>確定要刪除這個商品嗎?</div>
              <button @click="handleDelete(product)">確定</button>
              <button @click="showAlert=false">取消</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="modal" v-show="showDelete">刪除成功</div>
    <!-- Pagination -->
    <Pagination :currPage="currPage" :totalPage="totalPage" @setPage="setPage" />
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
      currPage: 1
    };
  },
  components: {
    Pagination
  },
  computed: {
    ...mapState(["products", "itemOfPage", "isLoading"]),
    totalPage() {
      return Math.ceil(this.products.length / this.itemOfPage);
    }
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
          headers: { token: this.$store.state.token }
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
    }
  },
  created() {
    this.fetchProducts();
  },
  updated() {
    if (this.totalPage === 1) {
      this.currPage = 1;
    }
  }
};
</script>

<style lang="scss" scoped>
h1 {
  display: inline-block;
  margin: 30px 60px;
}
</style>