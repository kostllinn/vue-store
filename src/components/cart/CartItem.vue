<script setup>
import { useCartStore } from '../../stores/cart';

const cartStore = useCartStore();
defineProps({
  item: Object,
});
</script>
<template>
  <div class="cart-item">
    <img class="cart-item__image" :src="item.image" :alt="item.title" />

    <div class="cart-item__info">
      <h3>{{ item.title }}</h3>
      <p>{{ item.color }} {{ item.memory }} GB</p>
    </div>

    <div class="cart-item__price">{{ item.price }} ₴</div>

    <div class="cart-item__controls">
      <button @click="cartStore.decreaseQuantity(item.id)">−</button>

      <span>{{ item.quantity }}</span>

      <button @click="cartStore.increaseQuantity(item.id)">+</button>
      <button @click="cartStore.removeItem(item.id)">🗑</button>
    </div>
  </div>
</template>
<style scoped lang="scss">
.cart-item {
  display: flex;
  align-items: center;
  gap: 20px;

  padding: 24px 0;

  border-bottom: 1px solid #ececec;

  &__image {
    width: 90px;
    height: 90px;

    object-fit: contain;
    flex-shrink: 0;
  }

  &__info {
    flex: 1;

    h3 {
      margin: 0 0 8px;

      font-size: 18px;
      font-weight: 600;

      color: #111;
    }

    p {
      margin: 0;

      color: #777;
      font-size: 15px;
    }
  }

  &__price {
    font-size: 22px;
    font-weight: 700;

    color: #111;
  }

  &__controls {
    display: flex;
    align-items: center;
    gap: 12px;

    margin-top: 15px;

    button {
      width: 36px;
      height: 36px;

      border: 1px solid #dcdcdc;
      border-radius: 10px;

      background: #fff;

      color: #111;
      font-size: 20px;
      font-weight: 600;

      cursor: pointer;

      transition: 0.2s;

      &:hover {
        background: #111;
        color: #fff;
        border-color: #111;
      }
    }

    span {
      min-width: 26px;

      text-align: center;

      font-size: 18px;
      font-weight: 700;

      color: #111;
    }
  }
}
</style>
