<template>
  <div class="form-information">
    <div>
      <span>Email</span>
      <span>{{form.email}}</span>
    </div>
    <div>
      <span>收件人姓名</span>
      <span>{{form.username}}</span>
    </div>
    <div>
      <span>收件人電話</span>
      <span>{{form.usertel}}</span>
    </div>
    <div>
      <span>收件人地址</span>
      <span>{{form.useraddress}}</span>
    </div>
    <div>
      <span>留言</span>
      <span>{{form.message}}</span>
    </div>
    <div>
      <span>付款狀態</span>
      <b class="text-success" v-if="paymentStatus">成功付款</b>
      <b class="text-failure" v-else>尚未付款</b>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderForm",
  props: {
    form: Object,
    paymentStatus: Boolean
  }
};
</script>

<style lang="scss">
</style>