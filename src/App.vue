<script setup>
import { RouterView } from 'vue-router';
import BookingView from './views/BookingView.vue';
import EventView from './views/EventView.vue';
import InfoView from './views/InfoView.vue';
import EventCarousel from './components/EventCarousel.vue';
</script>

<template>
    <header>
        <RouterView />
    </header>

    <main>
        <EventView />
        <EventCarousel />
        <InfoView />
        <BookingView />
    </main>
</template>