<template>
  <navbar />
  <div class="container is-max-desktop px-2 py-4">
    <RouterView />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import navbar from './components/layout/navbar.vue'
import { useStoreNotes } from './stores/storeNotes';

const storeNotes = useStoreNotes()

onMounted(()=> {
  storeNotes.getNotes()
})
</script>

<style>
@import 'bulma/css/bulma.min.css';
</style>
