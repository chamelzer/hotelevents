<script setup>
import { ref } from 'vue';

// Dummy data for events
const events = ref([
  { id: 1, 
    title: 'Event 1', 
    description: 'Beskrivelse af Event 1' },

  { id: 2, 
    title: 'Event 2', 
    description: 'Beskrivelse af Event 2' },

  { id: 3, 
    title: 'Event 3', 
    description: 'Beskrivelse af Event 3' },

  { id: 4, 
    title: 'Event 4', 
    description: 'Beskrivelse af Event 4' },

  { id: 5, 
    title: 'Event 5', 
    description: 'Beskrivelse af Event 5' },
]);
</script>

<template>
  <div class="slider-container">
    <div class="slider">
      <div v-for="event in events" :key="event.id" class="card">
        <h3>{{ event.title }}</h3>
        <p>{{ event.description }}</p>
        <p>hejjjj</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Konfigurer containerens størrelse */
.slider-container {
  overflow: hidden;
  width: 100%;
  max-width: 600px; /* Juster denne efter behov */
  margin: auto;
  border-radius: 10px;
}

.slider {
  display: flex;
}

.card {
  min-width: 200px;
  margin-right: 20px;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
}
</style>
