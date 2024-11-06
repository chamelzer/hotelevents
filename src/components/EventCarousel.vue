<script setup>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Navigation } from 'vue3-carousel';

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
  <Carousel v-bind="config">
    <Slide class="slide-container" v-for="(image, index) in images" :key="index">
      <div class="carousel-item">
        <img :src="image" alt="Beer Image" />
      </div>
    </Slide>

    <template #addons>
      <Navigation />
    </template>
  </Carousel>
</template>

<style scoped>
.slide-container {
  display: flex;
  gap: 20px;
}

img {
  height: auto;
  width: 200px;
}

.carousel-item {
  display: flex;
  height: 200px;
  width: 100%;
  background-color: #ffffff;
  color: #000000;
  font-size: 20px;
  justify-content: center;
  align-items: center;
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
