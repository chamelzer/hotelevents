<script setup>
import { ref, onMounted } from 'vue'; // Importer ref og onMounted fra Vue
import { getDatabase, ref as dbRef, get } from '../firebaseConfig'; 
 // Importer Firebase-funktioner
import EventDetail from '@/components/EventDetail.vue';
import BookingOption from '../components/BookingOption.vue';


// Initialiser database
const database = getDatabase();

const loading = ref(true);
const eventDescription = ref('');
const eventDetails = ref(null);

const fetchEventDetails = async () => {
  try {
    // Her hentes dataene fra Firebase
    const dbReference = dbRef(database, 'event3');
    const snapshot = await get(dbReference);
    
    if (snapshot.exists()) {
      const data = snapshot.val();
      console.log('Fetched event data:', data);  // Log data for fejlfinding

      // Håndter eventbeskrivelsen som HTML
      eventDescription.value = data.description;

      // Håndter eventdetaljer
      eventDetails.value = {
        name: data.name,
        date: data.date,
        location: data.location || 'Unknown location',
        availableTickets: data.availableTickets,
        price: data.price
      };
    } else {
      console.log("No event data available.");
    }
  } catch (error) {
    console.error('Error fetching event details:', error);
  } finally {
    loading.value = false;
  }
};

// Fetch event details when the component is mounted
onMounted(() => {
  fetchEventDetails();
});

// Opdatering af billetter
const updateAvailableTickets = async () => {

  if (eventDetails.value && eventDetails.value.availableTickets > 0) {
    try {
      const newAvailableTickets = eventDetails.value.availableTickets - 1;
      await fetch(`https://hotelevents-3ef54-default-rtdb.europe-west1.firebasedatabase.app/event3.json`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ availableTickets: newAvailableTickets }),
      });

      // Opdater UI med de nye billetter
      eventDetails.value.availableTickets = newAvailableTickets;
    } catch (error) {
      console.error('Error updating available tickets:', error);
    }
  } else {
    alert('Der er ikke flere billetter tilgængelige.');
  }
};
</script>


<template>
  <main class="main-content">
    <div class="content-wrapper">
      <!-- Event Info Section -->
      <section class="event-info">
        <img :src="eventDetails?.image" class="event-img" alt="Event image" v-if="eventDetails?.image" />
        <p v-else>Ingen billede tilgængelig</p> <!-- Hvis billedet ikke findes -->
        <p v-if="loading">Loading...</p>
        <p v-else v-html="eventDetails?.description || 'Beskrivelse ikke tilgængelig'"></p>
      </section>
      
      <!-- Event Details Section with EventDetail component -->
      <EventDetail v-if="eventDetails" :eventDetails="eventDetails" />
      
      <!-- Unique Event Section (Dinner Days på H.C. by Meyers) -->
      <section class="ticket-booking">
        <h2 class="event-title">Dinner Days på H.C. by Meyers</h2>
        <div class="event-details">
          <p class="event-date">Dato: 14. oktober 2024 - 16:30-19:30</p>
          <p class="event-location">Hotel Odeon, Odense</p>
        </div>
        <div class="booking-options">
          <BookingOption date="DEN 14 OKTOBER" time="oktober 2024 – 16:30-19:30" price="259,00 DKK" />
          <BookingOption date="DEN 1 NOVEMBER" time="November 2024 – 16:30-19:30" price="259,00 DKK" />
          <BookingOption date="DEN 3 DECEMBER" time="December 2024 – 16:30-19:30" price="259,00 DKK" />
        </div>
        
      
        <button @click="updateAvailableTickets" class="buy-tickets-btn">Køb billetter</button>
        
        <div class="contact-info">
          <h3 class="contact-title">Kontaktinformation</h3>
          <p class="contact-details">Hotel Odeon <br> info@hotelodeon.dk <br> +45 65 42 05 00</p>
        </div>
      </section>
    </div>
  </main>
</template>


<style scoped>
.main-content {
  margin-top: 104px;
}

.content-wrapper {
  max-width: 1317px;
  margin: 0 auto;
  display: flex;
  gap: 20px;
}

.event-info {
  flex: 1;
}

.ticket-booking {
  flex: 1;
  background-color: #fff;
  box-shadow: 0 4px 10px 2px rgba(0, 0, 0, 0.25);
  padding: 31px 44px;
}

.event-img {
  width: 604px;
  height: 476px;
  margin-bottom: 20px;
}

.event-title {
  color: #000;
  font-size: 48px;
  font-weight: 700;
  letter-spacing: 0.96px;
}

.event-details {
  margin-top: 46px;
}

.booking-options {
  margin-top: 106px;
}

.buy-tickets-btn {
  background-color: #000;
  color: #fff;
  border: none;
  padding: 22px 23px;
  font-size: 22px;
  font-weight: 700;
  margin-top: 73px;
  cursor: pointer;
}

.contact-info {
  background-color: #f8f6f4;
  padding: 45px 80px;
  margin-top: 46px;
  text-align: center;
}

.contact-title,
.contact-details {
  color: #4b4643;
  font-size: 18px;
}
</style>
