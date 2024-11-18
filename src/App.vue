<script setup>
import { RouterView } from 'vue-router';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import BookingView from './views/BookingView.vue';
import EventView from './views/EventView.vue';
import InfoView from './views/InfoView.vue';
</script>

<template>
    <header>
        <Header />
        <RouterView />
    </header>
    <footer>
        <Footer />
    </footer>

</template>

<style scoped>
</style>
