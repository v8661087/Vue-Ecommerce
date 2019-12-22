<template>
  <li class="list-type" @click="handleActive">{{list}}</li>
</template>

<script>
export default {
  name: "list",
  props: { list: String },
  methods: {
    handleActive() {
      this.$emit("active", this.list);
    }
  }
};
</script>

<style>
</style>