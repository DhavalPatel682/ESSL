<template>
  <div class="app-container">
    <div class="container mt-5">
      <div class="rowflex">
        <div class="col-lg-6 col-md-12">
          <div class="left-side card">
            <schoolImage
              :logoSrc="school.logo ? `https://api.essleague.org/storage/${school.logo}` : ''"
              subLogoSrc="path_to_sub_logo_image"
            />
          </div>
        </div>
        <div class="col-lg-6 col-md-12 mt-3">
          <div class="right-side card">
            <SchoolContent
              :schoolName="school.name"
              :schoolAddress="`${school.address}, ${school.city}, ${school.state}, ${school.zip}`"
              :neighborhood="school.neighborhood"
              :mobileNo="school.principal_phone_number"
              :priName="school.principal_name"
              :fax="'N/A'"  
              :district="school.city" 
              :principalEmail="school.email" 
            />
          </div>
        </div>
      </div>
    </div>

    <div class="bottom-side card">
      <SchoolTab />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import schoolImage from "./schoolImage.vue";
import SchoolContent from "./SchoolContent.vue";
import SchoolTab from "./SchoolTab.vue";

export default {
  name: "SchoolPage",
  components: {
    schoolImage,
    SchoolContent,
    SchoolTab,
  },

  data() {
    return {
      schoolId: this.$route.params.id,
      school: {},
    };
  },
  watch: {
    '$route.params.id'(newId) {
      this.schoolId = newId;
      this.fetchSchoolData();
    },
  },
  created() {
    this.fetchSchoolData();
  },
  methods: {
    async fetchSchoolData() {
      try {
        console.log(`Fetching data for school ID: ${this.schoolId}`);
        const response = await axios.get(`https://api.essleague.org/api/schools/${this.schoolId}`);
        console.log('API response:', response.data);
        this.school = response.data;
      } catch (error) {
        console.error('Error fetching school data:', error);
      }
    }
  }
};
</script>

<style scoped>
.app-container {
  /* background: url('../assets/image/school_banner1.jpg') no-repeat center center; */
  background-size: cover;
  border-radius: 8px;
  /* box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); */
  padding-top: 20px;
    padding-left: 100px;
    padding-right: 100px;
}

.card {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  /* box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2); */
  padding: 20px;
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-5px);
}

.left-side {
  text-align: center;
  padding: 20px;
}

.right-side {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  margin-top: 20px;
}

.school-name {
  font-size: 26px;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 10px;
}

.school-address {
  font-size: 16px;
  color: #34495e;
  margin-bottom: 5px;
}

.school-details {
  font-size: 14px;
  color: #7f8c8d;
}

.bottom-side {
  margin-top: 30px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  /* box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); */
}

.rowflex {
  display: flex;
  justify-content: space-between;
  /* gap: 100px; */
  padding: 0 170px;
  margin-bottom: 30px;
}
@media (max-width: 850px) {
  .rowflex{
    padding: 0;
  }
  .app-container{
    padding: 0;
  }
}
@media (max-width: 768px) {
  .rowflex {
    flex-direction: column;
    align-items: center;
    padding: 0;
  }
  .bottom-side{
    padding: 15px;
  }

}
</style>
