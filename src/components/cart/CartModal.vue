<script setup>
import { useCartStore } from '../../stores/cart';
import CartItem from './CartItem.vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const cartStore = useCartStore();
function checkout() {
  router.push('/checkout');
}
</script>

<template>
  <div v-if="cartStore.isOpen" class="cart-modal">
    <div class="cart-modal__overlay" @click="cartStore.closeCart()"></div>

    <div class="cart-modal__content">
      <div class="cart-modal__top">
        <h2>Мій кошик</h2>

        <button class="cart-modal__close" @click="cartStore.closeCart()">✕</button>
      </div>

      <div class="cart-modal__body">
        <div v-if="cartStore.items.length === 0" class="cart-modal__empty">
          Корзина поки порожня
        </div>

        <template v-else>
          <CartItem v-for="item in cartStore.items" :key="item.id" :item="item" />
        </template>
      </div>

      <div class="cart-modal__footer">
        <div class="cart-modal__total">Разом: {{ cartStore.totalPrice }} ₴</div>

        <button class="cart-modal__checkout" @click="checkout">Оформити замовлення</button>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.cart-modal {
  &__overlay {
    position: fixed;
    inset: 0;

    background: rgba(0, 0, 0, 0.45);
    backdrop-filter: blur(6px);

    z-index: 100;
  }

  &__content {
    position: fixed;

    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);

    width: 700px;
    max-width: 95%;
    height: 700px;

    display: flex;
    flex-direction: column;

    background: #fff;
    border-radius: 24px;

    padding: 32px;

    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.15);

    z-index: 101;
  }

  &__top {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding-bottom: 24px;

    border-bottom: 1px solid #ececec;

    h2 {
      margin: 0;

      font-size: 32px;
      font-weight: 700;

      color: #111;
    }
  }

  &__close {
    width: 42px;
    height: 42px;

    border: none;
    border-radius: 50%;

    background: #f4f4f4;

    font-size: 22px;

    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;

    transition: 0.2s;

    &:hover {
      background: #111;
      color: #fff;
      transform: rotate(90deg);
    }
  }

  &__body {
    flex: 1;

    overflow-y: auto;

    padding: 20px 0;
  }

  &__empty {
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    color: #888;
    font-size: 18px;
  }

  &__footer {
    margin-top: auto;

    display: flex;
    justify-content: space-between;
    align-items: center;

    padding-top: 24px;

    border-top: 1px solid #ececec;
  }

  &__total {
    font-size: 30px;
    font-weight: 700;

    color: #111;
  }

  &__checkout {
    min-width: 220px;
    height: 52px;

    border: none;
    border-radius: 14px;

    background: #111;

    color: #fff;

    font-size: 16px;
    font-weight: 600;

    cursor: pointer;

    transition: 0.2s;

    &:hover {
      background: #2b2b2b;
      transform: translateY(-2px);
    }

    &:active {
      transform: scale(0.98);
    }
  }
}
</style>
