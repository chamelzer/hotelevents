<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";

const isMenuOpen = ref(false);

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};
</script>

<template>
    <nav>
        <div id="navbar">
            <div class="left-container">
                <div class="logo">
                    <img src="/logo.png" alt="Logo">
                </div>
                <div class="links-container">
                    <a href="#">Hotel</a>
                    <a href="#">Restaurant</a>
                    <a href="#">Business</a>
                    <a href="#">Tilbud</a>
                    <a class="event-link" href="#">Events</a>
                    <a href="#">Kontakt</a>
                    <a href="#">Parkering</a>
                </div>
            </div>

            <div class="right-container">
                <div class="hamburger" @click="toggleMenu">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div class="lang"> 
                    <div class="current">DK</div>
                    <div>EN</div>
                </div>
                <div class="cta-button">BOOK NU</div>
            </div>
        </div>

        <div :class="['mobile-links', { 'menu-open': isMenuOpen }]">
            <a href="#">Hotel</a>
            <a href="#">Restaurant</a>
            <a href="#">Business</a>
            <a href="#">Tilbud</a>
            <a class="event-link" href="#">Events</a>
            <a href="#">Kontakt</a>
            <a href="#">Parkering</a>
        </div>
    </nav>
</template>


<style scoped>
nav {
    position: sticky;
    top: 0;
    z-index: 1000;
    width: 100%;
    background-color: white;
    font-family: "Libre Baskerville", serif;
}

#navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 75px;
}

.left-container {
    display: flex;
    align-items: center;
}

.logo img {
    width: 70px;
    height: auto;
    margin-left: 4vw;
    margin-right: 5vw;
}

.links-container {
    display: flex;
}

.links-container a {
    text-transform: uppercase;
    text-decoration: none;
    color: black;
    font-size: 12px;
    transition: background-color 0.3s ease-in-out;
    padding: 31px 10px 29px 10px;
    border-left: 0.5px solid #F9F6F4;
    border-right: 0.5px solid #F9F6F4;
}

.links-container a:hover {
    background-color: #F9F6F4;
}

.event-link {
    background-color: #F9F6F4;
}

.right-container {
    display: flex;
    align-items: center;
    gap: 20px;
}

.cta-button:hover {
    background-color: #C25D29;
}

.hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    cursor: pointer;
}

.hamburger span {
    width: 25px;
    height: 3px;
    background-color: black;
    transition: all 0.3s ease-in-out;
}

.mobile-links {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 75px; 
    right: 20px;
    background-color: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 15px;
    border-radius: 8px;
    z-index: 999;
}

.mobile-links a {
    display: block;
    text-transform: uppercase;
    text-decoration: none;
    color: black;
    font-size: 14px;
    margin: 10px 0;
    transition: background-color 0.3s ease-in-out;
}

.mobile-links a:hover {
    background-color: #F9F6F4;
}

.mobile-links.menu-open {
    display: flex;
}

.lang {
    display: flex;
    flex-direction: row;
    gap: 15px;
    margin-right: 20px;
    margin-left: 20px;
    font-size: 16px;
    cursor: pointer;
}

.current {
    color: #AB4E1C;
}

@media (max-width: 1024px) {
    .links-container {
        display: none; 
    }

    .hamburger {
        display: flex;
    }

    .cta-button {
        padding: 10px 15px;
    }
}

.right-container {
    display: flex;
    align-items: center;

}

.cta-button {
    margin-right: 0;
    margin-left: auto;
    background-color: #AB4E1C;
    color: white;
    border: none;
    cursor: pointer;
    padding: 29px 45px 28px 45px;
    font-size: 15px;
}

@media (max-width: 1024px) {
    .links-container {
        display: none;
    }

    .hamburger {
        display: flex;
        position: absolute;
        top: 20px;
        right: 20px;
    }

    .cta-button {
        display: block; 
        width: 100vw; 
        padding: 20px 0;
        margin-top: 130px; 
        text-align: center; 
    }

    .mobile-links {
        top: 75px;
        right: 0; 
        width: 100%;
        box-shadow: none; 
    }

    .logo {
        position: absolute;
    }

    .lang {
        position: absolute;
    }
}
</style>
