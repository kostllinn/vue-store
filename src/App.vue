<script setup>
import Header from './components/layout/Header.vue';
import Footer from './components/layout/Footer.vue';
import CartModal from './components/cart/CartModal.vue';
import Notification from './components/ui/Notification.vue';
import { useNotificationStore } from './stores/notification';
import HeroBanner from './components/home/HeroBanner.vue';
const notificationStore = useNotificationStore();
</script>

<template>
  <Header />
  <main>
    <router-view />
  </main>

  <Footer />

  <CartModal />

  <Notification
    v-if="notificationStore.visible"
    :title="notificationStore.title"
    :message="notificationStore.message"
    :type="notificationStore.type"
    @close="notificationStore.close()"
  />
</template>
