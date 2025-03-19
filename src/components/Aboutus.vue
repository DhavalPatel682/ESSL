<template>
  <div class="about-section">
    <div class="about-photos">
      <div class="photo" id="photo1">
        <img src="../assets/image/SBP_9033.jpg" alt="loading" />
      </div>
      <div class="about-text">
        <h1>About Us</h1>
        <p>
          Our objective is to enhance the elementary school experience by implementing organized, athletic programs in urban-based school districts. Within schools, physical education and sports are essential components of quality education.
          <br /><br />
          Our current sports initiatives are Basketball and Soccer Leagues…we have serviced over 60 schools throughout the boroughs of Brooklyn, Queens, The Bronx & Manhattan.
        </p>
      </div>
      <div class="photo" id="photo2">
        <img src="../assets/image/IMG_5326.jpg" alt="loading" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutUsSection",
};
</script>

<style scoped>
.about-section {
  display: flex;
  align-items: flex-start; /* Align text at the top */
  justify-content: space-between;
  padding: 40px;
  flex-wrap: wrap; /* Allow wrapping on smaller screens */
}

.about-text {
  flex: 1 1 50%; /* Allow text to take 50% of the width */
  padding: 0 50px; /* Padding around text */
  text-align: left;
}

.about-text h1 {
  font-size: 2.5rem; /* Heading size */
  font-weight: 700;
      text-align: center; /* Center text */

  margin: -8px 0;
  font-family: sans-serif;
}

.about-text p {
  font-size: 1.3rem; /* Paragraph size */
  line-height: 1.5; /* Line height for readability */
  font-family: sans-serif;
      text-align: center; /* Center text */

  color: #5c5b5b;
  font-weight: 500;
}

.about-photos {
  display: flex;
  justify-content: space-between; /* Space out the photos */
  flex: 1 1 40%; /* Allow photos to take up 40% of the width */
  position: relative;
}

#photo1 {
  z-index: 99;
}

.photo {
  width: 100%; /* Make photo take full width */
  height: 400px; /* Maintain aspect ratio */
  max-width: 300px; /* Limit max width */
  overflow: hidden; /* Ensure images don't overflow */
}

.photo img {
  width: 100%; /* Image responsive */
  height: 100%; /* Maintain aspect ratio */
  object-fit: cover;
}

/* Responsive styles for smaller screens */
@media (max-width: 768px) {
  .about-section {
    padding: 20px; /* Less padding on smaller screens */
    flex-direction: column; /* Stack content vertically */
    align-items: center; /* Center content */
  }

  #photo1 {
    position: unset; /* Reset position for smaller screens */
    margin-bottom: 20px; /* Add space at the bottom */
  }

  .about-text {
    flex: 1 1 100%; /* Allow text to take full width */
    text-align: center; /* Center text */
    padding: 0 20px; /* Padding around text */
  }

  .about-photos {
    justify-content: center; /* Center photos */
    flex-wrap: wrap; /* Allow photos to wrap */
  }

  .photo {
    max-width: 350px; /* Reduce photo size */
    margin-bottom: 20px; /* Add space below photos */
  }
}

@media (max-width: 480px) {
  .about-text h1 {
    font-size: 2rem; /* Reduce heading size for very small screens */
  }

  .about-text p {
    font-size: 0.9rem; /* Reduce paragraph size */
  }

  .photo {
    max-width: 30300px; /* Further reduce photo size */
  }
}

/* Add styles for larger screens (greater than 1024px) */
@media (min-width: 1025px) {
  .about-photos {
    flex: 1 1 17%; /* Make photos take up 70% of the width */
  }

  .about-text {
    flex: 1 1 30%; /* Make text section take up 30% of the width */
  }

  .photo {
    max-width: 17%; /* Ensure photos take up the full width of their container */
  }
}

</style>
