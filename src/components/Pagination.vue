<template>
  <nav style="margin-bottom: 30px" v-if="totalPage > 1">
    <ul class="pagination">
      <li>
        <a
          class="pagination-link"
          @click.prevent="setPage(currPage - 1)"
          :class="{ disabled: currPage === 1 }"
          href="#"
        >
          <span>&laquo;</span>
        </a>
      </li>
      <li v-for="n in totalPage" :key="n">
        <a
          class="pagination-link"
          v-bind:class="{ 'active disabled': currPage === n }"
          href="#"
          @click.prevent="setPage(n)"
          >{{ n }}</a
        >
      </li>
      <li>
        <a
          class="pagination-link"
          href="#"
          @click.prevent="setPage(currPage + 1)"
          :class="{ disabled: currPage === totalPage }"
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
    totalPage: Number,
  },
  methods: {
    setPage(payload) {
      this.$emit("setPage", payload);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>