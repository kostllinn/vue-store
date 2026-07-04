<script setup>
import Header from './components/layout/Header.vue';
import Footer from './components/layout/Footer.vue';
import CartModal from './components/cart/CartModal.vue';
</script>

<template>
  <Header @open-cart="isCartOpen = true" />

  <main>
    <router-view />
  </main>
  <Footer />
</template>
