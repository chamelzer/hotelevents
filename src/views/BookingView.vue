<script setup>
import { ref, onMounted } from 'vue';
import EventDetail from '@/components/EventDetail.vue';
import BookingOption from '../components/BookingOption.vue';

const loading = ref(true);
const eventDescription = ref('');
const eventDetails = ref(null);

// Hent eventdetaljer ved hjælp af REST API
const fetchEventDetails = async () => {
  try {
    // Hent eventdata fra Firebase Realtime Database via REST API
    const response = await fetch('https://hotelevents-3ef54-default-rtdb.europe-west1.firebasedatabase.app/events/event3.json');
    
    if (!response.ok) {
      throw new Error('Fejl ved hentning af event detaljer');
    }

    const data = await response.json();
    console.log('Hentede eventdata:', data); // Log data for fejlfinding
    console.log('Event description:', data.description); 

    // Håndter eventbeskrivelsen som HTML
    eventDescription.value = data.description;
    console.log('Event description:', eventDescription.value); // Log beskrivelsen for at se om den er korrekt

    // Håndter eventdetaljer
    eventDetails.value = {
      name: data.name,
      date: data.date,
      location: data.location || 'Ukendt location',
      availableTickets: data.availableTickets,
      price: data.price,
      image: data.image || '/img/default.jpg' // Brug default billede, hvis ikke angivet
    };
  } catch (error) {
    console.error('Der opstod en fejl:', error);
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
      const response = await fetch('https://hotelevents-3ef54-default-rtdb.europe-west1.firebasedatabase.app/event3.json', {
        method: 'PATCH', // PATCH opdaterer kun de nødvendige felter
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ availableTickets: newAvailableTickets }), // Send ny værdi
      });

      if (!response.ok) {
        throw new Error('Fejl ved opdatering af billetter');
      }

      // Opdater UI med de nye billetter
      eventDetails.value.availableTickets = newAvailableTickets;
    } catch (error) {
      console.error('Der opstod en fejl ved opdatering af billetter:', error);
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
        <img :src="`/dinnerdays.jpg`" class="event-img" alt="event image" />
        <p v-if="loading">Loading...</p>
        <p class="description" v-else v-html="eventDescription || 'Beskrivelse ikke tilgængelig'"></p>
      </section>
      
      <!-- Event Details Section with EventDetail component -->
      <EventDetail v-if="eventDetails" :eventDetails="eventDetails" />
      
      <!-- Unique Event Section (Dinner Days på H.C. by Meyers) -->
      <section class="ticket-booking">
        <h2 class="event-title">{{ eventDetails?.name || 'Dinner Days på H.C. by Meyers' }}</h2>
        <div class="event-details">
          <p class="event-date">Dato: {{ eventDetails?.date || '14. oktober 2024' }}</p>
          <p class="event-location">{{ eventDetails?.location || 'Hotel Odeon' }}</p>
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
  flex-wrap: wrap; /* Allow wrapping of sections */

}

.event-info {
  flex: 1;
}

.ticket-booking {
  flex: 1;
  background-color: #fff;
  box-shadow: 0 4px 10px 2px rgba(0, 0, 0, 0.25);
  padding: 31px 44px;
  margin-bottom: 50px;
}

.event-img {
  width: 100%; /* Full width */
  max-height: 300px; /* Restrict height */
  object-fit: cover;
  display: block;
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

/* Responsive Styles for iPad and Mobile */
@media (max-width: 1024px) {
  .content-wrapper {
    flex-direction: column; /* Stack sections vertically */
    align-items: center;
  }

  .event-img {
    width: 100%; /* Full width */
    max-height: 300px; /* Restrict height */
    object-fit: cover; /* Maintain aspect ratio */
    margin-bottom: 20px; /* Space below image */
    
  }

  .event-info {
    width: 100%; /* Full width */
    margin-bottom: 20px;
  }

  .ticket-booking {
    width: 100%; /* Full width */
  }

  .event-title {
    font-size: 36px; /* Adjust font size */
  }

  .buy-tickets-btn {
    font-size: 16px;
    padding: 15px 20px;
    margin-top: 20px;
  }

  .contact-info {
    padding: 20px;
    font-size: 14px;
  }

  .contact-title {
    font-size: 16px;
  }
  .description {
    width: 90%; /* Adjust the width to make it more narrow */
    margin: 0 auto; /* Center horizontally */
    text-align: center; /* Center text alignment */
    font-size: 16px; 
    padding-top: 20px;
  }
}

/* General ticket-booking styles for smaller screens */
@media (max-width: 1024px) {
  .ticket-booking {
    width: 70%; /* Reduce width for smaller screens */
    padding: 20px; /* Adjust padding for compact view */
    font-size: 14px; /* Smaller font size */
    margin-top: 20px; /* Add spacing between sections */
    margin-bottom: 50px;
  }

  .main-content {
    margin-top: 0;
  }

  .event-title {
    font-size: 32px; /* Reduce title font size */
    text-align: center; /* Center align the title */
  }

  .booking-options {
    margin-top: 20px; /* Reduce space between options */
  }

  .buy-tickets-btn {
    font-size: 16px; /* Adjust button font size */
    padding: 12px 15px; /* Adjust padding for the button */
    margin-top: 20px; /* Reduce space above the button */
  }

  .contact-info {
    padding: 15px; /* Reduce padding */
    font-size: 14px; /* Adjust font size */
    text-align: center; /* Center align content */
  }
}

</style>
