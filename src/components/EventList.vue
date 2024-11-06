<script setup>
import EventCards from '@/components/EventCards.vue';
import { ref, onMounted, computed } from 'vue';
import { useRouter } from "vue-router";

const eventsData = ref([]); 
const router = useRouter();
const month = ref("Alle");
const search = ref("");

import EventsData from "@/data.json";  // This should match your import name

const fetchEvents = async () => {
  try {
    const response = await fetch("https://hotelevents-3ef54-default-rtdb.europe-west1.firebasedatabase.app/events.json");
    if (!response.ok) {
      throw new Error("Failed to fetch data from Firebase");
    }
    const firebaseData = await response.json();

    // Transform the Firebase data into an array and merge with local data
    eventsData.value = Object.entries(firebaseData).map(([id, event]) => {
      // Use the correct variable name for the local JSON data
      const localData = EventsData[id];  // Corrected here
      return {
        id, // Keep the ID from Firebase
        ...event, // Spread Firebase event details
        image: localData ? localData.image : null, // Use image from local data if available
        buttons: localData
          ? [
              localData.primaryButton && { label: localData.primaryButton, url: "#", color: "#00bfff", style: "primary" },
              localData.secondaryButton && { label: localData.secondaryButton, url: "#ff5733", style: "secondary" }
            ].filter(Boolean) // Filter out null entries if any button is missing
          : [], // Default to empty array if no buttons in local data
      };
    });
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};


// Fetch data when component mounts
onMounted(() => {
  fetchEvents();
});

// Computed property to filter events
const filteredEvents = computed(() => {
  return eventsData.value.filter(event => {
    const matchesMonth = month.value === "Alle" || event.month === month.value;
    const matchesSearch = event.name.toLowerCase().includes(search.value.toLowerCase());
    return matchesMonth && matchesSearch;
  });
});

</script>

<template>
    <main class="container">
      <div class="filter">
        <h1 class="headline">Alle Events</h1>
        <select v-model="month">
          <option value="Alle">Alle</option>
          <option value="Jan">Januar</option>
          <option value="Feb">Februar</option>
          <option value="Mar">Marts</option>
          <option value="Apr">April</option>
          <option value="Maj">Maj</option>
          <option value="Jun">Juni</option>
          <option value="Jul">Juli</option>
          <option value="Aug">Aug</option>
          <option value="Sep">September</option>
          <option value="Okt">Oktober</option>
          <option value="Nov">November</option>
          <option value="Dec">December</option>
        </select>
        <input v-model="search" type="text" placeholder="søg">
      </div>
  
      <div class="cards">
        <div 
          v-for="event in filteredEvents" 
          :key="event.id" 
          class="card" 
          @click="router.push(`/event/${event.id}`)"
        >
          <div>
            <img :src="event.image" :alt="event.name" class="event-image" />
            <h2>{{ event.name }}</h2>
            <p>{{ event.description }}</p>
            <p>{{ event.date }}</p>
            <p>{{ event.availableTickets }}</p>
            <p>{{ event.price }}</p>
  
            <div class="buttons">
              <button 
                v-for="button in event.buttons" 
                :key="button.label" 
                :style="{ backgroundColor: button.color }"
                :class="button.style"
                :href="button.url"
              >
                {{ button.label }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </template>

<style scoped>
main {
    font-family: "Libre Baskerville", serif;
  }
  
  .cards h1 {
    font-size: 10px;
  }
  
  .cards {
    display: flex;
    flex-wrap: wrap;
    margin-top: 50px;
    justify-content: center;
  }
  
  .card {
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.207);
    width: 400px;
    height: 500px;
    margin: 25px;
    cursor: pointer;
    position: relative;
  }

  .event-image {
    width: 400px;
    height: auto;
  }
</style>