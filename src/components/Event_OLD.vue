<template>
  
  <div class="games-container">
    <h1 class="title">Upcoming Games</h1>
    <div v-if="upcomingGames.length === 0" class="no-games">
      <p>No upcoming games.</p>
    </div>
    <div class="games-list">
      <div class="game-card" v-for="game in upcomingGames" :key="game.id">
        <h2 class="game-title">Game Code: {{ game.game_code_number }}</h2>
        <p><strong><i class="fas fa-futbol"></i> Sport:</strong> {{ game.sport_id }}</p>
        <p><strong><i class="fas fa-clock"></i> Entry Time:</strong> {{ formatDate(game.entry_time) }}</p>
        <p><strong><i class="fas fa-calendar-alt"></i> Game Time:</strong> {{ formatDate(game.game_time_stamp) }}</p>
        <p><strong><i class="fas fa-map-marker-alt"></i> Location:</strong> {{ game.game_address }}, {{ game.game_city }}</p>
        <p><strong><i class="fas fa-whistle"></i> Referee:</strong> {{ game.referee }}</p>
        <p><strong><i class="fas fa-users"></i> Home Team ID:</strong> {{ game.home_team_id }}</p>
        <p><strong><i class="fas fa-users"></i> Away Team ID:</strong> {{ game.away_team_id }}</p>
        <p><strong><i class="fas fa-trophy"></i> Score:</strong> {{ game.game_score }}</p>
        <p><strong><i class="fas fa-info-circle"></i> Description:</strong> {{ game.game_description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const upcomingGames = ref([]);

    const fetchGames = async () => {
      try {
        const response = await fetch('https://api.essleague.org/api/games/2024-09-12');
        const data = await response.json();
        upcomingGames.value = data.upcoming_games;
      }
      catch (error) {
        console.error('Error fetching games:', error);
      }
    };

    const formatDate = (dateString) => {
      const options = { day: 'numeric', month: '2-digit', year: 'numeric',  hour: '2-digit', minute: '2-digit',hour12: false };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };

    onMounted(fetchGames);

    return {
      upcomingGames,
      formatDate,
    };
  },
};
</script>

<style scoped>
.games-container {
  padding: 50px 20px;
  background-color: #1e1e1e;
  background-image: linear-gradient(135deg, #2a5298, #1e3c72);
  color: #fff;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('../assets/image/logo-banner.jpeg') no-repeat center center;
  background-size: cover;
}

.title {
  text-align: center;
  color: #ffffff;
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 20px;
}

.no-games {
  text-align: center;
  font-style: italic;
  color: #ff7675;
}

.games-list {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
}

.game-card {
  background-color: #ffffff;
  color: #333;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out;
  position: relative;
  border: 2px solid transparent;
}

.game-card:hover {
  transform: scale(1.05);
  border-color: #8DC73F; /* Use your preferred accent color */
}

.game-title {
  font-size: 1.8rem;
  margin-bottom: 15px;
  font-weight: 600;
  color: #333;
}

p {
  margin-bottom: 10px;
  font-size: 1rem;
}

i {
  margin-right: 8px;
}

@media (max-width: 768px) {
  .title {
    font-size: 1.8rem;
  }

  .game-title {
    font-size: 1.4rem;
  }

  .games-container {
    padding: 100px 15px;
  }
}

@media (max-width: 480px) {
  .games-container {
    padding: 120px 10px;
  }

  .title {
    font-size: 1.6rem;
  }

  .game-card {
    padding: 15px;
  }
}
</style>
