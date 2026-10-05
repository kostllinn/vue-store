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

      <p>{{ item.color }}</p>

      <p v-if="item.memory">
        {{ item.memory }}
        <span v-if="typeof item.memory === 'number'">GB</span>
      </p>

      <div class="cart-item__price">{{ Number(item.price).toLocaleString('uk-UA') }} ₴</div>
    </div>

    <div class="cart-item__controls">
      <button @click="cartStore.decreaseQuantity(item.id)">−</button>

      <span>{{ item.quantity }}</span>

      <button @click="cartStore.increaseQuantity(item.id)">+</button>

      <button class="cart-item__remove" @click="cartStore.removeItem(item.id)">✕</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.cart-item {
  width: 100%;
  min-width: 0;

  display: grid;
  grid-template-columns: 90px minmax(0, 1fr) auto;
  align-items: center;

  gap: 18px;

  padding: 22px 0;

  border-bottom: 1px solid #ececec;

  &__image {
    width: 90px;
    height: 90px;

    object-fit: contain;
  }

  &__info {
    min-width: 0;

    h3 {
      margin: 0 0 7px;

      color: #111;

      font-size: 18px;
      font-weight: 700;

      overflow-wrap: anywhere;
    }

    p {
      margin: 2px 0;

      color: #777;

      font-size: 14px;
    }
  }

  &__price {
    margin-top: 9px;

    color: #111;

    font-size: 20px;
    font-weight: 700;
  }

  &__controls {
    display: flex;
    align-items: center;

    gap: 8px;

    button {
      width: 36px;
      height: 36px;

      flex-shrink: 0;

      border: 1px solid #ddd;
      border-radius: 10px;

      background: #fff;
      color: #111;

      font-size: 19px;
      font-weight: 600;

      cursor: pointer;
    }

    span {
      min-width: 24px;

      text-align: center;

      color: #111;

      font-size: 17px;
      font-weight: 700;
    }
  }

  &__remove {
    margin-left: 4px;
  }
}

@media (max-width: 600px) {
  .cart-item {
    grid-template-columns: 74px minmax(0, 1fr);
    grid-template-areas:
      'image info'
      'controls controls';

    column-gap: 14px;
    row-gap: 14px;

    padding: 18px 0;

    &__image {
      grid-area: image;

      width: 74px;
      height: 74px;
    }

    &__info {
      grid-area: info;

      h3 {
        font-size: 17px;
      }

      p {
        font-size: 13px;
      }
    }

    &__price {
      margin-top: 6px;

      font-size: 18px;
    }

    &__controls {
      grid-area: controls;

      width: 100%;

      justify-content: flex-start;

      gap: 10px;

      button {
        width: 38px;
        height: 38px;
      }
    }

    &__remove {
      margin-left: auto;
    }
  }
}
</style>
