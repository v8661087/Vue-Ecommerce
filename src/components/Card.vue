<template>
  <div class="card" :class="{flip:card.flipped}" @click="flipCard">
    <div class="card-front">
      <img :src="require(`@/assets/images/${card.num}.jpg`)" :alt="card.num" />
    </div>
    <div class="card-back">
      <img src="@/assets/images/logo.jpg" alt="IZ*ONE" />
    </div>
  </div>
</template>

<script>
export default {
  name: "card",
  props: { card: Object, lockBoard: Boolean },
  methods: {
    flipCard() {
      if (!this.lockBoard && !this.card.matched) {
        this.card.flipped = true;
        this.$emit("flip", this.card);
      }
    },
  },
};
</script>
<style lang="scss">
.card {
  position: relative;
  width: 105px;
  height: 150px;
  margin: 3px;
  transition: 0.6s;
  transform-style: preserve-3d;
  cursor: pointer;
  &-front {
    transform: rotateY(180deg);
  }
  &-front,
  &-back {
    position: absolute;
    transition: 0.6s;
    z-index: 1;
  }
}
img {
  width: 105px;
}
.flip {
  transform: rotateY(180deg);
  .card-front {
    z-index: 99;
    transition: 0.6s;
  }
}
</style>