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
        <b style="color:#3FBF3F" v-if="paymentStatus">成功付款</b>
        <b style="color:red" v-else>尚未付款</b>
      </div>
    </div>
</template>

<script>
export default {
    name:"OrderForm",
    props:{
        form:Object,
        paymentStatus:Boolean
    }
}
</script>

<style lang="scss">
h1{
  word-wrap: break-word
}
.form-information{
  max-width: 480px;
  margin: 15px auto;
  div{
    border-bottom:1px solid gray;
    height: 60px;
    display: flex;
    justify-content:flex-start;
    align-items: center;
    padding: 0 6px;
  }
  span{
    display: block;
    width: 45%;
    text-align: left;
    word-wrap:break-word;
  }
}
</style>