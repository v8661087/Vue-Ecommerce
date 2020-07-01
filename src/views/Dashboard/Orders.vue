<template>
  <div>
    <loading :active.sync="isLoading" :color="'white'" :background-color="'#17181c'"></loading>
    <h1>Orders</h1>
    <table>
      <thead>
        <tr>
          <th width="30%">購買日期</th>
          <th width="30%">訂單編號</th>
          <th>是否付款</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="order in sortedOrders.slice((currPage-1)*itemOfPage,currPage*itemOfPage)"
          :key="order.id"
        >
          <td>{{order.date}}</td>
          <td>{{order.id}}</td>
          <td>
            <span class="text-success" v-if="order.paymentStatus">已付款</span>
            <span class="text-failure" v-else>未付款</span>
          </td>
          <td>
            <router-link :to="{path:'order/'+order.id}">
              <button class="edit">查看</button>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Pagination -->
    <Pagination :currPage="currPage" :totalPage="totalPage" @setPage="setPage" />
  </div>
</template>

<script>
import Pagination from "@/components/Pagination.vue";
import { mapState } from "vuex";
export default {
  data() {
    return {
      currPage: 1
    };
  },
  components: {
    Pagination
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
    }
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
    }
  },
  created() {
    this.fetchOrders();
  }
};
</script>

<style>
</style>