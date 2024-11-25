<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const isMenuOpen = ref(false);
const menuRef = ref(null);
const hamburgerRef = ref(null);
const isScrolled = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

const handleOutsideClick = (event) => {
  if (
    isMenuOpen.value &&
    menuRef.value &&
    hamburgerRef.value &&
    !menuRef.value.contains(event.target) &&
    !hamburgerRef.value.contains(event.target)
  ) {
    closeMenu();
  }
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 0; // True if scrolled down
};

onMounted(() => {
  document.addEventListener("click", handleOutsideClick);
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  document.removeEventListener("click", handleOutsideClick);
  window.removeEventListener("scroll", handleScroll);
});
</script>



<template>
    <nav>
        <div id="navbar" :class="{ scrolled: isScrolled }">
        <div class="left-container">
          <div class="logo">
            <img :src="isScrolled ? '/logo.png' : '/logo2.png'" alt="Logo" />
          </div>
          <div class="links-container">
            <a href="#">Hotel</a>
            <a href="#">Restaurant</a>
            <a href="#">Business</a>
            <a href="#">Tilbud</a>
            <router-link to="/" class="event-link">Events</router-link>
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

      <div :class="['overlay', { 'menu-open': isMenuOpen }]" @click="closeMenu"></div>
  
      <div :class="['mobile-links', { 'menu-open': isMenuOpen }]" ref="menuRef">
        <div class="menu-logo">
          <img src="/logo.png" alt="Logo" />
        </div>
        <div class="hamburger-links">
          <a href="#">
            <span class="menu-number">1 <img class="arrow-icon" src="/arrow-orange.png" alt="Pil" /></span>
            Hotel
          </a>
          <a href="#">
            <span class="menu-number">2 <img class="arrow-icon" src="/arrow-orange.png" alt="Pil" /></span>
            Restaurant
          </a>
          <a href="#">
            <span class="menu-number">3 <img class="arrow-icon" src="/arrow-orange.png" alt="Pil" /></span>
            Business
          </a>
          <a href="#">
            <span class="menu-number">4 <img class="arrow-icon" src="/arrow-orange.png" alt="Pil" /></span>
            Tilbud
          </a>
          <a href="#">
            <span class="menu-number">5 <img class="arrow-icon" src="/arrow-orange.png" alt="Pil" /></span>
            Events
          </a>
          <a href="#">
            <span class="menu-number">6 <img class="arrow-icon" src="/arrow-orange.png" alt="Pil" /></span>
            Kontakt
          </a>
          <a href="#">
            <span class="menu-number">7 <img class="arrow-icon" src="/arrow-orange.png" alt="Pil" /></span>
            Parkering
          </a>
          <div class="close-menu" @click="closeMenu">
            <span>
              <img src="/close-icon.png" alt="Luk" /> Luk menuen
            </span>
          </div>
        </div>
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
    align-items: stretch; /* Ensure children stretch to navbar height */
    transition: height 0.3s ease-in-out, background-color 0.3s ease-in-out;
    height: 130px; /* Default height */
    background-color: white;
}

#navbar.scrolled {
    height: 75px; /* Height when scrolled */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.left-container {
    display: flex;
    align-items: center;
}

.logo img {
    width: 180px;
    height: auto;
    margin-left: 1.5vw;
    margin-right: 3vw;
    transition: 0.3s ease-in-out;
}

#navbar.scrolled .logo img {
    width: 70px;
    height: auto;
    margin-left: 4vw;
    margin-right: 6vw;
    transition: 0.3s ease-in-out;
  }

.links-container {
    display: flex;
    height: 100%;
}

.links-container a {
    text-transform: uppercase;
    text-decoration: none;
    color: black;
    font-size: 12px;
    transition: background-color 0.3s ease-in-out, padding 0.3s ease-in-out;
    padding: 0 10px; /* Padding for text inside links */
    height: 100%; /* Match navbar height */
    display: flex;
    align-items: center; /* Vertically center the text */
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
    flex-direction: column;
    position: absolute;
    background-color: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 15px;
    z-index: 999;
}

