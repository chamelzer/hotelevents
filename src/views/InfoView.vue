  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const eventId = route.params.id; 
  const eventDetails = ref(null); 
  
  const fetchEventDetails = async () => {
    try {
      const response = await fetch(`https://hotelevents-3ef54-default-rtdb.europe-west1.firebasedatabase.app/events/${eventId}.json`);
      if (!response.ok) {
        throw new Error('Failed to fetch event details');
      }
      eventDetails.value = await response.json(); // Fetch and assign the event details
    } catch (error) {
      console.error('Error fetching event details: ', error);
    }
  };
  
  onMounted(fetchEventDetails);
  </script>

<template>
    <div v-if="eventDetails">
      <h1>{{ eventDetails.name }}</h1>
      <p>{{ eventDetails.description }}</p>
      <p>Date: {{ eventDetails.date }}</p>
      <p>Available Tickets: {{ eventDetails.availableTickets }}</p>
      <p>Price: {{ eventDetails.price }}</p>
    </div>
    <div v-else>
      <p>Loading event details...</p>
    </div>
  </template>
  