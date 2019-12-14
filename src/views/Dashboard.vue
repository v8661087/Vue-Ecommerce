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
$phone-media:480px;
@mixin phone-width(){
   @media all and (max-width: $phone-media){
     @content
   }
}
.dashboard {
  display: flex;
  justify-content: center;
  @include phone-width{
    display: block;
    }
  &-action {
    max-width: 180px;
    width: 100%;
    border-right: 1px solid gray;
    @include phone-width{
      max-width: none;
      border:none
    }
  }
  &-view {
    width: 100%;
    min-width: 240px;
    table {
      word-break:break-all; word-wrap:break-all;
      margin: 0 auto;
      box-sizing: border-box
    }
  }
  ul{
    @include phone-width{
      display: flex;
    }
  }
  li {
    height: 30px;
    @include phone-width{
      padding: 3px;
    }
  }
}
</style>