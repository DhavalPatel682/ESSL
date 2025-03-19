<template>
  <div class="distriContainer">
    <h1>
      <label
        for="district-select"
        class="label"
        style="color: #fff; font-size: 2rem; font-family: sans-serif; letter-spacing: 1px;"
        >Select a District: {{ selectedDistrict }}</label
      >
    </h1>

    <!-- List of districts (clickable) -->
    <div class="district-list">
      <ul class="px-0">
        <li
          v-for="(schools, district) in selectedSchools"
          :key="district"
          @click="onDistrictClick(district)"
          :class="{'district-item': true, 'active': district === selectedDistrict}"
        >
          District {{ district || "select the District" }}
        </li>
      </ul>
    </div>
<!-- Display filtered schools in a table if there are any -->
<div v-if="selectedDistrict && filteredSchools.length > 0" class="school-table-container">
  <h3 style="color: #000">
    Filtered Schools in District {{ selectedDistrict }}
  </h3>
  <table class="school-table" style="width: 100%; color: #000; text-align: left; margin-top: 20px">
    <thead>
      <tr>
        <th>School Name</th>
        <th>Total Games</th>
        <th>Wins</th>
        <th>Losses</th>
        <th>Winning Percentage</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="school in filteredSchools" :key="school.school_id">
        <td>{{ school.school_name }}</td>
        <td>{{ school.total_games }}</td>
        <td>{{ school.wins }}</td>
        <td>{{ school.losses }}</td>
        <td>{{ school.winning_percentage }}%</td>
      </tr>
    </tbody>
  </table>
</div>

<!-- Display message if no data -->
<div v-else-if="selectedDistrict && filteredSchools.length === 0" style="color: #fff; margin-top: 20px">
  <p>No games available for schools in this district.</p>
</div>

  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "District",
  data() {
    return {
      filteredSchools: [],
      districts: new Map(),
      selectedDistrict: null,
      selectedSchools: [],
      allSchools: [],
      showAllSchools: false,
    };
  },
  mounted() {
    this.filteredSchools = JSON.parse(this.$route.query.schools || "[]");
    this.fetchSchools(this.filteredSchools);
  },
  
  methods: {
    async fetchSchools(region) {
  try {
    const response = await axios.get(
      `https://api.essleague.org/api/schools`
    );
    this.schools = response.data || [];
    // console.log('Fetched Schools:', this.schools);  // Log fetched schools

    this.schools.forEach((school) => {
      if (school.city.toLowerCase() === region) {
        const obje = {
          schoolName: school.name,
          schoolId: school.id,
        };
        if (!this.districts.has(school.district)) {
          this.districts.set(school.district, []);
        }
        this.districts.get(school.district).push(obje);
        this.allSchools.push(obje); // Store all schools for "All Schools" option
      }
    });

    // console.log('Districts Map:', this.districts);  // Log districts map
    
    this.selectedSchools = Array.from(this.districts.entries()).reduce(
      (acc, [district, schools]) => {
        acc[district] = schools;
        return acc;
      },
      {}
    );
  } catch (error) {
    console.error("Error fetching schools:", error);
  }
},
async onDistrictClick(district) {
    this.selectedDistrict = district; // Set selected district

    try {
      const response = await axios.get(
        `https://api.essleague.org/api/results/district/${district}`
      );

      // Update filteredSchools with API data
      const results = response.data.schools || []; // Assuming response contains 'schools' array

      console.log(results);

      // Transform the data into a format that matches your table structure
      if (results.length > 0) {
        this.filteredSchools = results.map((school) => ({
          school_name: school.school_name,
          school_id: school.school_id,
          total_games: school.games_played,
          wins: school.win_percentage > 50 ? school.games_played : 0, // Example logic for wins
          losses: school.loss_percentage > 50 ? school.games_played : 0, // Example logic for losses
          winning_percentage: school.win_percentage,
        }));
      } else {
        this.filteredSchools = []; // Clear if no results
      }
    } catch (error) {
      console.error("Error fetching results for district:", error);
      this.filteredSchools = []; // Clear in case of error
    }
  }
  },
};
</script>

<style scoped>
.distriContainer {
  padding: 20px;
  height: 100vh;
  min-height: 500px;
  color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  background-color: #000000; /* Light background */
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("../assets/image/FB_IMG_1496880485504.jpg") no-repeat center center;
  background-size: cover;
}
.select {
  width: 100%;
}
.label {
  font-size: 18px;
  margin-bottom: 10px;
  font-weight: bold;
  color: #333; /* Darker text color */
}
select {
  width: 100%;
}
ul {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 10px;
}
H1 {
  text-align: center;
}

.selecschool {
  padding: 10px;
  border: 1px solid #ff6347; /* Tomato color */
  border-radius: 5px; /* Rounded corners */
  background-color: #fff; /* White background */
  font-size: 16px; /* Increased font size */
  transition: border-color 0.3s ease;
}

.selecschool:focus {
  outline: none;
  border-color: #ffa07a; /* Lighter tomato color on focus */
}

.school-list {
  margin-top: 20px;
  text-align: center; /* Center align the text */
  color: #fff;
}

.school-list h3 {
  font-size: 20px;
  color: #333; /* Darker text color */
}

.school-list ul {
  list-style-type: none; /* Remove default list style */
  padding: 0; /* Remove padding */
}

.school-list li {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: sans-serif;
  padding: 10px;
  letter-spacing: 1px;
  padding: 5px 0;
  color: #555; /* Slightly lighter text color */
  transition: color 0.3s ease;
  cursor: pointer; /* Change cursor on hover */

  background-color: #ff4d00;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
}

.school-list li:hover {
  color: #ff6347; /* Change color on hover */
}
H1 label {
  color: #fff;
  font-size: 1.2rem;
}

.school-table-container {
  margin-top: 20px;
  background: #fff;
  color: #000;
  text-align: center;
  padding: 10px;
  border-radius: 5px;
}

.school-table {
  border-collapse: collapse;
  width: 100%;
}

.school-table th,
.school-table td {
  border: 2px solid #f47c3c;
  padding: 8px;
  text-align: left;
}

.school-table th {
  background-color: #333;
  color: #fff;
}

.district-list li {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: sans-serif;
  padding: 10px;
  letter-spacing: 1px;
  padding: 5px 0;
  color: #fff; /* Slightly lighter text color */
  transition: color 0.3s ease;
  cursor: pointer; /* Change cursor on hover */
 
  background-color:#ff4d00;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
}
.district-list .active{
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: sans-serif;
  padding: 10px;
  letter-spacing: 1px;
  padding: 5px 0;
  color: #ff4d00; /* Slightly lighter text color */
  transition: color 0.3s ease;
  cursor: pointer; /* Change cursor on hover */
 
  background-color:#fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
}
.district-list ul {
  list-style-type: none; /* Remove default list style */
  padding: 0; /* Remove padding */
}

.district-list {
  margin-top: 20px;
  text-align: center; /* Center align the text */
  color: #fff;
}

</style>
