<script setup>
import { useCartStore } from '../../stores/cart';
import { useRouter } from 'vue-router';

const props = defineProps({
  product: Object,
});

const router = useRouter();
const cartStore = useCartStore();

function openProduct() {
  router.push(`/product/${props.product.slug}`);
}
</script>

<template>
  <div class="product-card" @click="openProduct">
    <img class="product-card__image" :src="product.image" :alt="product.title" />

    <h2 class="product-card__title">
      {{ product.title }}
    </h2>
    <p class="product-card__info">{{ product.color }} • {{ product.memory }} GB</p>
    <div class="product-card__bottom">
      <p class="product-card__price">{{ product.price }} ₴</p>
      <button class="product-card__button" @click.stop="cartStore.addToCart(product)"></button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.product-card {
  position: relative;

  width: 100%;
  padding: 20px;

  border: 1px solid #e8e8e8;
  border-radius: 16px;

  background: #fff;

  transition: 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08);
  }

  &__image {
    width: 100%;
    height: 260px;

    object-fit: contain;
    display: block;
  }

  &__title {
    margin-top: 16px;

    font-size: 20px;
    font-weight: 600;

    color: #222;
  }

  &__favorite {
    position: absolute;

    top: 16px;
    right: 16px;

    border: none;
    background: transparent;

    font-size: 28px;

    color: transparent;
    -webkit-text-stroke: 2px #8f8f8f;

    cursor: pointer;

    transition: 0.2s;

    &:hover {
      color: #ff3b30;
      -webkit-text-stroke: 2px #ff3b30;

      transform: scale(1.1);
    }
  }

  &__info {
    margin-top: 8px;

    color: #777;
    font-size: 15px;
  }

  &__price {
    margin-top: 16px;

    font-size: 28px;
    font-weight: 700;

    color: #111;
  }

  &__bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;

    gap: 16px;

    margin-top: 20px;
  }

  &__price {
    font-size: 28px;
    font-weight: 700;

    color: #111;
  }

  &__button {
    min-width: 130px;
    height: 44px;

    border: none;
    border-radius: 10px;

    background: #2d7ef7;

    color: #fff;
    font-size: 15px;
    font-weight: 600;

    cursor: pointer;

    transition: 0.2s;

    &:hover {
      background: #1768e2;
    }

    &:active {
      transform: scale(0.98);
    }
  }
}
</style>