.mobile-links a {
    display: block;
    text-transform: uppercase;
    text-decoration: none;
    color: black;
    font-size: 14px;

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
    background-color: #AB4E1C;
    color: white;
    border: none;
    cursor: pointer;
    padding: 0 45px; /* Adjust horizontal padding as needed */
    font-size: 15px;
    height: 100%; /* Make the button's height equal to its parent's height */
    display: flex;
    align-items: center;
    justify-content: center; /* Center the content inside the button */
    transition: height 0.3s ease-in-out; /* Smoothly transition height changes */
    box-sizing: border-box; /* Include padding/borders in height calculation */
}

.right-container {
    display: flex;
    align-items: center;
    gap: 20px;
    height: 100%; /* Ensure children align with the navbar height */
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
        width: 100%;
        box-shadow: none; 
    }

    .logo {
        position: absolute;
        margin: 0%;
        left: 50%;
        transform: translateX(-50%);
    }

    .lang {
        position: absolute;
    }
      
}

.mobile-links {
    position: fixed;
    top: 0;
    right: -450px;
    height: 100%;
    width: 420px;
    background-color: white;
    overflow-y: auto;
    transition: right 0.3s ease-in-out;
    z-index: 999;
  }
  
  .mobile-links.menu-open {
    right: 0;
  }
  
  .mobile-links.menu-open {
    right: 0;
  }
  
  .menu-content {
    display: flex;
    flex-direction: column;
  }
  
  .menu-content a {
    text-transform: uppercase;
    text-decoration: none;
    color: white;
    font-size: 16px;
    transition: background-color 0.3s ease-in-out;
  }

  .mobile-links img {
    height: 30px;
    width: auto;
  }

  .menu-logo {
    display: flex;
    justify-content: center;
    border-bottom: 1px solid #E5E5E5;
    padding: 15px;
    margin-left: -15px;
    margin-right: -15px;
    margin-top: -15px;
  }

  .hamburger-links a {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #F8F6F4;
    font-size: 15px;
    text-transform: none;
    color: black;
    text-decoration: none;
    transition: background-color 0.3s ease-in-out;
    margin-left: -15px;
    margin-right: -15px;
    padding-left: 15px;
}

.hamburger-links a:hover {
    background-color: white;
}

.menu-number {
    font-weight: bold;
    color: #AB4E1C; 
    flex-shrink: 0; 
    border-left: 1px solid #F8F6F4;
    width: 100px;
    padding: 20px 0 20px 0;
    justify-content: center;
    display: flex;
    font-weight: 400;
    font-size: 18px;
}

.menu-number img {
    height: 15px;
    width: auto;
    padding-left: 15px;
    padding-top: 3px;
}

.hamburger-links a {
    display: flex;
    justify-content:space-between;
    flex-direction: row-reverse;
}

.close-menu {
    justify-content: center;
    display: flex;
    padding: 20px 0 20px 0;
    background-color: #AB4E1C;
    margin-left: -15px;
    margin-right: -15px;
    color: white;
    cursor: pointer;
}

.close-menu img {
    height: 10px;
    width: auto;
    padding-right: 10px;
}

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black */
    z-index: 998; /* Behind the mobile menu (z-index 999) */
    opacity: 0;
    pointer-events: none; /* Prevent interaction when hidden */
    transition: opacity 0.3s ease-in-out;
  }

  .overlay.menu-open {
    opacity: 1;
    pointer-events: auto; /* Allow interaction when visible */
  }

  body.menu-open {
    overflow: hidden;
  }

  @media (max-width: 1024px) {
    /* Ensure the navbar height is fixed */
    #navbar {
        height: 100px !important; /* Fixed height when on smaller screens */
    }

    .cta-button {
        margin-top: 160px; /* Position it below the navbar */
        height: 60px ;
        display: flex;

    }

    .logo img {
        width: 130px;
        height: auto;
    }
  }
 
</style>