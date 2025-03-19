<template>
  <div class="section-with-video">
    <!-- Background Video -->
    <video ref="backgroundVideo" autoplay muted loop playsinline class="background-video">
      <source src='../assets/videos/video1.mp4' type="video/mp4" />
      <source src='../assets/videos/video1.webm' type="video/webm" />
      Your browser does not support the video tag.
    </video>

    <!-- Overlay Content -->
    <div class="content-overlay">
      <h1 data-aos="fade-up">Welcome to</h1>
      <img src="../assets/image/logo.png" class="logo" alt="ESSL Logo" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'VideoSection',
  mounted() {
    // Access the video element using Vue's ref
    const video = this.$refs.backgroundVideo;
    
    // Ensure video plays when ready
    video.oncanplaythrough = () => {
      if (video.paused) {
        video.play();
      }
    };
  }
};
</script>

<style scoped>
.section-with-video {
  position: relative;
  height: 100vh; /* Full screen height */
  width: 100%;
  overflow: hidden;
  margin-top: -165px;
}

/* Adding gradient overlay */
.section-with-video::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)); /* Gradient */
  z-index: 0; /* Ensures the gradient is above the video but behind the content */
}

.background-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1; /* Ensure the video is behind the overlay */
}

.content-overlay {
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  flex-direction: column; /* Stack the content vertically */
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  padding: 20px;
}

.content-overlay h1 {
  font-size: 4rem; /* Default font size for larger screens */
  margin-bottom: 20px;
  font-family: system-ui;
  text-shadow: 0 0 10px #000;
}

.logo {
  max-height: 30%; /* Limit the logo's height */
  width: auto; /* Maintain aspect ratio */
  object-fit: contain;
  margin-top: 10px;
  max-width: 80%; /* Prevent the logo from being too wide */
}

/* Responsive Styles */
@media (max-width: 1200px) {
  .content-overlay h1 {
    font-size: 3rem; /* Adjust for medium screens */
  }

  .logo {
    max-height: 20%; /* Reduce the logo size on medium screens */
  }
}

@media (max-width: 768px) {
  .content-overlay h1 {
    font-size: 2.5rem; /* Smaller size for smaller screens */
  }

  .logo {
    max-height: 15%; /* Further reduce logo size */
    max-width: 70%; /* Ensure the logo stays centered */
  }
}

@media (max-width: 480px) {
  .content-overlay h1 {
    font-size: 2rem; /* Further reduce header size */
  }

  .logo {
    max-height: 10%; /* Further reduce logo size */
    max-width: 60%; /* Ensure the logo is not too large */
  }
}
</style>
