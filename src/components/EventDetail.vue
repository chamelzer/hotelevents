<script setup>
import { ref, onMounted } from 'vue';
import { defineProps } from 'vue';

const eventDetails = ref(null);
const eventId = 'event3'; // Brug eventId, fx 'event3' i dette tilfælde

// Hent eventdetaljer fra Firebase
const fetchEventDetails = async () => {
  try {
    const response = await fetch(`https://hotelevents-3ef54-default-rtdb.europe-west1.firebasedatabase.app/${eventId}.json`);
    if (!response.ok) {
      throw new Error('Failed to fetch event details');
    }
    const firebaseData = await response.json();
    eventDetails.value = firebaseData;
  } catch (error) {
    console.error('Error fetching event details:', error);
  }
};

const props = defineProps({
  eventDetails: {
    type: Object,
    required: true,
  },
});

// Opdater availableTickets i Firebase
const updateAvailableTickets = async () => {
  console.log('Knap kaldt!');
  if (eventDetails.value && eventDetails.value.availableTickets > 0) {
    // Før opdatering af billetter
    console.log('Før opdatering, tilgængelige billetter:', eventDetails.value.availableTickets);

    try {
      const newAvailableTickets = eventDetails.value.availableTickets - 1; // Reducer med 1 billet
      console.log('Opdatering: ny antal billetter:', newAvailableTickets); // Log ny værdi

      // Opdater database med reduceret antal billetter via REST API
      const response = await fetch(`https://hotelevents-c5779-default-rtdb.europe-west1.firebasedatabase.app/${eventId}.json`, {
        method: 'PATCH', // PATCH opdaterer kun de nødvendige felter
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ availableTickets: newAvailableTickets }), // Send ny værdi
      });

      // Tjek om opdateringen lykkedes
      if (!response.ok) {
        console.error('Fejl ved opdatering af billetter:', response.statusText);
        return;
      }

      // Opdater reaktivt i UI'et
      eventDetails.value.availableTickets = newAvailableTickets;
      console.log('Opdateret tilgængelige billetter:', eventDetails.value.availableTickets); // Log den opdaterede værdi
    } catch (error) {
      console.error('Error updating available tickets:', error);
    }
  } else {
    console.log('Ingen billetter tilgængelige, eller eventDetails er null');
    alert('Der er ikke flere billetter tilgængelige.');
  }
};

onMounted(() => {
  fetchEventDetails();
});
</script>

<template>
  <div>
    <div v-if="eventDetails">
      <h2>{{ eventDetails.name }}</h2>
      <p>{{ eventDetails.date }}</p>
      <p>{{ eventDetails.location }}</p>

      <section class="ticket-booking">
        <h2 class="event-title" v-if="eventDetails?.name">{{ eventDetails.name }}</h2>
        <div class="event-details" v-if="eventDetails?.date || eventDetails?.location">
          <p class="event-date" v-if="eventDetails?.date">{{ eventDetails.date }}</p>
          <p class="event-location" v-if="eventDetails?.location">{{ eventDetails.location }}</p>
        </div>

        <div class="booking-options" v-if="eventDetails?.availableTickets">
          <BookingOption
            :date="eventDetails?.date"
            :time="eventDetails?.date"
            :price="eventDetails?.price"
            :availableTickets="eventDetails?.availableTickets"
          />
        </div>
        
      </section>
    </div>
  </div>
</template>
