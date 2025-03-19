<template>
  <div class="page-wrapper" :class="{ scrolled: isScrolled }">
    <!-- Navbar -->
    <nav class="navbar" :class="{ 'transparent': isHomePage && !isScrolled, scrolled: !isHomePage || isScrolled || isPastVideoSection }">
      <div class="navbar-container">
        <div class="logo" @click="redirectToHome">
          <img src="../assets/image/logo.png" alt="ESSL Logo" />
        </div>
        <div class="menu-icon" @click="toggleMenu">
          <span :class="{ 'open': isMenuOpen }"></span>
          <span :class="{ 'open': isMenuOpen }"></span>
          <span :class="{ 'open': isMenuOpen }"></span>
        </div>
        <ul class="nav-links" :class="{ 'active': isMenuOpen }">
          <li v-for="(item, index) in navItems" :key="index">
            <a
              href="#"
              @click="setActiveNav(index, item); toggleMenu"
              :class="{ active: activeNavIndex === index }"
            >
              {{ item }}
            </a>
          </li>
          <li>
            <button @click="Registrationform()"   class="register-btn">Register</button>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Event Section -->
    <div class="event-section" :class="{ 'transparent': isHomePage && !isScrolled, 'scrolled': !isHomePage || isScrolled || isPastVideoSection }">
      <div class="menu-icon-event" @click="toggleMenu1">
        <span :class="{ 'open': isMenuOpen1 }"></span>
        <span :class="{ 'open': isMenuOpen1 }"></span>
        <span :class="{ 'open': isMenuOpen1 }"></span>
      </div>
      <ul class="event-links" :class="{ 'active': isMenuOpen1 }">
        <li
          class="event-item"
          v-for="(event, index) in events"
          :key="index"
          @click="setActiveEvent(event, index); toggleMenu1"
          :class="{ active: activeEventIndex === index, 'red-bg': activeEventIndex === index }"
        >
          {{ event }}
        </li>
        <!-- Custom Dropdown for "RESOURCES" at 4th position -->
        <li class="event-item dropdown" v-if="events.length >= 2" @mouseover="showDropdown = true" @mouseleave="showDropdown = false" style="left: -65px;">
          <span class="dropdown-title">RESOURCES</span>
          <ul v-if="showDropdown" class="dropdown-menu">
            <li @click="redirectToSchool('RESOURCES')">Rules and Regulation</li>
            <li @click="redirectToSchool('GAMESRULE')">Games Rules</li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Registrationform from "./Registrationform.vue";

export default {
  name: "NavbarEvents",
  data() {
    return {
      events: ["EVENTS", "GAMES", "STANDINGS", "SCHOOLS", "VIDEO'S/MEDIA", "SPONSORS"],
      navItems: ["About Us", "Sponsors", "Contact"],
      activeNavIndex: null,
      activeEventIndex: null,
      isScrolled: false,
      isPastVideoSection: false,
      isMenuOpen: false,
      isMenuOpen1: false,

      showDropdown: false,
    };
  },
  computed: {
  isHomePage() {
    return this.$route.path === '/';
  },
},

  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("scroll", this.checkVideoSectionScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("scroll", this.checkVideoSectionScroll);
  },
  methods: {
    setActiveNav(index, item) {

    this.activeEventIndex = "";
      this.activeNavIndex = index;
      this.toggleMenu();
      if(item=="About Us"){
      this.$router.push({ path: `/AboutUs` });}else{
      this.$router.push({ path: `/${item}` });}
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    toggleMenu1() {
      this.isMenuOpen1 = !this.isMenuOpen1;
    },
    setActiveEvent(event, index) {
        this.activeNavIndex = "";
      this.activeEventIndex = index;
      this.toggleMenu1();
      this.redirectToSchool(event);
    },
    redirectToSchool(event) {
      if (event === "SCHOOLS") {
        this.$router.push({ path: "/schools" });
      }
      else if (event === "EVENTS") {
        this.$router.push({ path: "/event" });
      }
      else if (event === "GAMES") {
        this.$router.push({ path: "/game" });
      }
      else if (event === "SPONSORS") {
        this.$router.push({ path: "/sponsors" });
      }
      else if (event === "VIDEO'S/MEDIA") {
        this.$router.push({ path: "/video-media" });
      }
      else if (event === "STANDINGS") {
        this.$router.push({ path: "/standings" });
      }
      else if (event === "RESOURCES") {
        this.$router.push({ path: "/rules-regularation" });
      }else if (event === "GAMESRULE") {
        this.$router.push({ path: "/games_rule" });
      }
      else if (event === "About Us") {
        this.$router.push({ path: "/AboutUs" });
      }
      else {
        this.$router.push({ path: "/not-found" });
      }
    },
    redirectToHome() {
        this.activeEventIndex = "";
        this.activeNavIndex = "";

      this.$router.push({ path: `/` });
    },
    Registrationform() {
      this.$router.push({ path: `/Registrationform` });
    },
    handleScroll() {
      this.isScrolled = window.scrollY > 0;
    },
    checkVideoSectionScroll() {
      const videoSection = document.querySelector(".section-with-video");
      if (videoSection) {
        const rect = videoSection.getBoundingClientRect();
        this.isPastVideoSection = rect.bottom < 0;
      }
    },
  },
};
</script>

<style scoped>
/* Dropdown css */
.dropdown {
  position: relative;
  cursor: pointer;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #090909;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  list-style: none;
  padding: 10px 0;
  margin: 0;
  min-width: 180px;
  display: none;
  z-index: 1000;
}

.dropdown:hover .dropdown-menu {
  display: block;
}

.dropdown-menu li {
  padding: 10px 20px;
  cursor: pointer;
  white-space: nowrap;
  color: white !important;
}

.dropdown-menu li a {
  text-decoration: none;
  color: #333;
  display: block;
}

.dropdown-menu li:hover {
  background-color: #f47c3c;
  color: white;
}

/* Page Wrapper */
.register-btn {
  background-color: #f47c3c;
  color: #fff;
  padding: 10px 30px;
  border: none;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  font-family: sans-serif;
  font-weight: 700;
  letter-spacing: 1px;
  transition: 0.4s;
}
.register-btn:hover {
  background-color: #cd4b13;
}

.page-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-family: Arial, sans-serif;
  position: relative;
  height: 138px;
  width: 100%;
  z-index: 100;
  transition: all 0.5s ease-in-out;
}
.event-item.red-bg {
  background-color: rgb(4, 3, 3);
}
.page-wrapper.scrolled {
  position: fixed;
  top: 0;
  opacity: 1;
  animation: slideDown 0.8s ease-in-out;
}

