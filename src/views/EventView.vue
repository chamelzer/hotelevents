<script setup>
    import EventList from '@/components/EventList.vue';
    import EventCarousel from '@/components/EventCarousel.vue';
    import EventCards from '@/components/EventCards.vue';
</script>

<template>
    <div class="hero-image">
    <img src="/cocktailbar.jpg" alt="dinner photo">
    <h1 class="title">Events</h1>
    </div>

    <EventCarousel />
    <EventList />
</template>

<style scoped>
 
    .hero-image img{
        filter: brightness(50%);
        width: 100%;
        height: 500px;
        object-fit: cover; 
        object-position: center; 
        position: relative;
    }

    .title {
        color: white;
        z-index: 999;
        position: absolute;
        top: 35%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 64px;
    }

      /* Media query for mobile screens */
  @media (max-width: 1024px) {

    .hero-image img{
        height: 300px;
    }

    .title {
        top: 27%;
        font-size: 50px;
    }
  }

</style>