<script setup>
import EventCards from '@/components/EventCards.vue';
import { ref, onMounted, computed } from 'vue';
import { useRouter } from "vue-router";

const eventsData = ref([]); 
const router = useRouter();
const month = ref("Alle");
const search = ref("");

// Function to fetch data from Firebase
const fetchEvents = async () => {
  try {
    const response = await fetch("https://hotelevents-3ef54-default-rtdb.europe-west1.firebasedatabase.app/events.json");
    if (!response.ok) {
      throw new Error("Failed to fetch data from Firebase");
    }
    const data = await response.json();

    // Transform the Firebase data into an array
    eventsData.value = Object.entries(data).map(([id, event]) => ({
      id, // Use Firebase node key as ID
      ...event, // Spread the event details
    }));
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
                <h2>{{ event.name }}</h2>
                <p>{{ event.description }}</p>
                <p>{{ event.date }}</p>
                <p>{{ event.price }}</p>
              </div>
            </div>
          </div>
      </main>
</template>

<style scoped>

</style>