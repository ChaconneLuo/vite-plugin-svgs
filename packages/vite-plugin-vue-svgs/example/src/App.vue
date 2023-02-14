<script setup lang="ts">
import VueSvg from './assets/vue.svg?component';
import RainSvg from './assets/rain.svg?component';
</script>

<template>
  <div class="container">
    <RainSvg color="#f0f0f0" height="10em" width="10em" />
    <RainSvg color="blue" height="10em" width="10em" />
    <VueSvg color="#f0f0f0" height="10em" width="10em" />
  </div>
</template>
<style scoped>
.container {
  display: flex;
  justify-content: center;
}
</style>
