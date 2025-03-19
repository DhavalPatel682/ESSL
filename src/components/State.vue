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
  .boroughs-container {
      display: grid;
      grid-template-rows: 1fr 1fr 1fr;
      grid-template-columns: 1fr 1fr 1fr;
      height: 100vh;
      /* background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('../assets/image/FB_IMG_1496880485504.jpg') no-repeat center center; */
    
      background:  linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('../assets/image/photo-collage.jpg') no-repeat center center;
      background-size: cover;
      color: white;
      text-align: center;
      font-size: 2em;
      padding-top: 50px;
  }

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
    width:50px;
    height: auto;
}
/* Vertical Text Styling */
.vertical-text {
  display: flex;
  flex-direction: column; /* Arrange letters vertically */
  align-items: center; /* Center letters horizontally */
}

.vertical-text span {
  display: block;
  opacity: 1; /* Start hidden */
  animation: fadeIn 0.5s forwards; /* Animation to fade in */
}


  .borough h2{
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  
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
  @media screen and (max-width:768px) {
    .boroughs-container{
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      font-size: 1.5rem;
    }
  }
  </style>
  