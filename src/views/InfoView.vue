<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import EventsData from "@/data.json";
import { useRouter} from 'vue-router'
import Newsletter from '@/components/NewsLetter.vue';

const eventDetails = ref(null); 
const route = useRoute();
const router = useRouter();
const eventId = route.params.id; 

const navigateToBooking = () => {
  router.push('/booking');
};


const imageAnimationClass = ref('hidden-right');
const infoAnimationClass = ref('hidden-left');



const fetchEventDetails = async () => {
  try {
    
    const response = await fetch(`https://hotelevents-c5779-default-rtdb.europe-west1.firebasedatabase.app/events/${eventId}.json`);
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

onMounted(() => {
  fetchEventDetails();

  setTimeout(() => {
    imageAnimationClass.value = 'slide-in-right';
    infoAnimationClass.value = 'slide-in-left';
  }, 100);
});
</script>

<template>

  <div class="event-image" :class="imageAnimationClass">
    <div v-if="eventDetails && eventDetails.image">
    <img :src="eventDetails.image" :alt="eventDetails.name" class="event-photo" />
    </div>
    <nav class="breadcrumb">
        <span class="homelink">Forside / </span>
        <router-link to="/" class="events-link">Events</router-link> /
        <span class="current-event">{{ eventDetails?.name }}</span>
      </nav>

    </div>  
    <div class="event-background">
        <div class="event-container">
          <div class="event-info" :class="infoAnimationClass">
            <div v-if="eventDetails">
            <h1 class="title">{{ eventDetails.name }}</h1>
            <p>Dato: {{ eventDetails.date }}</p>
            <p class="description" v-html="eventDetails.description"></p>
            <p class="price">{{ eventDetails.price }}</p>
            <button @click="navigateToBooking" v-if="eventDetails.primaryButton" class="p-button">{{ eventDetails.primaryButton }}</button>
            </div>
        </div>
        </div>
    </div>
    <Newsletter />
  </template>

<style scoped>

  .breadcrumb {
    margin-left: 10vw;
    margin-top: 100px;
  }

  .events-link:hover {
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
    height: auto;
  }
  
  .event-info {
    flex: 1; 
    max-width: 60%; 
    margin-left: 10vw;
    margin-top: -65px;

  }
  
  .event-image img {
    flex: 1; 
    display: flex;
    justify-content: center; 
    right: 0;
    top: 180px;
    position: absolute;
    width: 50vw;
    height: 40vw;
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
    display: flex;
    align-items: stretch;
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
  .p-button:hover {
    background-color: #C25D29;
    cursor: pointer;
  }

@media (max-width: 1024px) {
  .event-container {
    flex-direction: column-reverse;
    align-items: center;
  }

  .description {
    font-size: 16px;
    width: 100px;
    margin: 0 auto;
  }

  .breadcrumb {
    margin-top: 30px;
  }

  .title {
    font-size: 36px;
    max-width: none;
  }

  .event-background {
    width: 100%;
    padding: 0;
    margin: 0;
  }

  .event-image img {
    width: 100%;
    height: auto;
    max-height: 400px;
    object-fit: cover;
  }

  .event-image img {
    width: 100vw;
    height: auto;
    position: relative;
    top: 0;
  }

  .event-info {
    max-width: 90%;
    margin: 20px 5vw;
    text-align: center;
  }

  .title {
    font-size: 36px;
  }

  .description {
    font-size: 16px;
    width: 100%;
  }

  .price {
    font-size: 20px;
  }

  .p-button {
    font-size: 16px;
    padding: 15px 20px;
  }
  
}

@media (max-width: 768px) {
  .event-container {
    flex-direction: column-reverse;
    align-items: center;
  }

  .title {
    font-size: 36px;
    max-width: none;
  }

  .event-background {
    width: 100%;
    margin-top: 0;
  }

  .event-image img {
    width: 100%;
    height: auto;
    max-height: 400px;
    object-fit: cover;
  }

  .event-info {
    margin: 10px 5vw;
    text-align: center;
  }

  .title {
    font-size: 28px;
  }

  .description {
    font-size: 14px;
    width: 100%;
  }

  .price {
    font-size: 18px;
  }

  .p-button {
    font-size: 14px;
    padding: 10px 15px;
  }
}

@media (max-width: 1024px) {
  .description {
    font-size: 16px;
    width: 60%;
    margin: 0 auto;
    
  }

  .event-container {
    margin-top: 0;
    padding-top: 0;
  }

  .breadcrumb {
    margin-bottom: 30px;
  }
  
}

@media (max-width: 768px) {
  .description {
    font-size: 14px;
    width: 80%;
    margin: 0 auto;
    text-align: center;
  }

  .event-container {
    margin-top: 0;
    padding-top: 0;
  }
  
}

.hidden-right {
  opacity: 0;
  transform: translateX(100%);
}

.hidden-left {
  opacity: 0;
  transform: translateX(-100%);
}

.slide-in-right {
  animation: slide-right 0.5s ease-out forwards;
}

.slide-in-left {
  animation: slide-left 0.5s ease-out forwards;
}

@keyframes slide-right {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slide-left {
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

</style>
  
  