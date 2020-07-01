<template>
  <nav style="margin-bottom:30px" v-if="totalPage>1">
    <ul class="pagination">
      <li class="page-item">
        <a
          class="page-link"
          @click.prevent="setPage(currPage-1)"
          :class="{'disabled':currPage===1}"
          href="#"
        >
          <span>&laquo;</span>
        </a>
      </li>
      <li class="page-item" v-for="n in totalPage" :key="n">
        <a
          class="page-link"
          v-bind:class="{'active disabled': (currPage === (n))}"
          href="#"
          @click.prevent="setPage(n)"
        >{{n}}</a>
      </li>
      <li class="page-item">
        <a
          class="page-link"
          href="#"
          @click.prevent="setPage(currPage+1)"
          :class="{'disabled':currPage===totalPage}"
        >
          <span>&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    currPage: Number,
    totalPage: Number
  },
  methods: {
    setPage(payload) {
      this.$emit("setPage", payload);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>