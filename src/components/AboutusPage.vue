<template>
  <div class="about-section">
    <div class="content-head">
      <div class="content">
        <h1 class="title">About Us</h1>

        <!-- First Section: Text on Top, Image on Bottom (for mobile) -->
        <div class="text-image-container">
          <p class="about-text">
            AN OFFICIAL BASKETBALL LEAGUE FOR THE ELEMENTARY STUDENTS THROUGHOUT THE DISTRICTS/BOROUGHS OF NEW YORK CITY.
            <br /><br />
            THE ESSL DOES NOT ONLY HELP TOWARDS THE ADVANCEMENT OF ITS STUDENT ATHLETES AND SCHOOLS BUT ALSO CREATE ADDITIONAL EXCITEMENT AND ENTHUSIASM FOR STUDENTS AND PARENTS ALIKE, WHICH SHALL INCREASE ACTIVE SCHOOL PARTICIPATION OF PARENTS & INCENTIVIZE STUDENT ATHLETES TO EXCEL IN THEIR ACADEMICS.
          </p>
          <img src="../assets/about_us_1.jpeg" class="right-image" alt="Basketball action" />
        </div>

        <!-- Second Section: Text on Top, Image on Bottom (for mobile) -->
        <div class="text-image-container reverse">
          <p class="about-text">
            Our objective is to enhance the elementary school experience by implementing organized, athletic programs in urban-based school districts/regions; within schools, physical education and sports are essential components of quality education.
          </p>
          <img src="../assets/about_us_2.jpeg" class="left-image" alt="Team playing" />
        </div>

        <!-- Third Section: Text on Top, Image on Bottom (for mobile) -->
        <div class="text-image-container">
          <p class="about-text">
            Not only do physical education and sport programs promote physical activity, but they also correlate to improved academic performance under certain conditions. Furthermore, such programs can provide healthy alternatives to deviant behavior, such as violence and crime.
          </p>
          <img src="../assets/image/SBP_9033.jpg" class="right-image" alt="Team playing" />
        </div>

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
  justify-content: center;
  align-items: center;
  background: white;
  padding: 50px;
  overflow: hidden;
}

.content-head {
  border-radius: 30px;
  padding: 11px;
  width: 88%;
}

.content {
  width: 100%;
  text-align: center;
  font-family: "Arial", sans-serif;
  font-weight: bold;
  color: #333;
  border-radius: 30px;
  padding: 20px;
}

.title {
  font-size: 2rem;
  color: black;
  margin-bottom: 10px;
}

.text-image-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  gap: 20px; /* Adds space between the text and image */
}

.about-text {
  width: 70%;
  text-align: left;
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 20px;
  padding-right: 20px; /* Adds space between text and image on the right */
  text-transform: uppercase; /* Capitalizes all text */
}


.right-image, .left-image {
  width: 30%;
  height: auto;
  max-height: 300px;
  object-fit: cover;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
}

/* Reverse Layout for Second Section: Image on Left, Text on Right */
.text-image-container.reverse {
  flex-direction: row-reverse; /* Reverse layout: image on left, text on right */
}

@media (max-width: 1024px) {
  .about-text {
    font-size: 1.1rem; /* Slightly larger text for medium screens */
  }
}

@media (max-width: 768px) {
  .text-image-container {
    flex-direction: column;
    align-items: center;
    gap: 20px; /* Adds space between text and image on smaller screens */
  }

  .about-text {
    width: 100%;
    text-align: center;
    text-transform: uppercase;
    padding-right: 0; /* Remove padding on small screens */
  }

  .right-image, .left-image {
    width: 80%;
    height: auto;
    margin-top: 20px;
  }

  .text-image-container, .text-image-container.reverse {
    flex-direction: column;
    align-items: center;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 1.5rem; /* Smaller title font size for very small screens */
  }

  .about-text {
    font-size: 0.9rem; /* Adjust text size for smaller screens */
  }

  .right-image, .left-image {
    width: 90%; /* Images will take up more space on smaller devices */
  }
}
</style>
