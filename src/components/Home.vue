<template>
  <div>
    <!-- Header Component Only for Home Page -->
    <Header />
    <Aboutus />
    <div class="home-content">
      <!-- You can add content here that needs to be responsive -->
    </div>
  </div>
</template>

<script>
import Header from './Header.vue'; // Import your header component
import Aboutus from './Aboutus.vue';

export default {
  name: 'Home',
  components: {
    Header,
    Aboutus, // Register the header component
  },
};
</script>

<style scoped>
.home-content {
  /* padding: 60px; */
}

/* Responsive Styles */
@media (max-width: 1200px) {
  .home-content {
    padding: 40px; /* Adjust padding for medium screens */
  }
}

@media (max-width: 768px) {
  .home-content {
    padding: 20px; /* Further reduce padding for small screens */
  }

  /* Example of making text responsive */
  h1 {
    font-size: 24px; /* Adjust header size */
  }

  p {
    font-size: 16px; /* Adjust paragraph size */
  }
}

@media (max-width: 480px) {
  .home-content {
    padding: 15px; /* Minimize padding for extra small screens */
  }

  h1 {
    font-size: 20px; /* Further adjust header size */
  }

  p {
    font-size: 14px; /* Further adjust paragraph size */
  }

  /* Adjust other elements like buttons, images, etc. */
}
</style>
