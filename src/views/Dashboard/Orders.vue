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
        :key="order.id"
      >
        <div>{{ order.date }}</div>
        <div>{{ order.id }}</div>
        <div>
          <span class="text-success" v-if="order.paymentStatus">已付款</span>
          <span class="text-failure" v-else>未付款</span>
        </div>
        <div>
          <router-link :to="{ path: 'order/' + order.id }">
            <button class="edit">查看</button>
          </router-link>
        </div>
      </div>
    </div>
    <!-- Pagination -->
    <Pagination
      :currPage="currPage"
      :totalPage="totalPage"
      @setPage="setPage"
    />
  </div>
</template>

<script>
import Pagination from "@/components/Pagination.vue";
import { mapState } from "vuex";
export default {
  data() {
    return {
      currPage: 1,
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
      var newOrders = [...this.orders];
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
    fetchOrders() {
      this.$store.dispatch("getOrders", process.env.VUE_APP_ORDERS_URL);
    },
  },
  created() {
    this.fetchOrders();
  },
};
</script>

<style>
</style>