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

<style>/* General form container */
.form-container {
  max-width: 90%;
  margin: 0 auto;
  padding: 5px;
  overflow: hidden; /* Prevent any overflow by default */
}

/* Ensure all inputs are block-level and take up full width */
input, textarea {
  display: block;
  width: 100%;
  padding: 5px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

/* Style the submit button */
button {
  background-color: green;
  color: white;
  padding: 10px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
}

/* Style for form fields container */
.container-input {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

/* Make the inputs responsive */
.container-input input {
  flex: 1 1 calc(100% - 10px); /* Default to 50% width with gap */
}

button {
  width: auto; /* Make the submit button fit its content */
  margin-top: 10px;
  flex: 1 1 100%; /* Ensure it spans the full width */
}

/* Responsive adjustments for tablet (max-width: 1024px) */
@media (max-width: 1024px) {
  .container-input input {
    flex: 1 1 calc(100% - 10px); /* Two columns on tablet */
  }
}

/* Responsive adjustments for mobile (max-width: 768px) */
@media (max-width: 768px) {
  .container-input input {
    flex: 1 1 100%; /* Single column on mobile */
  }

  button {
    width: 100%; /* Full width button */
  }
}

/* Adjustments for screens below 450px */
@media (max-width: 450px) {
  .form-container {
    padding: 5px; /* Reduce padding */
    margin: 0 5px; /* Reduce margins */
    max-height: 100vh; /* Ensure the form container doesn't exceed viewport height */
    overflow-y: auto; /* Enable scrolling when content overflows */
  }

  .container-input input {
    padding: 5px; /* Reduce input padding */
  }

  button {
    padding: 8px 5px; /* Reduce button padding */
  }

  /* Optional: If you want to limit the height of the form container */
  .form-container {
    height: 100%;
  }
}

</style>
