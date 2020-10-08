<template>
  <div>
    <loading
      :active.sync="isLoading"
      :color="'white'"
      :background-color="'#17181c'"
    ></loading>
    <h1>Orders</h1>
    <div class="table">
      <div class="table-item">
        <div>購買日期</div>
        <div>訂單編號</div>
        <div>是否付款</div>
        <div>操作</div>
      </div>
      <div
        class="table-item"
        v-for="order in sortedOrders.slice(
          (currPage - 1) * itemOfPage,
          currPage * itemOfPage
        )"
        :key="order._id"
      >
        <div>{{ order.date }}</div>
        <div>{{ order._id }}</div>
        <div>
          <span class="text-success" v-if="order.paymentStatus">已付款</span>
          <span class="text-failure" v-else>未付款</span>
        </div>
        <div>
          <router-link :to="{ path: 'order/' + order._id }">
            <button class="edit">查看</button>
          </router-link>
          <button class="delete" @click="showAlertBind(order)">刪除</button>
          <!-- alert -->
          <div class="modal" v-show="showAlert">
            <div>確定要刪除這個訂單嗎?</div>
            <button @click="deleteOrder">確定</button>
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
  data() {
    return {
      currPage: 1,
      showAlert: false,
      showDelete: false,
      removeTempId: "",
    };
  },
  components: {
    Pagination,
  },
  computed: {
    ...mapState(["orders", "itemOfPage", "isLoading"]),
    totalPage() {
      return Math.ceil(this.orders.length / this.itemOfPage);
    },
    sortedOrders() {
      let newOrders = [...this.orders];
      newOrders = newOrders.sort((a, b) => (a.date < b.date ? 1 : -1));
      return newOrders;
    },
  },
  methods: {
    setPage(n) {
      if (this.currPage !== n) {
        this.currPage = n;
        window.scrollTo(0, 0);
      }
    },
    showAlertBind(order) {
      this.showAlert = true;
      this.removeTempId = order._id;
    },
    async deleteOrder() {
      this.$store.state.isLoading = true;
      this.showAlert = false;
      try {
        await axios.delete(process.env.VUE_APP_ORDERS_URL + this.removeTempId, {
          headers: { token: this.$store.state.token },
        });
        this.getOrders();
        this.showDelete = true;
        setTimeout(() => {
          this.showDelete = false;
        }, 1000);
      } catch (err) {
        alert("此帳號無法進行操作");
        this.$store.state.isLoading = false;
      }
    },
    getOrders() {
      this.$store.dispatch("getOrders", process.env.VUE_APP_ORDERS_URL);
    },
  },
  created() {
    this.getOrders();
  },
};
</script>

<style>
</style>