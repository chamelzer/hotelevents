<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import EventsData from "@/data.json";

const eventDetails = ref(null); 
const route = useRoute();
const eventId = route.params.id; 


const fetchEventDetails = async () => {
  try {
    
    const response = await fetch(`https://hotelevents-3ef54-default-rtdb.europe-west1.firebasedatabase.app/events/${eventId}.json`);
    if (!response.ok) {
      throw new Error('Failed to fetch event details');
    }
    const firebaseData = await response.json();

    
    const localEventData = EventsData[eventId];

    eventDetails.value = {
      ...firebaseData,
      image: localEventData ? localEventData.image : null, 
    };
  } catch (error) {
    console.error('Error fetching event details:', error);
  }
};

onMounted(fetchEventDetails);
</script>

<template>

    <nav class="breadcrumb">
        <span class="homelink">Forside / </span>
        <router-link to="/" class="events-link">Events</router-link> /
        <span class="current-event">{{ eventDetails?.name }}</span>
      </nav>


    <div class="event-background">
        <div class="event-container">
        <div class="event-info">
            <div v-if="eventDetails">
            <h1 class="title">{{ eventDetails.name }}</h1>
            <p>Dato: {{ eventDetails.date }}</p>
            <p class="description" v-html="eventDetails.description"></p>
            <p class="price">{{ eventDetails.price }}</p>
            <button v-if="eventDetails.primaryButton" class="p-button">{{ eventDetails.primaryButton }}</button>
            </div>
        </div>
    
        <div class="event-image">
            <div v-if="eventDetails && eventDetails.image">
            <img :src="eventDetails.image" :alt="eventDetails.name" class="event-photo" />
            </div>
        </div>  
        </div>
    </div>
  </template>

<style scoped>

  .breadcrumb {
    margin-left: 10vw;
    margin-top: 100px;
  }

  .events-link:hover::v-deep {
    text-decoration: underline;
  }
  .events-link, .homelink {
    text-decoration: none;
    color: black;
    font-weight: bold;
    cursor: pointer;
  }

  .current-event {
    font-weight: bold;
    color: #AB4E1C;
  }

  .event-container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 20px; 
    margin-top: 100px;
    height: 700px;
  }
  
  .event-info {
    flex: 1; 
    max-width: 60%; 
    margin-left: 10vw;
    margin-top: -65px;

  }
  
  .event-image img {
    flex: 1; 
    max-width: 50%; 
    display: flex;
    justify-content: center; 
    right: 0;
    top: 180px;
    position: absolute;
    width: 700px;
    height: 600px;
    object-fit: cover;
  }

  .description {
    width: 70%;
    font-size: 18px;
    color: #4B4643;
  }

  .title {
    font-size: 48px;
    max-width: 60%;
  }

  .event-background {
    background-color: #F8F6F4;
    padding-bottom: 150px;
    margin-top: 100px; 
    width: 70vw; 
  }

  .price {
    font-weight: bold;
    font-size: 25px;
  }

  .p-button {
    background-color: #AB4E1C;
    padding: 20px 30px 20px 30px ;
    border: 0;
    font-weight: bold;
    color: white;
  }
  .p-button:hover:deep {
    background-color: #C25D29;
    cursor: pointer;
  }

</style>
  
  