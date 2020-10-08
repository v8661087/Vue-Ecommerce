<template>
  <li class="list-type" @click="selectType">{{ list }}</li>
</template>

<script>
export default {
  name: "List",
  props: { list: String },
  methods: {
    selectType() {
      this.$emit("selectType", this.list);
    },
  },
};
</script>

<style>
</style>