<script setup>
import { useCartStore } from '../../stores/cart';

const cartStore = useCartStore();
</script>
<template>
  <header class="header">
    <div class="header_wrapper">
      <div class="burger_menu">-</div>
      <div class="logo">
        <img src="" alt="logo" />
      </div>
      <div class="cart">
        <button @click="cartStore.openCart()">Корзина</button>
      </div>
    </div>
  </header>
</template>
<style lang="scss">
.header {
  background: #000;
  padding: 15px;

  &_wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .burger_menu {
    font-size: 24px;
    cursor: pointer;
    color: #fff;
  }

  .cart {
    .cart {
      button {
        border: none;
        background: transparent;

        color: white;
        font-size: 16px;

        cursor: pointer;
      }
    }
  }
}
</style>
