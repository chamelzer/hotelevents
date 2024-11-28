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

.dots1 {
    bottom: 0;
    left: 0;
}

.dots2 {
    top: 0;
    right: 0; 
}

@media (max-width: 1024px) {
    .headline {
        font-size: 40px;
    }

    .newsletter-container {
        height: 350px;
    }

    .description {
        font-size: 16px;
        width: 50vw;
    }

}



@media (max-width: 768px) {
    .headline {
        font-size: 40px;
    }

    .newsletter-container {
        height: 350px;
    }

    .description {
        font-size: 16px;
        width: 50vw;
    }

    button {
        font-size: 16px;
        padding: 10px 15px;
    }

}

@media (max-width: 576px) {
    .headline {
        font-size: 30px;
    }

    .newsletter-container {
        height: 300px;
    }
    .description {
        font-size: 14px;
        width: 70vw;
    }

    button {
        font-size: 14px;
        padding: 8px 12px;
    }
}

</style>