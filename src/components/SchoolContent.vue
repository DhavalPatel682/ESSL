<template>
  <div class="content-container">
    <div>
      <h2>{{ schoolName }}</h2>
      <p>{{ schoolAddress }}</p>
      <div class="contact-info">
        <p><strong>Borough:</strong> {{ neighborhood }}</p>
        <p>Fax: {{ fax }}</p>
      </div>
    </div>
    <p class="mt-3">{{ Distick }}</p>
    <div class="mt-3">
      <p><strong>Principal:</strong></p>
      <p>{{ principal }}</p>
    </div>
    <div class="mt-3">
      <p><strong>Name:</strong> {{ priName }}</p>
      <p><strong>Phone:</strong> {{ mobileNo }}</p>
      <!-- <p><strong>E-mail:</strong> {{ principalEmail }}</p> -->
    </div>
    <!-- <div class="mt-3">
      <p><strong>Head Coach:</strong></p>
      <p>{{ coachName }}</p>
    </div> -->
    <!-- <div class="mt-3">
      <p><strong>Assistant Coach:</strong></p>
      <p>{{ assistantCoach }}</p>
    </div> -->
  </div>
</template>

<script>
export default {
  props: {
    schoolName: {
      type: String,
      required: true,
    },
    schoolAddress: {
      type: String,
      required: true,
    },
    mobileNo: {
      type: Number,
      required: true,
    },
    neighborhood: {
      type: Number,
      required: true,
    },
    fax: {
      type: String,
      required: true,
    },
    Distick: {
      type: String,
      required: true,
    },
    principal: {
      type: String,
      required: false,
    },
    principalPhone: {
      type: String,
      required: false,
    },
    principalEmail: {
      type: String,
      required: false,
    },
    priName: {
      type: String,
      required: false,
    },
    coachName: {
      type: String,
      required: false,
      default: "Stephon",
    },
    assistantCoach: {
      type: String,
      required: false,
    },
  },
};
</script>

<style scoped>
.content-container {
  padding-left: 20px;
  font-family: Arial, sans-serif;
}

.content-container h2 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.content-container p {
  margin: 5px 0;
  line-height: 1.5;
}

.contact-info {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.contact-info p {
  margin: 0;
}

.content-container strong {
  font-weight: bold;
}
.signuplogin a{
  color: #fff !important;
}
@media (max-width: 767px){
  .content-container{
    padding: 0;
  }
}
</style>
