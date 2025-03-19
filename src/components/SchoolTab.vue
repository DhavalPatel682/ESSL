<template>
  <div class="container">
    <div class="tabs-container">
      <div class="tabs">
        <div class="tab" v-for="tab in tabs" :key="tab.name" @click="selectTab(tab)"
          :class="{ 'active-tab': tab === selectedTab }">
          {{ tab.name }}
        </div>
      </div>

      <!-- Display content for the selected tab -->
      <div class="tab-content">
        <div v-if="selectedTab.name === 'SCHEDULE'" class="mb-3">
          <!-- Dropdown for year selection -->
          <div>
            <select v-model="selectedYear" class="scheduleByGame" style="margin-top: 20px;">
              <option v-for="year in yearRange" :key="year" :value="year">{{ year }}</option>
            </select>
          </div>
          <table v-if="filteredSchedule.length" class="game-table">
            <thead>
              <tr>
                <th>Game ID</th>
                <th>Date/Time</th>
                <th>Home Team</th>
                <!-- <th>Score</th> -->
                <th>Away Team</th>
                <!-- <th>Score</th> -->
                <th>Location</th>
                <!-- <th>Status</th> -->
              </tr>
            </thead>
            <tbody>
              <tr v-for="game in filteredSchedule" :key="game.id">
                <td>{{ game.game_code_number }}</td>
                <td>{{ game.game_date }} / {{ game.game_time }}</td>
                <td>{{ game.home_school.name }}</td>
                <!-- <td>{{ resu[0].score_1 }}</td> -->
                <td>{{ game.away_school.name }}</td>
                <!-- <td>{{ resu[0].score_2 }}</td> -->
                <td>{{ game.game_address }}, {{ game.game_city }}</td>
                <!-- <td>{{ game.status }}</td> -->
              </tr>
            </tbody>
          </table>
          <p v-else>No schedule available for the selected year.</p>
        </div>

        <!-- OFFICIAL ROSTER Tab Content -->
        <div v-if="selectedTab.name === 'OFFICIAL ROSTER'">
          <h3>Official Roster</h3>
          <table v-if="roster && roster.length > 0" class="game-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Player Name</th>
                <th>Create Date</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="player in roster" :key="player.id">
                <td>{{ player.id }}</td>
                <td>{{ player.first_name }} {{ player.last_name }}</td>
                <td>{{ new Date(player.created_at).getFullYear() }}</td>
              </tr>
            </tbody>
          </table>
          <p v-else>No roster available for this team.</p>
        </div>

        <!-- RESULTS Tab Content -->
        <div v-if="selectedTab.name === 'STANDINGS'">
          <div style="display: flex; justify-content:space-between; align-items: center;">
          <h3>Results</h3>

          <h4 style="border: 2px solid orange; padding: 5px; border-radius: 5px; font-size: 1.2rem;">Wining percentage: {{ results.win_percentage }}%</h4>
          </div>
          <table v-if="results && results || null" class="game-table table-responsive responsive">
            <thead>
              <tr>
                <th>School Name</th>
                <th>Win</th>
                <th>Loss</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="result in results.opponents" :key="result.id">
                <td>{{ result.opponent_name }}</td>
                <td>{{ result.games_won || 'Unknown Team' }}</td>
                <td>{{ result.games_lost }}</td>
           
             
              </tr>
            </tbody>
          </table>
          <p v-else>No results available for this school.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      tabs: [
        { name: 'SCHEDULE', content: 'Schedule Content' },
        { name: 'OFFICIAL ROSTER', content: 'Roster Content' },
        { name: 'STANDINGS', content: 'Results Content' },
        { name: 'COMMENTS', content: 'Comments Content' },
      ],
      selectedTab: {},
      schedule: [], 
      resu:[],
      filteredSchedule: [], // To store the filtered schedule by year
      roster: [],   // To store the team roster data
      results: [],  // To store the game results data
      schoolId: this.$route.params.id, // Get the school ID from route params
      teams: {}, // To store team data
      minYear: 2020, // Minimum year for schedule filter
      maxYear: 2025, // Maximum year for schedule filter
      selectedYear: new Date().getFullYear(), // Default to current year
    };
  },
  created() {
    this.selectedTab = this.tabs[0]; // Default to 'SCHEDULE'
    this.fetchFullSchedule();
    this.fetchTeams();
  },
  computed: {
    yearRange() {
      // Generate an array for year selection (2020 to 2025 as an example)
      const range = [];
      for (let i = this.minYear; i <= this.maxYear; i++) {
        range.push(i);
      }
      return range;
    }
  },
  watch: {
    selectedYear() {
      this.filterScheduleByYear();
    }
  },
  methods: {
    selectTab(tab) {
    this.selectedTab = tab;

    if (tab.name === 'SCHEDULE') {
      if (!this.schedule.length) {
        // Fetch data only if not already loaded
        this.fetchFullSchedule();
      } else {
        // Otherwise, just apply the year filter
        this.filterScheduleByYear();
      }
    } else if (tab.name === 'OFFICIAL ROSTER') {
      this.fetchRoster();
    } else if (tab.name === 'STANDINGS') {
      this.fetchResults();
    }
  },

    // Filter the schedule based on the selected year
    filterScheduleByYear() {
    this.filteredSchedule = this.schedule.filter(game => {
      const gameYear = new Date(game.game_date).getFullYear();
      return gameYear === parseInt(this.selectedYear);
    });
  },

    // Fetch schedule from API
    async fetchFullSchedule() {
      try {
        const response = await axios.get(`https://api.essleague.org/api/games/school/${this.schoolId}`);
        this.schedule = response.data.games;
        this.resu = response.data.results;
        console.log(this.resu);
        this.filterScheduleByYear(); // Filter schedule immediately after fetching
      } catch (error) {
        console.error('Error fetching schedule:', error);
      }
    },

    // Fetch team roster based on team_id
    async fetchRoster() {
      try {
          const response = await axios.get(`https://api.essleague.org/api/roster/team/${this.schoolId}`);
          this.roster = response.data.data || []; // Ensure that roster array is populated
          console.log(response.data.data )
        
      } catch (error) {
        console.error('Error fetching roster:', error);
        this.roster = []; // Set to an empty array in case of error
      }
    },

    // Fetch teams data from API
    async fetchTeams() {
      try {
        const response = await axios.get('https://api.essleague.org/api/getteams');
        this.teams = {}; // Initialize as an object
        response.data.data.forEach(team => {
          this.teams[team.team_id] = team; // Use team_id as key
        });
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    },

    // Fetch results from API
    async fetchResults() {
      try {
        const response = await axios.get(`https://api.essleague.org/api/results/win-percentage/${this.schoolId}`);
        this.results = response.data || [];
        console.log(this.results)
      } catch (error) {
        console.error('Error fetching results:', error);
        this.results = [];
      }
    },
  },
};
</script>

<style scoped>
.tabs-container {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
}

.tabs {
  display: flex;
  width: 100%;
}
.navbar {
  background-color: white ;
}
.tab {
  padding: 10px 20px;
  cursor: pointer;
  background-color: #000;
  color: white;
  border: 1px solid #ddd;
  text-align: center;
}

.active-tab {
  background-color: white;
  color: black;
}

.tab-content {
  padding: 20px;
  border: 1px solid #ddd;
  border-top: none;
  width: 95%;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

th, td {
  padding: 8px 12px;
  border: 1px solid #ddd;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}

@media (max-width: 768px) {
  .tabs{
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 10px;
    text-align: center;
  }
  .tab{
    border: 1px solid #ddd;
    text-align: center;
    width: 120px;
    vertical-align: middle;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .tab-content{
    overflow-x: scroll;
    margin-top: 10px;
    border: none;
    padding: 0;
    margin-right: 0;
  }
}
</style>
