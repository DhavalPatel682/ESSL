<template>
  <div class="media-container">
    <h1 class="title">Our Media - Videos</h1>
    <div v-if="videoMedia.length === 0" class="no-sponsors">
      <p>No Video-Media available.</p>
    </div>
    <div class="sponsors-list">
      <transition-group name="fade" tag="div" class="media-content">
        <div class="media-card" v-for="(video, index) in videoMedia">
          <video :src="video.file_url" controls class="media-image" :alt="Video-Media"></video>
        </div>
      </transition-group>
      
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Swal from "sweetalert2";

export default {
  setup() {
    const videoMedia = ref([]);
    const BASE_URL = 'https://api.essleague.org';

    const fetchVideoMedia = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/media`);
        const mediaData = response.data;
        videoMedia.value = mediaData.filter(item => item.type === 'video');
      }
      catch (error) {
        console.error('Error fetching sponsors:', error);
      }
    };

    onMounted(fetchVideoMedia);

    return {
      videoMedia,
    };
  },
};
</script>

<style scoped>
.media-container {
  padding: 50px 20px;
  background-color: #fff;
  color: #fff;
  margin: 0 auto;
  /* background: url('../assets/image/school_banner1.jpg') no-repeat center center;  */
  background-size: cover; 
}

.title {
  text-align: center;
  font-size: 28px;
  margin-bottom: 20px;
  font-weight: bold;
  text-transform: uppercase;
}

.no-sponsors {
  text-align: center;
  font-style: italic;
  color: #999;
}

/* Arrange sponsor cards into columns */
.media-content {
  display: grid;
  grid-template-columns: repeat(3, 1fr) !important; /* 4 columns */
  gap: 20px; /* Spacing between cards */
  padding: 20px;
  max-width: 1200px; /* Adjust as needed for your layout */
  margin: 0 auto; /* Center the grid horizontally */
}
@media (max-width: 768px) {
  .sponsors-content {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}
.media-card:hover {
  transform: translateY(-5px);
  /* box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3); */
}

.media-card {
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 0px 5px rgba(189, 134, 134, 0.2);
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
  height: 200px;
  padding: 0px 25px;
  display: flex; /* Flexbox to center the image */
  justify-content: center;
  align-items: center;
  position: relative;
}

.media-image {
  max-width: 100%; /* Responsive image sizing */
  max-height: 100%; /* Maintain aspect ratio */
  object-fit: contain; /* Ensures image doesn't distort */
  position: relative;
  aspect-ratio: 3 / 2;
  mix-blend-mode: normal;
}

/* Animation styles */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

/* Keyframes for fade-in */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
