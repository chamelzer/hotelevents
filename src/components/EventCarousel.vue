<script setup>
import { ref } from 'vue';

// import 'vue3-carousel/dist/carousel.css';
// import { Carousel, Slide, Navigation } from 'vue3-carousel';

const config = {
  itemsToShow: 3,
  wrapAround: true,
  autoplay: 2000,
  pauseAutoplayOnHover: true,
};

const images = [
  '../../public/images/beer.jpg',
  '../../public/images/boardgame.jpg',
  '../../public/images/champange.jpg',
  '../../public/images/breakfast.jpg',
  '../../public/images/eateregg.jpg',
  '../../public/images/dinnerdays.jpg'
];

</script>

<template>

</template>

<style scoped>
.slide-container {
  display: flex;
  justify-content: center;
  width: 100%;
  height: fit-content;
  border: red solid 1px;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
}
.slider {
  box-sizing: border-box;
  border:blue solid 1px;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: center;
  overflow: hidden;
  padding: 0 100px 0 100px;
  width: 100%;
  max-width: 1100px;
  gap: 20px;
}

img {
  height: auto;
  width: 200px;
}

.carousel-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #FFF;
  box-shadow: 0px 4px 8px 0px rgba(162, 162, 162, 0.25);
  border: orange solid 1px;
}

.carousel__slide {
  padding: 5px;
}

.carousel__viewport {
  perspective: 2000px;
}

.carousel__track {
  transform-style: preserve-3d;
}

.carousel__slide--sliding {
  transition: 1s;
}

.carousel__slide {
  opacity: 0.9;
  transform: rotateY(-20deg) scale(0.9);
}

.carousel__slide--active ~ .carousel__slide {
  transform: rotateY(20deg) scale(0.9);
}

.carousel__slide--prev {
  opacity: 1;
  transform: rotateY(-10deg) scale(0.95);
}

.carousel__slide--next {
  opacity: 1;
  transform: rotateY(10deg) scale(0.95);
}

.carousel__slide--active {
  opacity: 1;
  transform: rotateY(0) scale(1);
}
</style>
