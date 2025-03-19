<template>
  <div class="logo-container">
    <img
      :src="logoSrc"
      alt="Logo"
      class="logo"
    />
    <!-- <img src="../assets/image/logo.png" alt="loading" /> -->
    <!-- <img
      :src="require('@/assets/image/logo.png')"
      alt="Sub Logo"
      class="sub-logo"
    /> -->
  </div>
</template>

<script>
export default {
  props: {
    logoSrc: {
      type: String,
      required: true,
    },
    subLogoSrc: {
      type: String,
      required: false,
    },
  },
};
</script>

<style scoped>
/*
.logo-container {
  /* display: flex;
  flex-direction: column;
  align-items: center; */
  /* padding: 30px 0; */


.logo {
  width: auto;
  height: 300px;
  text-align: center
}

.sub-logo {
  width: auto;
  height: 300px;
  margin-top: 10px;
}
</style>
