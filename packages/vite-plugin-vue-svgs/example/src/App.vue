<script setup lang="ts">
import VueSvg from './assets/vue.svg?component';
import RainSvg from './assets/rain.svg?component';
</script>

<template>
  <div class="container">
    <RainSvg color="blue" height="5em" width="5em" />
    <VueSvg width="10em" height="10em" />
    <RainSvg color="#f0f0f0" height="5em" width="5em" />
  </div>
</template>
<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
