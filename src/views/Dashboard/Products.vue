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
import Pagination from "@/components/Pagination.vue"
import {mapState} from 'vuex'
export default {
  name: "products",
  data() {
    return {
      showAlert: false,
      showDelete: false,
      currPage: 1,
      isLoading:false
    };
  },
  components:{
    Pagination
  },
  computed: {
    ...mapState(['products','itemOfPage']),
    //每頁商品數量
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
    handleDelete(product) {
      if (this.products.indexOf(product) < 9) {
        alert("這個商品不能刪除");
      } else {
        axios.delete(process.env.VUE_APP_PRODUCTS_URL + product._id);
        this.showDelete = true;
        setTimeout(() => {
          this.showAlert = false;
          this.showDelete = false;
          this.products.splice(this.products.indexOf(product), 1);
        }, 1000);
      }
    },
    fetchProducts() {
      this.$store.dispatch("getProducts", process.env.VUE_APP_PRODUCTS_URL);
    },
  },
  created(){
    this.isLoading = true
    this.fetchProducts()
    if(this.products){
      setTimeout(()=>{
        this.isLoading = false
      },500)
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