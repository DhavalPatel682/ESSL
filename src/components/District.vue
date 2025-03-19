<template>
  <div class="distriContainer">
    <h1>
      <label for="district-select" class="label" style="color: #fff; font-size:2rem; font-family: sans-serif; letter-spacing: 1px;">Select a District: {{ selectedDistrict }}</label>
    </h1>    
    <!-- <div style="width: 100%; margin: auto;">
      <select
        class="selecschool"
        id="district-select"
        @change="onDistrictChange"
      >
        <option >Select Option</option>
        <option v-for="(schools, district) in selectedSchools" :key="district" :value="district">
          District {{ district || "select the District" }}
        </option>
      </select>
    </div> -->

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

    <div v-if="selectedDistrict || showAllSchools" class="school-list">
      <h3 style="color: #fff;">Schools in {{ showAllSchools ? 'All Districts' : 'district ' + selectedDistrict }}</h3>
      <ul>
        <li
          v-for="school in showAllSchools ? allSchools : selectedSchools[selectedDistrict]"
          :key="school.schoolId"
          @click="redirectToSchool(school.schoolId)"
          class="school-item"
          style="color: #fff;"
        >
          {{ school.schoolName }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'District',
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
    this.filteredSchools = JSON.parse(this.$route.query.schools || '[]');
    this.fetchSchools(this.filteredSchools);
  },
  methods: {
    async fetchSchools(region) {
      try {
        const response = await axios.get(`https://api.essleague.org/api/schools`);
        this.schools = response.data || [];

        this.schools.forEach(school => {
          if (school.city.toLowerCase() === region) {
            const obje = {
              schoolName: school.name,
              schoolId: school.id,
            };
            if (!this.districts.has(school.district)) {
              this.districts.set(school.district, []);
            }
            this.districts.get(school.district).push(obje);
            this.allSchools.push(obje);  // Store all schools for "All Schools" option
          }
        });

        // Convert districts map to an object for easier access
        this.selectedSchools = Array.from(this.districts.entries()).reduce((acc, [district, schools]) => {
          acc[district] = schools;
          return acc;
        }, {});
      } catch (error) {
        console.error("Error fetching schools:", error);
      }
    },
    onDistrictClick(district) {
      this.selectedDistrict = district;
      this.showAllSchools = false; // Hide all schools if a district is selected
    },
    redirectToSchool(schoolId) {
      this.$router.push({ path: `/school/${schoolId}` });
    }
  }
};
</script>


<style scoped>
.distriContainer {
  padding: 20px;
  height:100vh;
  min-height: 500px;
  color:#fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  background-color: #000000; /* Light background */
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('../assets/image/logo-banner.jpeg') no-repeat center center;
  
  /* background: url('../assets/image/school_banner1.jpg') no-repeat center center;  */
  background-size: cover; 
}
.select{
  width: 100%;
}
.label {
  font-size: 18px;
  margin-bottom: 10px;
  font-weight: bold;
  color: #333; /* Darker text color */
}
select{
  width: 100%;
}
ul{
  display:grid;
  grid-template-columns: repeat(auto-fill,
              minmax(200px, 1fr));
            grid-gap: 10px
}
H1{

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

.district-list {
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

.district-list ul {
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
 
  background-color:#ff4d00;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
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

.school-list li:hover {
  color: #ff6347; /* Change color on hover */
}

H1 label{
  color:#fff;
  font-size: 1.2rem;
}
</style>
