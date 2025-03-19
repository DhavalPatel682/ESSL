<!-- EventsPage.vue -->
<template>
  <div class="sponsors-section">
    <h1 class="sponsors-heading">Our Sponsors</h1>
    <div class="sponsors-grid">
      <div v-for="(sponsor, index) in sponsors" :key="index" class="sponsor-card">
        <div class="sponsor-header">
          <!-- <h3 class="sponsor-name">{{ sponsor.name }}</h3> -->
          <!-- <span class="sponsor-label">Sponsor</span> -->
        </div>
        <img :src="sponsor.image" :alt="sponsor.name" class="sponsor-image" />
        <!-- <p class="sponsor-description">{{ sponsor.description }}</p> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EventsPage',
  data() {
    return {
      sponsors: [
        { 
          name: 'Sponsor 4', 
          image: require('../assets/SPONSORSLOGOS/ESSLSPONSORSLOGOS/9.jpg'),
          description: 'Sponsor 4 is a renowned brand in the fashion industry.'
        },
        { 
          name: 'Sponsor 2', 
          image: require('../assets/SPONSORSLOGOS/ESSLSPONSORSLOGOS/2.jpg'),
          description: 'Sponsor 2 supports innovation and growth in the community.'
        },
        { 
          name: 'Sponsor 3', 
          image: require('../assets/SPONSORSLOGOS/ESSLSPONSORSLOGOS/3.jpg'),
          description: 'Sponsor 3 focuses on environmental sustainability.'
        },
        { 
          name: 'Sponsor 4', 
          image: require('../assets/SPONSORSLOGOS/ESSLSPONSORSLOGOS/4.png'),
          description: 'Sponsor 4 is a renowned brand in the fashion industry.'
        },
        { 
          name: 'Sponsor 5', 
          image: require('../assets/SPONSORSLOGOS/ESSLSPONSORSLOGOS/5.jpg'),
          description: 'Sponsor 4 is a renowned brand in the fashion industry.'
        },
        { 
          name: 'Sponsor 4', 
          image: require('../assets/SPONSORSLOGOS/ESSLSPONSORSLOGOS/6.jpg'),
          description: 'Sponsor 4 is a renowned brand in the fashion industry.'
        },
        { 
          name: 'Sponsor 4', 
          image: require('../assets/SPONSORSLOGOS/ESSLSPONSORSLOGOS/7.jpg'),
          description: 'Sponsor 4 is a renowned brand in the fashion industry.'
        },
        { 
          name: 'Sponsor 4', 
          image: require('../assets/SPONSORSLOGOS/ESSLSPONSORSLOGOS/8.jpg'),
          description: 'Sponsor 4 is a renowned brand in the fashion industry.'
        },
        { 
          name: 'Sponsor 1', 
          image: require('../assets/SPONSORSLOGOS/ESSLSPONSORSLOGOS/1.jpg'),
          description: 'Sponsor 1 is a leading company in the tech industry.'
        },
      ],
    };
  },
};
</script>

<style scoped>
.sponsors-section {
  padding: 20px 8rem;
  text-align: center;
  background-color: #f9f9f9;
}

.sponsors-heading {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333;
}

.sponsors-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(250px, 1fr));
  gap: 70px;
  justify-items: center;
  align-items: center;
}

@media (max-width: 767px) {
  .sponsors-grid{
    display: grid;
  grid-template-columns: repeat(2, minmax(250px, 1fr));
  }
}
@media (max-width: 576px) {
  .sponsors-grid{
    display: grid;
  grid-template-columns: repeat(2, minmax(250px, 1fr));
  }
}
.sponsor-card {
  border-radius: 10px;
  padding: 30px;
  text-align: center;
  transition: transform 0.3s ease;
}

.sponsor-card:hover {
  transform: translateY(-10px);
}

.sponsor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.sponsor-name {
  font-size: 1.5rem;
  color: #333;
}

.sponsor-label {
  font-size: 0.8rem;
  color: #888;
  background-color: #eee;
  padding: 2px 6px;
  border-radius: 4px;
}

.sponsor-image {
  width: 100%;
  /* max-width: 200px; */
  height: auto;
  border-radius: 8px;
  margin-bottom: 10px;
}

.sponsor-description {
  font-size: 1rem;
  color: #666;
}
</style>
