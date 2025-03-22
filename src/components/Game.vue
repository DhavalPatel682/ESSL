<template>
  <div class="games-container">
    <h1 class="title">Upcoming & Today's Games</h1>
    <div class="games-wrapper">
      <!-- Right Section: Today's Games -->      
     
      <div v-if="showTodayGames && todayGames.length > 0" class="games-section today-section"> 
               <h2 class="section-title">Today's Games</h2>

 
        <div class="games-table-container">
          <!-- For mobile, use cards -->
          <div v-if="isMobile" class="games-card-wrapper">
            <div v-for="game in todayGames" :key="game.id" class="game-card">
              <div class="game-card-header">
                <h3>{{ game.sport.name }}</h3>
                <p>{{ formatDate(game.game_time_stamp) }} - {{ formatTime(game.game_time_stamp) }}</p>
              </div>
              <div class="game-card-body">
                <p><strong>{{ game.school1.name }}</strong> vs <strong>{{ game.school2.name }}</strong></p>
                <p>{{ game.game_address }}, {{ game.game_city }}</p>
                <div class="score-status">
                  <p><strong>Home: </strong>{{ getScore(game, 1) }}</p>
                  <p><strong>Away: </strong>{{ getScore(game, 2) }}</p>
                  <div>
                    <span v-if="getScore(game, 1) > getScore(game, 2)" class="btn btn-success">W</span>
                    <span v-if="getScore(game, 1) < getScore(game, 2)" class="btn btn-danger">L</span>
                    <span v-if="getScore(game, 2) > getScore(game, 1)" class="btn btn-success">W</span>
                    <span v-if="getScore(game, 2) < getScore(game, 1)" class="btn btn-danger">L</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <table v-if="!isMobile" class="games-table">
          <thead>
            <tr>
              <th>Game ID</th>
              <th>Sport</th>
              <th>Game Date</th>
              <th>Game Time</th>
              <th>Home Team</th>
              <th>Away Team</th>
              <th>Address</th>
              <th scope="col" colspan="2">Score</th>
              <th scope="col" colspan="2">Status</th>
            </tr>
            <tr>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col">Home</th>
              <th scope="col">Away</th>
              <th scope="col">Home</th>
              <th scope="col">Away</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="game in todayGames" :key="game.id">
              <td>{{ game.game_code_number }}</td>
              <td>{{ game.sport.name }}</td>
              <td>{{ formatDate(game.game_time_stamp) }}</td>
              <td>{{ formatTime(game.game_time_stamp) }}</td>
              <td>{{ game.school1.name }}</td>
              <td>{{ game.school2.name }}</td>
              <td>{{ game.game_address }}, {{ game.game_city }}</td>
              <td>{{ getScore(game, 1) }}</td>
              <td>{{ getScore(game, 2) }}</td>
              <td>
                <span v-if="getScore(game, 1) > getScore(game, 2)" class="btn btn-success" style="margin-left: 5px;">W</span>
                <span v-if="getScore(game, 1) < getScore(game, 2)" class="btn btn-danger" style="margin-left: 5px;">L</span>
              </td>
              <td>
                <span v-if="getScore(game, 2) > getScore(game, 1)" class="btn btn-success" style="margin-left: 5px;">W</span>
                <span v-if="getScore(game, 2) < getScore(game, 1)" class="btn btn-danger" style="margin-left: 5px;">L</span>
              </td>
            </tr>
          </tbody>
        </table>
</div>
      <!-- Left Section: Upcoming Games -->
      <div v-if="showUpcomingGames && upcomingGames.length > 0" class="games-section upcoming-section">
        <h2 class="section-title">Upcoming Games</h2>
        <table class="games-table">
          <thead>
            <tr>
              <th>Game ID</th>
              <th>Sport</th>
              <th>Game Date</th>
              <th>Game Time</th>
              <th>Home Team</th>
              <th>Away Team</th>
              <th>Address</th>
              <th scope="col" colspan="2">Score</th>
              <th scope="col" colspan="2">Status</th>
            </tr>
            <tr>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col">Home</th>
              <th scope="col">Away</th>
              <th scope="col">Home</th>
              <th scope="col">Away</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="game in upcomingGames" :key="game.id">
              <td>{{ game.game_code_number }}</td>
              <td>{{ game.sport.name }}</td>
              <td>{{ formatDate(game.game_time_stamp) }}</td>
              <td>{{ formatTime(game.game_time_stamp) }}</td>
              <td>{{ game.school1.name }}</td>
              <td>{{ game.school2.name }}</td>
              <td>{{ game.game_address }}, {{ game.game_city }}</td>
              <td>{{ getScore(game, 1) }}</td>
              <td>{{ getScore(game, 2) }}</td>
              <td>
                <span v-if="getScore(game, 1) > getScore(game, 2)" class="btn btn-success" style="margin-left: 5px;">W</span>
                <span v-if="getScore(game, 1) < getScore(game, 2)" class="btn btn-danger" style="margin-left: 5px;">L</span>
              </td>
              <td>
                <span v-if="getScore(game, 2) > getScore(game, 1)" class="btn btn-success" style="margin-left: 5px;">W</span>
                <span v-if="getScore(game, 2) < getScore(game, 1)" class="btn btn-danger" style="margin-left: 5px;">L</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  </div>
</template>


