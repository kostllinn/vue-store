<script setup>
import { useCartStore } from '../../stores/cart';
import CartItem from './CartItem.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const cartStore = useCartStore();

function checkout() {
  cartStore.closeCart();
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

      <div v-if="cartStore.items.length" class="cart-modal__footer">
        <div class="cart-modal__total">
          Разом:
          <span> {{ Number(cartStore.totalPrice).toLocaleString('uk-UA') }} ₴ </span>
        </div>

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
    max-width: calc(100% - 30px);
    max-height: 80vh;

    padding: 32px;

    display: flex;
    flex-direction: column;

    background: #fff;

    border-radius: 24px;

    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.15);

    z-index: 101;
  }

  &__top {
    flex-shrink: 0;

    display: flex;
    justify-content: space-between;
    align-items: center;

    padding-bottom: 22px;

    border-bottom: 1px solid #ececec;

    h2 {
      margin: 0;

      font-size: 30px;
      font-weight: 700;

      color: #111;
    }
  }

  &__close {
    width: 40px;
    height: 40px;

    border: none;
    border-radius: 50%;

    background: #f4f4f4;

    color: #111;

    font-size: 19px;

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
    min-height: 0;

    flex: 1;

    overflow-y: auto;

    padding: 6px 0;

    scrollbar-width: thin;
  }

  &__empty {
    min-height: 250px;

    display: flex;
    justify-content: center;
    align-items: center;

    color: #888;

    font-size: 18px;
  }

  &__footer {
    flex-shrink: 0;

    padding-top: 22px;

    border-top: 1px solid #ececec;

    display: flex;
    justify-content: space-between;
    align-items: center;

    gap: 20px;
  }

  &__total {
    color: #111;

    font-size: 22px;
    font-weight: 600;

    span {
      font-size: 27px;
      font-weight: 700;
    }
  }

  &__checkout {
    min-width: 230px;
    height: 52px;

    padding: 0 24px;

    border: none;
    border-radius: 14px;

    background: #111;
    color: #fff;

    font-size: 16px;
    font-weight: 600;

    cursor: pointer;

    transition: 0.2s;

    &:hover {
      background: #292929;
    }

    &:active {
      transform: scale(0.98);
    }
  }
}

/* =========================
   ТЕЛЕФОН
========================= */

@media (max-width: 600px) {
  .cart-modal {
    &__content {
      top: auto;
      bottom: 0;
      left: 0;

      transform: none;

      width: 100%;
      max-width: 100%;
      max-height: 90dvh;

      padding: 20px 16px 16px;

      border-radius: 24px 24px 0 0;
    }

    &__top {
      padding-bottom: 16px;

      h2 {
        font-size: 25px;
      }
    }

    &__close {
      width: 38px;
      height: 38px;

      font-size: 17px;
    }

    &__body {
      padding: 0;
    }

    &__footer {
      padding-top: 16px;

      flex-direction: column;
      align-items: stretch;

      gap: 12px;

      background: #fff;
    }

    &__total {
      display: flex;
      justify-content: space-between;
      align-items: center;

      font-size: 18px;

      span {
        font-size: 22px;
      }
    }

    &__checkout {
      width: 100%;
      min-width: 0;

      height: 52px;
    }
  }
}

/* =========================
   МАЛЕНЬКИЕ ТЕЛЕФОНЫ
========================= */

@media (max-width: 380px) {
  .cart-modal {
    &__content {
      padding: 18px 12px 12px;
    }

    &__top {
      h2 {
        font-size: 23px;
      }
    }

    &__total {
      font-size: 17px;

      span {
        font-size: 20px;
      }
    }
  }
}
</style>
