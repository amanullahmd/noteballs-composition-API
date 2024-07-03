<template>
  <nav class="navbar is-success" role="navigation" aria-label="main navigation">
    <div class="container is-max-desktop px-2">
      <div class="navbar-brand">
        <div class="navbar-item is-size-6">Noteballs</div>

        <a
          @click.prevent="showMobileNav = !showMobileNav"
          role="button"
          class="navbar-burger"
          :class="{ 'is-active': showMobileNav }"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu" :class="{ 'is-active': showMobileNav }">
        <div class="navbar-end">
          <h4 class="mt-4 ml-3" v-if="storeAuth.user.id">{{ storeAuth.user.email }}</h4>
          <router-link
            @click="showMobileNav = false"
            active-class="is-active"
            class="navbar-item"
            to="/"
            >Notes</router-link
          >
          <router-link
            @click="showMobileNav = false"
            active-class="is-active"
            class="navbar-item"
            to="/stats"
            >Stats</router-link
          >
          <button v-if="storeAuth.user.id" @click="handleSignout" class="button is-small is-info">
            Log out
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>
<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useStoreAuth } from '@/stores/storeAuth'

const storeAuth = useStoreAuth()

const showMobileNav = ref(false)

const handleSignout = () => {
  storeAuth.userSignOUt()
  showMobileNav.value = false
}
</script>

<style>
@media (max-width: 1023px) {
  .navbar-menu {
    position: absolute;
    left: 0;
    width: 100%;
  }
}
</style>
