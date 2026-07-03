<script setup>
import Header from './components/layout/Header.vue';
import Footer from './components/layout/Footer.vue';
import HomePage from './pages/HomePage.vue';
</script>

<template>
  <Header />
  <main>
    <router-view />
  </main>
  <Footer />
</template>
