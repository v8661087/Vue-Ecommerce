<template>
  <div class="card" :class="{ flip: card.flipped }" @click="flipCard">
    <div class="card-front">
      <img
        :src="require(`@/assets/images/${card.num}.jpg`)"
        :alt="card.num"
        draggable="false"
      />
    </div>
    <div class="card-back">
      <img src="@/assets/images/logo.jpg" alt="IZ*ONE" draggable="false" />
    </div>
  </div>
</template>

<script>
export default {
  name: "card",
  props: { card: Object, lockBoard: Boolean },
  methods: {
    flipCard() {
      this.$emit("flip", this.card);
    },
  },
};
</script>
<style lang="scss">
</style>