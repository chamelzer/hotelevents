<script setup>
import EventCards from '@/components/EventCards.vue';
import EventCarousel from './EventCarousel.vue';

</script>

<template>
    <div class="filter-container">
        <header>
            <h1>Alle Events</h1>
            <input type="text">
        </header>
        <div class="card-holder"></div>
    </div>
    
<EventCards />
<EventCarousel />
</template>

<style scoped>

.filter-container {
    max-width: 1000px;
    margin: 0 auto;
}

header {
    margin-bottom: 10px;
    margin-top: 30px;
    display: flex;
    align-items: center;
}

header h1 {
    font-weight: bold;
    margin-right: 30px;
}

</style>