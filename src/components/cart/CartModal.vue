<script setup>
defineProps({
  isOpen: Boolean,
});
</script>

<template>
  <div v-if="isOpen" class="cart-modal">
    <div class="cart-modal__overlay"></div>

    <div class="cart-modal__content">
      <h2>Моя корзина</h2>

      <p>Корзина пока пустая</p>

      <button>Оформить заказ</button>
    </div>
  </div>
</template>
<style scoped lang="scss">
.cart-modal {
  &__overlay {
    position: fixed;
    inset: 0;

    background: rgba(0, 0, 0, 0.5);
  }

  &__content {
    position: fixed;

    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);

    width: 600px;

    padding: 30px;

    border-radius: 20px;

    background: white;

    z-index: 10;
  }
}
</style>