<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const upcomingGames = ref([]);
    const todayGames = ref([]);
    const showTodayGames = ref(false);  // Control visibility of Today's Games
    const showUpcomingGames = ref(false);  // Control visibility of Upcoming Games
    const isMobile = ref(false); // To check if the device is mobile

    const fetchGames = async () => {
      try {
        const today = new Date().toISOString().split('T')[0];

        // Fetch data for upcoming and today's games
        const response = await fetch(`https://api.essleague.org/api/games/${today}`);
        const data = await response.json();
        upcomingGames.value = data.upcoming_games;
        todayGames.value = data.today_games;

        // Show Today's Games first
        showTodayGames.value = todayGames.value.length > 0;

        // Wait for a short time to let users focus on today's games before showing upcoming games
        setTimeout(() => {
          showUpcomingGames.value = upcomingGames.value.length > 0;
        }, 2000); // Delay in milliseconds (e.g., 2 seconds before showing upcoming games)

        console.log("Upcoming Games:", upcomingGames.value);
        console.log("Today's Games:", todayGames.value);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };

    const formatDate = (dateString) => {
      const options = { day: 'numeric', month: '2-digit', year: 'numeric' };
      console.error('Error fetching games:', options);

      return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const formatTime = (dateString) => {
      const options = { hour: '2-digit', minute: '2-digit',     hour12: false };
      return new Date(dateString).toLocaleTimeString(undefined, options);
    };

    const getScore = (game, teamNumber) => {
  // Check if the game has results
  if (game.results && game.results.length > 0) {
    // Find the result that matches the current game's game_code_number
    const result = game.results.find(result => result.game_code_number === game.game_code_number);
    
    if (result) {
      // Return the score for the team, or 'Pending' if the score is not available
      return result[`score_${teamNumber}`] !== undefined ? result[`score_${teamNumber}`] : 'Pending';
    }
  }
  return 'Not Available';  // If no matching result is found or no results exist
};

const checkMobile = () => {
      isMobile.value = window.innerWidth <= 768;
    };
    
 

    onMounted(() => {
      fetchGames();
      checkMobile();
      console.error('Error fetching games:', isMobile.value);

      window.addEventListener('resize', checkMobile);
    });
    return {
      upcomingGames,
      todayGames,
      formatDate,
      formatTime,
      getScore,
      showTodayGames,
      showUpcomingGames,
    };
  },
};
</script>

<style scoped>

/* Mobile Card Layout */
.games-card-wrapper {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.game-card {
  background-color: #333;
  color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.game-card-header h3 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.game-card-body p {
  font-size: 1rem;
}

.score-status {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.game-card .btn {
  padding: 6px 12px;
  font-size: 1rem;
  border-radius: 4px;
}
.games-container {
  padding: 50px 20px;
  background-color: #1e1e1e;
  color: #fff;
  overflow-y: auto;  /* Ensures vertical scrolling if content exceeds the container's height */
  min-height: 100vh;  /* Limits the height to 80% of the viewport height */
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('../assets/image/logo-banner.jpeg') no-repeat center center;
  background-size: cover;
  display: flex;
  flex-direction: column;
}



.title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 40px;
  color: #fff;
}

.games-wrapper {
  display: flex;
  flex-direction: column;
  gap: 30px;
  max-height: 70vh;  /* Limit the height to 70% of the viewport height */
  overflow-y: auto;  /* Enable scrolling if content overflows vertically */
}

.no-games-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Full viewport height */
  text-align: center;
  padding: 20px;
}

h2 {
  font-size: 2rem;
  color: #fff; /* Dark text color */
  margin-bottom: 10px;
}

h5 {
  font-size: 1.3rem;
  font-weight: normal;
  color: #eceae9; /* Lighter text color */
  max-width: 600px;
}

.games-section {
  background: rgba(255, 255, 255, 0.1);
  padding: 25px;
  border-radius: 12px;
  max-height: 50vh;  /* Limit the height of each section to 50% of the viewport height */
  overflow-y: auto;  /* Enable vertical scrolling for long content */
}


.section-title {
  text-align: center;
  font-size: 1.8rem;
  margin-bottom: 20px;
  font-weight: 600;
  color: #fff;
}

/* Table Styling */
.games-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.games-table-container {
  width: 100%;  /* Ensures the container takes up the full width of the parent */
}


@media (max-width: 768px) {
  .games-wrapper {
    flex-direction: column;  /* Stack the sections vertically on smaller screens */
    overflow-x: auto;  /* Allow horizontal scrolling if necessary */
  }

  .games-table-container {
    width: 100%;
  }

  .title {
    font-size: 2rem;  /* Smaller font size for the title on mobile */
  }

  .section-title {
    font-size: 1.5rem;  /* Smaller font size for section titles */
  }

  .games-table th,
  .games-table td {
    padding: 8px;  /* Reduce padding for smaller screens */
    font-size: 0.9rem;  /* Smaller font size for table content */
  }

  .btn {
    padding: 5px 10px;  /* Adjust padding for buttons */
    border: none;
    cursor: pointer;
    border-radius: 4px;
  }

  .btn-success {
    background-color: #28a745;
    color: white;
  }

  .btn-danger {
    background-color: #dc3545;
    color: white;
  }
}



.games-table th,
.games-table td {
  padding: 12px;
  text-align: center;
  border: 1px solid #fff;
}

.games-table th {
  background-color: #f47c3c;
  color: #fff;
  font-size: 1.1rem;
}

.games-table td {
  background-color: #1e1e1e;
  color: #fff;
  font-size: 1rem;
}

.games-table tr:nth-child(even) {
  background-color: #555;
}

.games-table tr:hover {
  background-color: #8DC73F;
  color: #fff;
  cursor: pointer;
}

/* Responsive Styles */
@media (max-width: 1024px) {
  .games-wrapper {
    flex-direction: column;
  }

  .games-section {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .title {
    font-size: 2rem;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .games-table th,
  .games-table td {
    padding: 8px;
    font-size: 0.9rem;
  }
  .btn {
  padding: 5px 10px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

.btn-success {
  background-color: #28a745;
  color: white;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}
}

</style>
