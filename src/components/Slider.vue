<template>
  <swiper id="slider" :options="swiperOption">
    <swiper-slide>
      <div class="slide slide-1"></div>
    </swiper-slide>
    <swiper-slide>
      <div class="slide slide-2"></div>
    </swiper-slide>
    <swiper-slide>
      <div class="slide slide-3"></div>
    </swiper-slide>

    <div class="swiper-pagination" slot="pagination"></div>

    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
  </swiper>
</template>

<script>
import "swiper/dist/css/swiper.css"; // require styles
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  name: "Slider",
  data() {
    return {
      swiperOption: {
        loop: true,
        speed: 300,
        autoplay: {
          delay: 3000
        },
        slidesPerView: "auto",
        centeredSlides: true,
        spaceBetween: 20,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      }
    };
  },
  components: {
    swiper,
    swiperSlide
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.swiper-container {
  width: 100%;
  height: 380px;
  background: #17181c;
}
.swiper-slide {
  width: 50%;
  background-position: center;
  background-size: cover;
  position: relative;
  .slide {
    width: 100%;
    height: 100%;
    background-position: center center;
    background-size: cover;
    &.slide-1 {
      background-image: url("../assets/slider1.png");
    }
    &.slide-2 {
      background-image: url("../assets/slider2.jpg");
    }
    &.slide-3 {
      background-image: url("../assets/slider3.jpg");
    }
  }
}
.swiper-slide-prev,
.swiper-slide-next {
  background: #fff;
  opacity: 0.3;
  transition: all 0.3s;
}
@media screen and (max-width: 640px) {
  .swiper-container {
    height: 280px;
  }
  .swiper-slide {
    width: 69%;
  }
}
</style>