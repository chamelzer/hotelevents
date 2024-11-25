<script setup>
</script>

<template>
<article class="newsletter-container">
    <img class="dots1" src="/dots2.png" alt="dots">
    <img class="dots2" src="/dots1.png" alt="dots">
    <div class="news-info">
        <h1 class="headline">Flere events på vej</h1>
        <p class="description">Tilmeld dig vores nyhedsbrev så du ikke går glip af flere events</p>
        <button class="cta">Tilmeld</button>
    </div> 
</article>
</template>

<style scoped>

.newsletter-container {
    width: 100%;
    height: 400px;
    background-color: #95ACAC;
    margin-top: 100px;
}

.newsletter-container {
    width: 100%;
    height: 400px;
    background: rgba(149, 172, 172, 0.50);
    display: flex; 
    justify-content: center; 
    align-items: center; 
    position: relative;
}

.news-info {
    display: flex;
    flex-direction: column;
    align-items: center; 
    text-align: center; 
    margin-top: -70px;
    position: relative;
}

.headline {
    font-size: 50px;
}

.description {
    font-size: 20px;
    margin-top: -10px;
    width: 30vw;
}

button {
    background-color: #AB4E1C;
    padding: 15px 20px ;
    border: 0;
    font-weight: bold;
    color: white;
    margin-top: 2rem;
    font-size: 20px;
}

button:hover {
    background-color: #C25D29;
}

img {
    width: 25vw;
    height: auto;
    position: absolute;
}

/* Position dots1 to the top left */
.dots1 {
    bottom: 0; /* Align to the top of the container */
    left: 0; /* Align to the left of the container */
}

/* Position dots2 to the top right */
.dots2 {
    top: 0; /* Align to the top of the container */
    right: 0; /* Align to the right of the container */
}

@media (max-width: 1024px) {
    .headline {
        font-size: 40px; /* Smaller headline */
    }

    .newsletter-container {
        height: 350px; /* Reduce height for iPad screens */
    }

    .description {
        font-size: 16px; /* Smaller description */
        width: 50vw; /* Adjust width for smaller screens */
    }

}



@media (max-width: 768px) {
    .headline {
        font-size: 40px; /* Smaller headline */
    }

    .newsletter-container {
        height: 350px; /* Reduce height for iPad screens */
    }

    .description {
        font-size: 16px; /* Smaller description */
        width: 50vw; /* Adjust width for smaller screens */
    }

    button {
        font-size: 16px; /* Smaller button text */
        padding: 10px 15px; /* Smaller button size */
    }

}

/* Media query for iPhone (576px and smaller) */
@media (max-width: 576px) {
    .headline {
        font-size: 30px; /* Even smaller headline */
    }

    .newsletter-container {
        height: 300px; /* Further reduce height for iPhone screens */
    }
    .description {
        font-size: 14px; /* Even smaller description */
        width: 70vw; /* Narrower width for smaller screens */
    }

    button {
        font-size: 14px; /* Smaller button text */
        padding: 8px 12px; /* Smaller button size */
    }
}

</style>