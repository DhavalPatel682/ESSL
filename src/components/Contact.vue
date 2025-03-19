<template>
  <div>
    <center><h2>Contact Us</h2></center>
    <form @submit.prevent="submitForm">
      <div class="container-input">
          <input v-model="contact.name" type="text" placeholder="Your Name" required />
          <input v-model="contact.email" type="email" placeholder="Your Email" required />
          <textarea v-model="contact.message" placeholder="Your Message" required></textarea>
          <button type="submit">Submit</button>
      </div>
    </form>
    <p v-if="responseMessage">{{ responseMessage }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      contact: {
        name: "",
        email: "",
        message: "",
      },
      responseMessage: "",
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post("https://api.essleague.org/api/contacts", this.contact);
        
        this.responseMessage = response.data.message;
        this.contact = { name: "", email: "", message: "" }; // Reset form
      } catch (error) {
        this.responseMessage = "Error submitting form.";
        console.error(error);
      }
    },
  },
};
</script>

<style>
.container-input {
  width: 50%;
  margin-left: auto;
  margin-right: auto;
}
input, textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
}
button {
  background-color: #d07435;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
form{
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 40px;
}
</style>
