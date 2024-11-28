<script setup>
import Newsletter from '@/components/NewsLetter.vue';
import { ref, onMounted, computed } from 'vue';
import { useRouter } from "vue-router";
import EventsData from "@/data.json";

const eventsData = ref([]); 
const router = useRouter();
const month = ref("Alle");
const search = ref("");
const cat = ref("Alle");

const navigateToBooking = () => {
  router.push('/booking');
};



const fetchEvents = async () => {
  try {
    const response = await fetch("https://hotelevents-3ef54-default-rtdb.europe-west1.firebasedatabase.app/events.json");
    if (!response.ok) {
      throw new Error("fejl");
    }
    const firebaseData = await response.json();

    eventsData.value = Object.entries(firebaseData)
      .map(([id, event]) => {
        const localData = EventsData[id];  
        return {
          id,
          ...event,
          image: localData ? localData.image : null,
          dateObject: new Date(event.date),
        };
      })
      .sort((a, b) => a.dateObject - b.dateObject);
  } catch (error) {
    console.error("fejl:", error);
  }
};


onMounted(() => {
  fetchEvents();
});

const filteredEvents = computed(() => {
  return eventsData.value.filter(event => {
    const matchesMonth = month.value === "Alle" || event.month === month.value;
    const matchesSearch = event.name.toLowerCase().includes(search.value.toLowerCase());
    const matchesCategory = cat.value === "Alle" || event.category === cat.value;
    return matchesMonth && matchesSearch && matchesCategory;
  });
});

const tagColors = {
  "Populært": "#E1C58B",
  "Deals": "#B6BC98",
  "Nyhed": "#95ACAC",
};

const getTagColor = (tag) => {
  return tagColors[tag] || "#ffffff";
};

</script>

<template>
    <main class="container">
      <div class="filter">
        <h1 class="headline">Alle Events</h1>
        <select v-model="month" class="filter-drop">
          <option value="Alle">Måned (alle)</option>
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
        <input v-model="search" type="text" placeholder="Søg efter event" class="searchbar">
        <div class="category-filter">
          <button 
            v-for="category in ['Alle', 'Mad og drikke', 'Musik og underholdning', 'Drinks og hygge']" 
            :key="category" 
            :class="{ active: cat === category }" 
            @click="cat = category">
            {{ category }}
          </button>
        </div>
      </div>
  
      <div class="cards">
        <div 
          v-for="event in filteredEvents" 
          :key="event.id" 
          class="card" 
        >
                
                <img :src="event.image" :alt="event.name" class="event-image" />
                <div class="card-info">
                    <div class="date">
                        <div class="month">
                        <h1> {{ event.month }} </h1>
                        </div>
                        <div class="day">
                        <h4> {{ event.day }} </h4>
                        </div>
                      </div>
                      <div 
                        v-if="event.tag" 
                        class="tag" 
                        :style="{ backgroundColor: getTagColor(event.tag) }"
                        >
                        {{ event.tag }}
                        </div>
                      <h3 class="event-title"> {{ event.name }} </h3>
                      <h4 class="event-time"> {{ event.date }} </h4>
                      <h4 class="event-price"> {{ event.price }} </h4>
                      <div class="buttons">
                        <button
                        v-if="event.secondaryButton"
                        class="s-button"
                        @click="router.push(`/event/${event.id}`)"
                      >
                        {{ event.secondaryButton }}
                      </button>
                        <button
                        v-if="event.primaryButton"
                        class="p-button"
                        @click="navigateToBooking"
                      >
                        {{ event.primaryButton }}
                      </button>
                      </div>
                <div>
            </div>
          </div>
        </div>
      </div>
      <Newsletter />
    </main>
  </template>

<style scoped>