@keyframes slideDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.navbar {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 10px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.navbar.scrolled {
  background-color: white;
  color: black;
}

.navbar.transparent {
  background-color: transparent;
  color: white;
  box-shadow: none;
}

.navbar.transparent .nav-links li a {
  color: white;
}

.navbar.scrolled .nav-links li a {
  color: #000;
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
}

.logo img {
  width: 70px;
  height: 70px;
  cursor: pointer;
}

.menu-icon {
  display: none;
  flex-direction: column;
  cursor: pointer;
}
.menu-icon-event {
  display: none;
  flex-direction: column;
  cursor: pointer;
}

.menu-icon span {
  height: 3px;
  width: 25px;
  background-color: #f47c3c;
  margin: 3px;
  transition: all 0.3s ease;
}
.menu-icon-event span {
  height: 3px;
  width: 25px;
  background-color: #000000;
  margin: 3px;
  transition: all 0.3s ease;
}

.menu-icon span.open {
  background-color: #cd4b13;
}

.menu-icon-event span.open {
  background-color: #ffffff;
}

.nav-links {
  display: flex;
  align-items: center;
  list-style: none;
  gap: 32px;
}

.nav-links li a {
  text-decoration: none;
  color: #000;
  font-weight: 500;
  padding: 5px 0;
  position: relative;
  transition: color 0.3s ease;
}

.nav-links li a:hover {
  color: #f47c3c;
}

.nav-links li a.active {
  color: #f47c3c;
  font-weight: bold;
}

.nav-links li a.active::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -5px;
  width: 100%;
  height: 3px;
  background-color: #f47c3c;
}

.event-section {
  position: relative;
  width: 100%;
  border-top: 1px solid #d3d3d3;
  z-index: 1000;
  background-color: transparent;
}

.event-section.scrolled {
  background-color: #f47c3c;
  height: 43px;
}

.event-links {
  display: flex;
  justify-content: space-between;
  list-style-type: none;
  padding: 0px 10px;
  margin: 0px;
}

.event-item {
  padding: 13px 20px;
  font-weight: 600;
  color: #fff;
  letter-spacing: 1px;
  cursor: pointer;
  transition: color 0.3s ease;
}

@media (max-width: 850px) {
  .menu-icon {
    display: flex;
  }
  .menu-icon-event {
    display: flex;
    float: inline-end;
    padding: 8px;
    margin-right: 40px;
    top: 9px;
    margin-bottom: -30px;
    font-size: medium;
    line-height: 9px;
    cursor: pointer;
    align-items: right;
  }
  .nav-links {
    position: fixed;
    right: -100%;
    top: 120px;
    background-color: #f47c3c;
    
    flex-direction: column;
    gap: 0;
    justify-content: flex-start;
    align-items: center;
    transition: right 0.3s ease;
  }
  .event-links {
    position: fixed;
    right: -100%;
    top: 136px;
    background-color: black;
    
    flex-direction: column;
    gap: 0;
    justify-content: flex-start;
    align-items: center;
    transition: right 0.3s ease;
  }
  .nav-links li {
    margin: 20px 0;
  }
  .event-links li {
    margin: 20px 0;
  }
  .nav-links.active {
    right: 0;
    width: 100%;
  }
  .event-links.active {
    right: 0;
    width: 100%;
  }
}
@media (max-width: 650px){
  .menu-icon-event{
    margin-right: 20px;
  }
}
</style>
