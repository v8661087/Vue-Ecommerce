<template>
  <div class="dashboard">
    <div class="dashboard-action">
      <ul>
        <li>
          <router-link to="/dashboard">Dashboard</router-link>
        </li>
        <li>
          <router-link to="/dashboard/products">商品列表</router-link>
        </li>
        <li>
          <router-link to="/dashboard/new">新增商品</router-link>
        </li>
        <li>
          <router-link to="/dashboard/orders">訂單列表</router-link>
        </li>
      </ul>
    </div>
    <router-view class="dashboard-view"></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
</style>