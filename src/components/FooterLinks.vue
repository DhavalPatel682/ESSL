<template>
    <div class="footer-links">
      <a href="/about-us">About Us</a>
      <span>|</span>
      <a href="/sponsors">Sponsors</a>
      <span>|</span>
      <a href="/Contact">Contact</a>
      <span>|</span>
      <a href="/Registrationform">Register</a>
      <!-- <span>|</span>
      <a href="#">Feedback</a>
      <span>|</span>
      <span>©2021 PSAL</span> -->
    </div>
  </template>
  
  <script>
  export default {
    name: 'FooterLinks'
  };
  </script>
  
  <style scoped>
  .footer-links {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: center;
  }
  
  .footer-links a {
    color: white;
    text-decoration: none;
    font-size: 13px;
  }
  
  .footer-links a:hover {
    text-decoration: underline;
  }
  </style>
  