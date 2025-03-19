<template>
  <div>
    <center><h2>School Registration Form</h2></center>
    <form @submit.prevent="submitForm" enctype="multipart/form-data">
      <div class="container-input">
        <input v-model="school.name" type="text" placeholder="School Name" required />
        <input v-model="school.address" type="text" placeholder="Address" required />
        <input v-model="school.city" type="text" placeholder="City" required />
        <input v-model="school.state" type="text" placeholder="State" required />
        <input v-model="school.zip" type="text" placeholder="Zip Code" required />
        <input v-model="school.phone" type="text" placeholder="Phone" required />
        <input v-model="school.email" type="email" placeholder="Email" required />
        <input v-model="school.website" type="text" placeholder="Website" />
        <input v-model="school.district" type="text" placeholder="District" required />
        <input v-model="school.principal_name" type="text" placeholder="Principal Name" required />
        <!-- <input v-model="school.principal_title" type="text" placeholder="Principal Title" required /> -->
        <input v-model="school.neighborhood" type="text" placeholder="Borough" />
        <input type="file" @change="onFileChange" accept="image/*" />
        <!-- <textarea v-model="school.description" placeholder="Description"></textarea> -->
        <button type="submit">Submit</button>
      </div>
    </form>
    <p v-if="responseMessage">{{ responseMessage }}</p>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";

export default {
  data() {
    return {
      school: {
        name: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        phone: "",
        email: "",
        website: "",
        district: "",
        // principal_name: "",
        principal_title: "",
        neighborhood: "",
        logo: null,
        // description: "",
      },
      responseMessage: "",
      validate: {}, // Store validation errors here
    };
  },
  methods: {
    onFileChange(event) {
      this.school.logo = event.target.files[0];
    },
    async submitForm() {
      try {
        let formData = new FormData();
        for (let key in this.school) {
          formData.append(key, this.school[key]);
        }

        const response = await axios.post("https://api.essleague.org/api/schoolregister", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        // Clear errors if submission is successful
        this.validate = {};
        Swal.fire("Success!", response.data.message, "success");
        // this.responseMessage = response.data.message;
        this.school = {
          name: "",
          address: "",
          city: "",
          state: "",
          zip: "",
          phone: "",
          email: "",
          website: "",
          district: "",
          principal_name: "",
          // principal_title: "",
          neighborhood: "",
          logo: null,
          // description: "",
        }; // Reset form
      }
      catch (error) {
        // this.responseMessage = "Something went wrong!";
        // Swal.fire("Error!", errors, "error");
        if (error.response && error.response.data.errors) {
          this.errors = error.response.data.errors; // Store errors in Vue state

          // Extract all error messages and format them
          let errorMessages = Object.values(error.response.data.errors)
            .flat()
            .map(msg => `<li>${msg}</li>`)
            .join("");

          // Show errors in SweetAlert2
          Swal.fire({
            icon: "error",
            title: "Validation Error",
            html: `<ul style="text-align: left; color: red;">${errorMessages}</ul>`, // Display errors as a list
          });
        }
        else {
          Swal.fire("Error!", "Something went wrong!", "error");
        }
        console.error(error);
      }
    },
  },
};
</script>

<style>
input, textarea {
  display: block;
  margin-bottom: 10px;
  padding: 8px;
  width: 100%;
}
button {
  background-color: green;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
}
</style>
