<template>
  <div class="sponsors-container">
    <h1 class="title">Our Sponsors</h1>

    <!-- Loading Spinner -->
    <div v-if="isLoading" class="loading-indicator">
      <div class="spinner"></div>
      <p>Loading sponsors...</p>
    </div>

    <!-- No sponsors available message -->
    <div v-if="sponsors.length === 0 && !isLoading" class="no-sponsors">
      <p>No sponsors available.</p>
    </div>

    <!-- Sponsors list -->
    <div class="sponsors-list">
      <transition-group name="fade" tag="div" class="sponsors-content">
        <div
          class="sponsor-card"
          v-for="sponsor in sponsors"
          :key="sponsor.id"
        >
          <img :src="`${baseUrl}${sponsor.image}`" :alt="'Sponsor ' + sponsor.id" class="sponsor-image" />
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const sponsors = ref([]);
    const baseUrl = 'https://api.essleague.org/public/';
    const isLoading = ref(true); // Loading state

    const fetchSponsors = async () => {
      try {
        const response = await fetch('https://api.essleague.org/api/getall');
        const data = await response.json();
        if (data.success) {
          sponsors.value = data.data;
        } else {
          console.error('Failed to fetch sponsors');
        }
      } catch (error) {
        console.error('Error fetching sponsors:', error);
      } finally {
        isLoading.value = false; // Set loading to false after fetching is complete
      }
    };

    onMounted(fetchSponsors);

    return {
      sponsors,
      baseUrl,
      isLoading,
    };
  },
};
</script>

<style scoped>
/* Ensure the container takes the full height of the viewport */
.sponsors-container {
  padding: 50px 20px;
  background-color: #fff;
  color: #fff;
  margin: 0 auto;
  background-size: cover;
  min-height: 100vh; /* This ensures the container takes at least the full height of the viewport */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

/* Title Styling */
.title {
  text-align: center;
  font-size: 28px;
  margin-bottom: 20px;
  font-weight: bold;
  text-transform: uppercase;
}

/* No sponsors available message */
.no-sponsors {
  text-align: center;
  font-style: italic;
  color: #999;
}

/* Loading Spinner */
.loading-indicator {
  text-align: center;
  font-size: 18px;
  color: #888;
  flex-grow: 1; /* Ensure the spinner section takes up space and stays in the center */
  display: flex;
  flex-direction: column;
  justify-content: center; /* Center the content vertically */
  align-items: center; /* Center horizontally */
  height: 100%; /* Ensure it takes full height */
}

/* Spinner Styling */
.spinner {
  margin: 20px auto;
  border: 5px solid #f3f3f3; /* Light grey */
  border-top: 5px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

/* Keyframes for spinner animation */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Sponsors content styling */
.sponsors-content {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  flex-grow: 1; /* This ensures it grows to take available space */
}
@media (max-width: 768px) {
  .sponsors-content {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Mobile (max-width: 768px): Show 1 column */
@media (max-width: 450px) {
  .sponsors-content {
    grid-template-columns: repeat(1, 1fr);
  }
}


.sponsor-card:hover {
  transform: translateY(-5px);
}

.sponsor-card {
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 0px 5px rgba(189, 134, 134, 0.2);
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
  height: 200px;
  padding: 0px 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.sponsor-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  position: relative;
  aspect-ratio: 3 / 2;
  mix-blend-mode: normal;
}

/* Fade Transition */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
