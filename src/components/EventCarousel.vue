<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Carousel, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';
import EventsData from '@/data.json';

// Carousel configuration
const config = {
  itemsToShow: 3.3,
  wrapAround: true,
  autoplay: 3000,
  pauseAutoplayOnHover: true,
};

const eventsData = ref([]);
const router = useRouter();

// Fetch events data from Firebase and merge with local data
const fetchEvents = async () => {
  try {
    const response = await fetch(
      'https://hotelevents-3ef54-default-rtdb.europe-west1.firebasedatabase.app/events.json'
    );
    if (!response.ok) {
      throw new Error('Failed to fetch data from Firebase');
    }
    const firebaseData = await response.json();

    // Merge Firebase data with local data
    eventsData.value = Object.entries(firebaseData).map(([id, event]) => {
      const localData = EventsData[id];
      return {
        id,
        ...event,
        image: localData ? localData.image : null,
        buttons: localData
          ? [
              localData.primaryButton && { label: localData.primaryButton, url: '#', style: 'primary' },
              localData.secondaryButton && { label: localData.secondaryButton, url: '#', style: 'secondary' },
            ].filter(Boolean)
          : [],
      };
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Fetch data on component mount
onMounted(fetchEvents);

const tagColors = {
  Populært: '#E1C58B',
  Deals: '#B6BC98',
  Nyhed: '#95ACAC',
};

const getTagColor = (tag) => {
  return tagColors[tag] || '#E1C58B';
};
</script>

<template>
  <main class="container">
    <Carousel v-bind="config" class="carousel">
      <Slide v-for="event in eventsData" :key="event.id" class="slide-container">
        <div class="card" @click="router.push(`/event/${event.id}`)">
          <img :src="event.image" :alt="event.name" class="event-image" />

          <div class="card-info">

            <div class="date">
              <div class="month">
                <h1>{{ event.month }}</h1>
              </div>
              <div class="day">
                <h4>{{ event.day }}</h4>
              </div>
            </div>

            <div v-if="event.tag" class="tag" :style="{ backgroundColor: getTagColor(event.tag) }">
              {{ event.tag }}
            </div>

            <h3 class="event-title">{{ event.name }}</h3>
            <h4 class="event-time">{{ event.date }}</h4>
            <h4 class="event-price">{{ event.price }}</h4>

            <div class="buttons">
                <button v-if="event.secondaryButton" class="s-button">
                    {{ event.secondaryButton }}
                </button>
                <button v-if="event.primaryButton" class="p-button">
                    {{ event.primaryButton }}
                </button>
            </div>

          </div>
        </div>
      </Slide>
    </Carousel>
  </main>
</template>

<style scoped>
main {
  font-family: 'Libre Baskerville', serif;
}
.carousel {
  padding: 60px 0;
  width: 100%;
  background-color: #E4DED8;
  margin-top: 100px;
  margin-bottom: 110px;
}

.card {
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.207);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 25px;
  width: 400px;
  height: 470px;
  cursor: pointer;
  position: relative;
  background-color: white;
}

.event-image {
    max-width: 400px;
    max-height: 230px;
    width: 100%; 
    height: auto;
    object-fit: cover; 
    object-position: center; 
  }

.card-info {
    padding: 10px 20px 10px 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
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
  background-color: #AB4E1C;
  color: white;
  font-size: 14px;
  padding: 0;
  margin: 0;
}

.day h4 {
  display: flex;
  margin-top: -0px;
  justify-content: center;
  align-items: center;
  height: 40px;
  background-color: white;
  font-size: 30px;
  color: black;
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

.event-time {
  color: #4B4643;
  font-size: 14px;
  margin-top: 0px;
  font-weight: lighter;
}

.p-button {
    background-color: #AB4E1C;
    padding: 10px 15px 10px 15px ;
    border: 0;
    font-weight: bold;
    color: white;
  }

.s-button {
  border: #AB4E1C 1px solid;
  color: #AB4E1C;
  background-color: white;
  font-weight: bold;
  padding: 8px 15px;
}

.p-button:hover:deep {
    background-color: #C25D29;
    cursor: pointer;
}
  
.s-button:hover:deep {
    border: #4B4643 1px solid;
    cursor: pointer;
    color: #4B4643;
}
</style>
