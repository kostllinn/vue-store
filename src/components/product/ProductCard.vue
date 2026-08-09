<script setup>
import { useCartStore } from '../../stores/cart';
import { useRouter } from 'vue-router';
import { useNotificationStore } from '../../stores/notification';

const notificationStore = useNotificationStore();
const props = defineProps({
  product: Object,
});

const router = useRouter();
const cartStore = useCartStore();

function openProduct() {
  router.push(`/product/${props.product.slug}`);
}
function addToCart() {
  cartStore.addToCart(props.product);
  notificationStore.show('Товар додано до кошика');
}
</script>

<template>
  <div class="product-card" @click="openProduct">
    <img class="product-card__image" :src="product.colors[0].image" :alt="product.title" />

    <h2 class="product-card__title">
      {{ product.title }}
    </h2>
    <div class="product-card__bottom">
      <p class="product-card__price">від {{ product.memoryOptions[0].price }} ₴</p>
      <button class="product-card__button" @click.stop="openProduct">Купити</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.product-card {
  position: relative;

  width: 100%;
  padding: 28px;

  border: 1px solid #f1f1f1;
  border-radius: 22px;

  background: #fff;

  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.05);

  cursor: pointer;

  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-6px);

    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.08);

    .product-card__image {
      transform: scale(1.04);
    }

    .product-card__button {
      background: #222;
    }
  }

  &__image {
    width: 100%;
    height: 300px;

    object-fit: contain;
    display: block;

    transition: 0.25s;
  }

  &__title {
    margin-top: 22px;

    font-size: 22px;
    font-weight: 700;

    color: #111;
  }

  &__info {
    margin-top: 10px;

    color: #8b8b8b;

    font-size: 15px;
    line-height: 1.4;
  }

  &__bottom {
    margin-top: 22px;

    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  &__price {
    font-size: 30px;
    font-weight: 700;

    color: #111;
  }

  &__button {
    width: 100%;
    height: 50px;

    border: none;
    border-radius: 14px;

    background: #111;

    color: #fff;

    font-size: 16px;
    font-weight: 600;

    cursor: pointer;

    transition: 0.2s;

    &:hover {
      background: #222;
    }

    &:active {
      transform: scale(0.98);
    }
  }

  &__favorite {
    position: absolute;

    top: 18px;
    right: 18px;

    width: 42px;
    height: 42px;

    border-radius: 50%;
    border: 1px solid #ececec;

    background: white;

    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;

    font-size: 20px;

    transition: 0.2s;

    &:hover {
      background: #f8f8f8;
    }
  }
}
</style>
