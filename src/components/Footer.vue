<template>
  <footer class="footer">
    <div class="footer-content">
      <!-- Uncomment the logo section if you wish to use it -->
      <!-- <LogoSection /> -->
      <FooterLinks /> <!-- This will render the links in the footer -->
      <SocialMediaIcons /> <!-- This will render social media icons -->
    </div>
  </footer>
</template>

<script>
// Uncomment this if you are using the logo section
// import LogoSection from './LogoSection.vue'; 
import SocialMediaIcons from './SocialMediaIcons.vue';
import FooterLinks from './FooterLinks.vue'; // Import FooterLinks component

export default {
  name: 'AppFooter',
  components: {
    // LogoSection, // Uncomment if you want to include the logo section
    SocialMediaIcons,
    FooterLinks
  }
};
</script>

<style scoped>
.footer {
    background-color: #f47c3c;
    padding: 10px 60px;
    color: white;
    font: bold 11px/20px Verdana, Geneva, sans-serif; 
}

.footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
}

@media (max-width: 768px) {
    .footer-content {
        flex-direction: column;
        align-items: center;
    }
}
</style>
