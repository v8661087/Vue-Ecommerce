<template>
  <div>
    <h1>Pokemon電商網站</h1>
    <router-link to="/">
      <img class="about-logo" src="@/assets/pokeball.png" alt="pokeball" draggable="false" />
    </router-link>
    <h3>此網站僅作為個人練習</h3>
    <h3>預設登入帳號無法進行資料操作</h3>
  </div>
</template>

<script>
export default {};
</script>

<style lang='scss'>
.about-logo {
  width: 180px;
  transition: 1s;
  border-radius: 50%;
  box-shadow: 0 4px 8px 0 rgb(0, 255, 128), 0 6px 20px 0 rgb(0, 255, 128);
  &:hover {
    transform: scale(1.2);
  }
}
</style>