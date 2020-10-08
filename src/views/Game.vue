<template>
  <div>
    <h1>完成翻牌配對遊戲即可獲得優惠券代碼</h1>
    <h2 v-if="clear">優惠券代碼:30off</h2>
    <button v-if="clear" @click="refreshCards">在玩一次</button>
    <div class="cards">
      <Card
        v-for="(card, index) in cards"
        :card="card"
        :key="index"
        @flip="flipCard(card)"
        :lockBoard="lockBoard"
      />
    </div>
  </div>
</template>

<script>
import Card from "@/components/Card.vue";
export default {
  name: "game",
  data() {
    return {
      max: 4, //組數
      cards: [],
      firstCard: null,
      secondCard: null,
      hasFlippedCard: false,
      lockBoard: false,
      clear: false,
      count: 0,
    };
  },
  components: { Card },
  methods: {
    //創造卡片
    createCards() {
      for (let i = 1; i <= this.max; i++) {
        this.cards.push({ num: i, flipped: false, matched: false });
        this.cards.push({ num: i, flipped: false, matched: false });
      }
    },
    //亂序卡片
    randomCards(max) {
      for (let i = 0; i < this.cards.length; i++) {
        let randomPos = Math.floor(Math.random() * max);
        [this.cards[randomPos], this.cards[i]] = [
          this.cards[i],
          this.cards[randomPos],
        ];
      }
    },
    //翻開卡片
    flipCard(card) {
      //避免已經配對成功
      if (card.matched) return;
      // 避免翻完前點擊
      if (this.lockBoard) return;
      // 避免翻同一張牌當做第二張
      if (card === this.firstCard) return;
      //如果還沒翻任何一張
      if (!this.hasFlippedCard) {
        this.hasFlippedCard = true;
        this.firstCard = card;
        this.firstCard.flipped = true;
        return;
      }
      this.secondCard = card;
      this.secondCard.flipped = true;
      this.checkMatch();
    },
    //檢查配對
    checkMatch() {
      let isMatch = this.firstCard.num === this.secondCard.num;
      isMatch ? this.disableCards() : this.unflipedCards();
    },
    //配對成功並計算組數
    disableCards() {
      this.firstCard.matched = true;
      this.secondCard.matched = true;
      this.count++;
      if (this.count === this.max) {
        this.clear = true;
        window.scroll(0, 0);
      }
      this.resetBoard();
    },
    //配對錯誤翻回背面
    unflipedCards() {
      this.lockBoard = true;
      setTimeout(() => {
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.resetBoard();
      }, 600);
    },
    //重置資料
    resetBoard() {
      [this.hasFlippedCard, this.lockBoard] = [false, false];
      [this.firstCard, this.secondCard] = [null, null];
    },
    refreshCards() {
      this.cards.forEach((card) => {
        card.flipped = false;
        card.matched = false;
      });
      this.clear = false;
      this.count = 0;
      this.resetBoard();
      this.randomCards(this.max);
    },
  },
  created() {
    this.createCards();
    this.randomCards(this.max);
  },
};
</script>

<style>
</style>