<template>
  <div>
    <h1>Orders</h1>
    <table>
      <thead>
        <tr>
          <th>date</th>
          <th>id</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in sortedOrders" :key="order.id">
          <td>{{order.date}}</td>
          <td>{{order.id}}</td>
          <td>
            <router-link :to="{path:'order/'+order.id}">查看</router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  computed: {
    orders() {
      return this.$store.state.orders;
    },
    sortedOrders() {
      var newOrders = this.orders.slice(0);
      newOrders = newOrders.sort((a, b) => (a.date < b.date ? 1 : -1));
      return newOrders;
    }
  }
};
</script>

<style>
</style>