main {
    font-family: "Libre Baskerville", serif;
  }
  
  .cards h1 {
    font-size: 10px;
  }

  .card-info {
    padding: 10px 20px  10px 20px;
  }

  .buttons {
    display: flex;
    flex-direction: row;
    position: absolute;
    bottom: 20px;
    gap: 20px;
  }

  .date {
    position: absolute;
    top: 20px;
    left: 0;
  }
  
  .month h1 {
    width: 60px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color:#AB4E1C;
    color: white;
    font-size: 14px;
    padding: 0;
    margin: 0;
  }
  
  .day h4{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    background-color: white;
    font-size: 30px;
    color: black;
    padding: 0;
    margin: 0;
  }
  
  .tag {
    position: absolute;
    font-size: 10px;
    text-transform: uppercase;
    color: black;
    padding: 3px 7px 3px 7px;
    font-weight: bold;
  }
  
  .event-title {
    padding-top: 15px;
  }
  
  .event-time{
    color: #4B4643;
    font-size: 14px;
    margin-top: 10px;
    font-weight: lighter;
  }

  .button-class {
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
  }

  .filter {
    margin-left: 7vw;
    color: black;
  }

  .headline {
    padding-bottom: 20px;
  }

  .p-button {
    background-color: #AB4E1C;
    padding: 10px 15px 10px 15px ;
    border: 0;
    font-weight: bold;
    color: white;
  }
  
  .s-button {
    border-radius: 0px;
    border: #AB4E1C 1px solid;
    color: #AB4E1C;
    background-color: white;
    font-weight: bold;
    padding: 10px 15px 10px 15px ;
  }

  .p-button:hover {
    background-color: #C25D29;
    cursor: pointer;
  }
  
  .s-button:hover {
    border: #4B4643 1px solid;
    cursor: pointer;
    color: #4B4643;
  }

  .searchbar {
    border-radius: 0;
    border: #C1C1C2 1px solid;
    width: 200px;
    height: 30px;
  }

  .filter-drop {
    border-radius: 0;
    border: #C1C1C2 1px solid;
    height: 34px;
    width: 150px;
    margin-right: 20px;
  }

  .category-filter {
    display: flex;
    gap: 10px;
    margin-top: 20px;
    margin-top: 20px;
  }
  
  .category-filter button {
    border: none;
    background-color: #f1f1f1;
    padding: 10px 15px;
    cursor: pointer;
  }
  
  .category-filter button.active {
    background-color: #AB4E1C;
    color: white;
  }

  .cards {
    display: flex;
    flex-wrap: wrap;
    margin-top: 50px;
    justify-content: flex-start;
    width: calc(100% - 14vw);
    margin-left: 7vw;
    gap: 3vw;
  }
  
  .card {
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.207);
    max-width: 400px;
    width: calc(33.33% - 2vw); 
    height: 470px;
    cursor: pointer;
    position: relative;
    background-color: white;
  }
  
  .event-image {
    max-width: 100%;
    max-height: 230px;
    width: 100%;
    height: auto;
    object-fit: cover;
    object-position: center;
  }
  
  @media (max-width: 1200px) {
    .cards {
      justify-content: space-between;
    }
  
    .card {
      width: calc(33.33% - 2vw); 
      height: 420px;
    }
  
    .event-image {
      max-height: 200px; 
    }
  }
  
  @media (max-width: 1024px) {
    .cards {
      justify-content: center;
    }
  
    .card {
      width: calc(50% - 2vw);
      height: 420px;
    }
  
    .event-image {
      max-height: 200px;
    }

    .headline {
      font-size: 20px;
    }
  
  }
  
  @media (max-width: 768px) {
    .card {
      width: calc(100% - 4vw); 
      height: 400px; 
    }
  
    .event-image {
      max-height: 180px; 
    }
  }

  @media (max-width: 768px) {
    .event-price {
      margin-top: -15px; 
      margin-bottom: 10px; 
      text-align: left; 
    }
  }

@media (max-width: 768px) {
  .category-filter {
    display: flex;
    flex-wrap: wrap; 
    gap: 10px; 
  }
}

  
</style>