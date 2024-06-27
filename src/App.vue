<script setup>
import navbar from './components/layout/navbar.vue'
</script>

<template>
  <navbar />
  <h6>hi hthere</h6>
  <div class="container is-max-desktop px-2 py-4">
    <RouterView />
  </div>
</template>

<style>
@import 'bulma/css/bulma.min.css';
</style>
