<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Carousel, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';
import EventsData from '@/data.json';

const config = {
  itemsToShow: 3.3,
  wrapAround: true,
  autoplay: 3000,
  pauseAutoplayOnHover: true,
};

const eventsData = ref([]);
const carouselRef = ref(null);
const currentSlide = ref(0);
const router = useRouter();

const navigateToBooking = () => {
  router.push('/booking');
};


const fetchEvents = async () => {
  try {
    const response = await fetch(
      'https://hotelevents-c5779-default-rtdb.europe-west1.firebasedatabase.app/events.json'
    );
    if (!response.ok) {
      throw new Error('Failed to fetch data from Firebase');
    }
    const firebaseData = await response.json();

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

onMounted(fetchEvents);

const tagColors = {
  Populært: '#E1C58B',
  Deals: '#B6BC98',
  Nyhed: '#95ACAC',
};

const getTagColor = (tag) => {
  return tagColors[tag] || '#E1C58B';
};

const navigateCarousel = (direction) => {
  if (direction === 'prev' && carouselRef.value) {
    carouselRef.value.prev();
  } else if (direction === 'next' && carouselRef.value) {
    carouselRef.value.next();
  }
};
</script>


<template>
  <main class="container">
    <div class="carousel-wrapper">
      <h1 class="headline">Fremhævede Events </h1>
      <Carousel v-bind="config" ref="carouselRef" v-model="currentSlide" class="carousel">
        <Slide v-for="event in eventsData" :key="event.id" class="slide-container">
          <div class="card">
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
            </div>
          </div>
        </Slide>
      </Carousel>

      <!-- Navigation Inside Carousel Wrapper -->
      <div class="carousel-nav">
        <!-- Left Arrow -->
        <button @click="navigateCarousel('prev')" aria-label="Previous" class="carousel-button">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="arrow-icon">
            <path d="M15 19l-7-7 7-7" fill="none" stroke="currentColor" stroke-width="2" />
          </svg>
        </button>

        <!-- Indicators -->
        <div class="indicators">
          <span
            v-for="(event, index) in eventsData"
            :key="event.id"
            :class="{ active: index === currentSlide }"
            class="indicator"
          ></span>
        </div>

        <!-- Right Arrow -->
        <button @click="navigateCarousel('next')" aria-label="Next" class="carousel-button">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="arrow-icon">
            <path d="M9 19l7-7-7-7" fill="none" stroke="currentColor" stroke-width="2" />
          </svg>
        </button>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  font-family: 'Libre Baskerville', serif;
}

.carousel-wrapper {
  position: relative;
  width: 100%;
  padding: 90px 0;
  background-color: #F8F6F4;
  margin-top: 100px;
  margin-bottom: 60px;
  
}

.carousel {
  width: 100%;
  display: flex;
  justify-content: center;
}

.slide-container {
  width: 400px; 
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
  width: 400px;
  height: 470px;
  cursor: pointer;
  position: relative;
  background-color: white;
}

.event-image {
  width: 100%;
  height: 230px;
  object-fit: cover;
  object-position: center;
}

.card-info {
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  text-align: left;
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
  justify-content: center;
  align-items: center;
  height: 40px;
  background-color: white;
  font-size: 30px;
  color: black;
  padding: 0;
  margin: 0;
}

.card-info {
  padding: 10px 20px  10px 20px;
}


.tag {
  position: absolute;
  font-size: 10px;
  text-transform: uppercase;
  color: black;
  padding: 3px 7px;
  font-weight: bold;
}

.event-title {
  padding-top: 15px;
  text-align: left;
}

.event-time{
  color: #4B4643;
  font-size: 14px;
  margin-top: 10px;
  font-weight: lighter;
}

.p-button {
  background-color: #AB4E1C;
  padding: 10px 15px;
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

.p-button:hover {
  background-color: #C25D29;
  cursor: pointer;
}

.s-button:hover {
  border: #4B4643 1px solid;
  cursor: pointer;
  color: #4B4643;
}

.carousel-nav {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.carousel-button {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.arrow-icon {
  width: 20px;
  height: 20px;
  color: #333;
  transition: color 0.3s ease;
}

.carousel-button:hover .arrow-icon {
  color: #AB4E1C;
}

.indicators {
  display: flex;
  align-items: center;
  gap: 7px;
}

.indicator {
  width: 6px;
  height: 6px;
  background-color: #ccc;
  border-radius: 50%;
  transition: background-color 0.3s ease;
}

.indicator.active {
  background-color: #333;
}

.slide-container {
  padding: 20px; 
}

.carousel-wrapper {
  position: relative;
  width: 100%;
  padding: 60px 0;
  background-color: #F8F6F4;
}

.carousel {
  display: flex;
  justify-content: center;
  padding: 0; 
}

.slide-container {
  flex: 0 0 calc(100% / var(--carousel-items-to-show, 3.3)); 
  min-width: 400px; 
  box-sizing: border-box; 
}

.card {
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.207);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: white;
  height: 470px;
  cursor: pointer;
  position: relative;
}

.event-image {
  width: 100%;
  height: 230px;
  object-fit: cover;
}

.carousel-nav {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  gap: 10px;
}

.carousel-button {
  background: none;
  border: none;
  cursor: pointer;
}

.indicators {
  display: flex;
  gap: 7px;
}

.headline {
  margin-left: 7vw;
  position: absolute;
  top: -40px;
}

@media (max-width: 1024px) {

  .headline {
    font-size: 25px;
    top: -30px;
  }

}

</style>


