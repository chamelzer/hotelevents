<script setup>
import { ref } from 'vue';

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
            <p class="month"> {{ event.month }} </p>
            <p class="day"> {{ event.day }} </p>
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
}

.card {
  min-width: 200px;
  margin: 0 30px;
  padding:20px 50px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(82, 82, 82, 0.2);
  text-align: center;
  color: black;
  border: chartreuse solid 1px;
}

.image{

}

.date{

}

.month{

}

.day{

}

.contnet{

}

.tagdiv{

}

.tag{

}

.title{

} 

.time{

}

.buttons{

}

.primaryButton{ 

}

.secondaryButton{

}
</style>
