<script setup>
import { ref } from 'vue';

import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Navigation } from 'vue3-carousel';

// Events
const events = ref([
  { id: 1, 
    title: 'Dinner Days på HC by Meyers', 
    image: 'event1.jpg',
    month: 'Okt',
    day: '14',
    tag: 'Populært',
    time: '14. - 20. oktober 2024 - 16:30-19:30',
    primaryButton: 'Book bord',
    secondaryButton: 'Læs mere' },

  { id: 2, 
    title: 'Cozy Loungebar', 
    image: 'event2.jpg',
    month: 'Okt',
    day: '14',
    tag: 'Populært',
    time: '14. - 20. oktober 2024 - 16:30-19:30',
    primaryButton: 'Book bord',
    secondaryButton: 'Læs mere' },

  { id: 3, 
    title: 'Cocktailbar', 
    image: 'event3.jpg',
    month: 'Okt',
    day: '25',
    tag: 'Populært',
    time: '25. oktober 2024 - 16:30-19:30',
    primaryButton: 'Book bord',
    secondaryButton: 'Læs mere' },

]);
</script>

<template>
  <div class="slider-container">
    <div class="slider">
      <div v-for="event in events" :key="event.id" class="card">

        <div class="image">
          {{ event.image }} 
          <div class="date">
            <div class="month"> {{ event.month }} </div>
            <div class="day"> {{ event.day }} </div>
          </div>
        </div>

        <div class="content">
          <div class="tagdiv">
            <p class="tag"> {{ event.tag }} </p>
          </div>

          <div>
            <h3 class="title"> {{ event.title }} </h3>
            <p class="time"> {{ event.time }} </p>
          </div>

          <div class="buttons">
            <button class="primaryButton"> {{ event.primaryButton }} </button>
            <button class="secondaryButton"> {{ event.secondaryButton }} </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.slider-container {
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

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #FFF;
  box-shadow: 0px 4px 8px 0px rgba(162, 162, 162, 0.25);
  border: orange solid 1px;
}

</style>