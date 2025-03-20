<template>
    <div class="boroughs-container">
      <div class="borough top-left">
        <h2  @click="openRegion('brooklyn')">BROOKLYN</h2>
    </div>
      <div class="borough top-right">
        <h2 @click="openRegion('manhattan')">MANHATTAN </h2>
      </div>
      <div class="borough center" > <h2 @click="openRegion('staten-island')">STATEN ISLAND</h2></div>
      <div class="borough bottom-left"> <h2 @click="openRegion('queens')">QUEENS </h2></div>
      <div class="borough bottom-right"><h2 @click="openRegion('bronx')">BRONX </h2></div>
    </div>
    
      <button @click="openRegion('brooklyn')" class="sticky-button">
        <div class="vertical-text">
          <span>V</span>
          <span>I</span>
          <span>E</span>
          <span>W</span>
<br>
          <span>A</span>
          <span>L</span>
          <span>L</span>
<br>
          <span>S</span>
          <span>C</span>
          <span>H</span>
          <span>O</span>
          <span>O</span>
          <span>L</span>
        </div>
      </button>
    
    
  </template>
  
  <script>
import axios from 'axios';

export default {
  name: "NavbarEvents",
  data() {
    return {
      schools: [], // Holds the schools fetched from the API
      filteredSchools: [], // Holds the filtered schools based on selected region
      selectedDistrict: [],
      isScrolled: false,
      setState: ''
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll); // Add scroll event listener
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll); // Clean up event listener
  },
  methods: {
    setActiveNav(index) {
      this.activeNavIndex = index;
    },
    setActiveEvent(index) {
      this.activeEventIndex = index;
    },
    openFullScreen() {
      this.isFullScreen = true;
    },
    closeFullScreen() {
      this.isFullScreen = false;
    },
    async openRegion(region) {
      this.isFullScreen = false;
      this.currentRegion = region;

      // If the user clicks "View All Schools"
      if (region === 'all') {
        // Redirect to the page that shows all schools
        this.$router.push({
          path: '/districtlist',
          query: { schools: JSON.stringify('all') }
        });
      } else {
        // Otherwise, proceed as normal to filter schools based on the selected region
        this.isDistrictScreenVisible = true;

        this.$router.push({
          path: '/districtlist',
          query: { schools: JSON.stringify(region) }
        });
      }
    },
    closeDistrictScreen() {
      this.isDistrictScreenVisible = false;
      this.filteredSchools = []; // Clear filtered schools when closing the district screen
    },
    handleScroll() {
      this.isScrolled = window.scrollY > 0; // Check if scroll position is greater than 50px
    },
    async fetchSchools(region) {
      console.log(region);
      try {
        const response = await axios.get(`https://api.essleague.org/api/schools`);

        this.schools = response.data || [];
        console.log("All Schools:", this.schools);

        // Filter schools based on region
        if (region === 'all') {
          // If "all" is selected, show all schools
          this.filteredSchools = this.schools;
        } else {
          // Otherwise, filter based on region
          this.filteredSchools = this.schools.filter(school => {
            if (school.city.toLowerCase() === region) {
              return school;
            }
          });
        }

        console.log("Filtered Schools:", this.filteredSchools);
      } catch (error) {
        console.error("Error fetching schools:", error);
      }
    }
  }
};
</script>

  
  
<style scoped>
/* Base styling for the boroughs container */
.boroughs-container {
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), 
              url('../assets/image/photo-collage.jpg') no-repeat center center;
  background-size: cover;
  color: white;
  text-align: center;
  font-size: 2em;
  padding-top: 50px;
  box-sizing: border-box;
  transition: all 0.3s ease;
}

/* Sticky button styling */
.sticky-button {
  position: fixed;
  bottom: 15%; /* Distance from the bottom of the viewport */
  right: 10px; /* Distance from the right of the viewport */
  background-color: #f47c3c; /* Button color */
  color: #fff !important; /* Text color */
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s;
  width: 50px;
  height: auto;
}

/* Vertical text in the sticky button */
.vertical-text {
  display: flex;
  flex-direction: column; /* Arrange letters vertically */
  align-items: center; /* Center letters horizontally */
}

.vertical-text span {
  display: block;
  opacity: 1;
  animation: fadeIn 0.5s forwards;
}

/* Boroughs heading styling */
.borough h2 {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  text-align: center;
}

/* Grid layout for boroughs */
.top-left {
  grid-row: 1 / 2;
  grid-column: 1 / 2;
}

.top-right {
  grid-row: 1 / 2;
  grid-column: 3 / 4;
}

.center {
  grid-row: 2 / 3;
  grid-column: 2 / 3;
}

.bottom-left {
  grid-row: 3 / 4;
  grid-column: 1 / 2;
}

.bottom-right {
  grid-row: 3 / 4;
  grid-column: 3 / 4;
}

/* Media Queries for better responsiveness */

/* Tablet view: When screen width is below 1024px */
@media screen and (max-width: 1024px) {
  .boroughs-container {
    grid-template-rows: repeat(2, 1fr); /* Adjust rows for tablet */
    grid-template-columns: 1fr 1fr; /* Adjust to two columns */
    font-size: 1.8em; /* Smaller font size */
  }

  .sticky-button {
    bottom: 10%;
    right: 15px;
    padding: 8px 18px;
    font-size: 14px;
  }

  .borough h2 {
    font-size: 1.4em; /* Adjust font size for headings */
  }
}

/* Mobile view: When screen width is below 768px */
@media screen and (max-width: 768px) {
  .boroughs-container {
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    font-size: 1.5rem;
    padding: 1  0px;
  }

  .top-left, .top-right, .center, .bottom-left, .bottom-right {
    grid-column: span 2; /* Make each borough span two columns */
    grid-row: span 1; /* Each borough occupies a row */
    margin-bottom: 10px; /* Add some space between boroughs */
  }

  .sticky-button {
    bottom: 8%;
    right: 5px;
    width: 40px;
    padding: 6px 12px;
  }

  .borough h2 {
    font-size: 1.5; /* Adjust text size for mobile */
  }
}

/* Small mobile view: When screen width is below 450px */
@media screen and (max-width: 450px) {
  .boroughs-container {
    font-size: 1.5rem; /* Further reduce font size */
    padding-top: 30px;
  }

  .borough h2 {
    font-size: 1.1em; /* Smaller font size */
  }

  .sticky-button {
    width: 35px;
    height: auto;
    padding: 5px;
    font-size: 12px;
  }

  .borough {
    width: 100%; /* Full width for boroughs */
    margin-bottom: 5px;
  }
}

  </style>
  