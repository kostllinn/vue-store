<script setup>
import { useCartStore } from '../../stores/cart';
import { useRouter } from 'vue-router';

const router = useRouter();
const cartStore = useCartStore();

function openCart() {
  cartStore.openCart();
}
</script>
<template>
  <header class="header">
    <div class="header__top">
      <div class="header__brand">AppleHub</div>

      <div class="header__logo">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Apple_logo_grey.svg/1280px-Apple_logo_grey.svg.png"
          alt="logo"
        />
      </div>
      <div class="header__cart" @click="openCart">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
          />
        </svg>

        <span class="header__count" v-if="cartStore.items.length">
          {{ cartStore.items.length }}
        </span>
      </div>
    </div>

    <div class="header__bottom">
      <nav class="header__nav">
        <a href="#" class="header__link">iPhone</a>
        <a href="#" class="header__link">iPad</a>
        <a href="#" class="header__link">MacBook</a>
        <a href="#" class="header__link">Watch</a>
        <a href="#" class="header__link">AirPods</a>
      </nav>
    </div>
  </header>
</template>
<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
}
.header {
  background: #111;
  color: white;

  border-bottom: 1px solid #222;

  &__top {
    max-width: 1400px;
    margin: 0 auto;
    padding: 18px 20px;

    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
  }

  &__brand {
    font-size: 26px;
    font-weight: 700;
    letter-spacing: 0.5px;

    color: white;
  }

  &__logo {
    display: flex;
    justify-content: center;
    align-items: center;

    svg,
    img {
      width: 42px;
      height: 42px;
    }
  }

  &__cart {
    justify-self: end;

    position: relative;

    width: 44px;
    height: 44px;

    border-radius: 50%;

    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;

    transition: 0.25s;

    &:hover {
      background: rgba(255, 255, 255, 0.08);
    }

    img,
    svg {
      width: 24px;
      height: 24px;
      color: white;
    }
  }

  &__count {
    position: absolute;

    top: 2px;
    right: 2px;

    width: 18px;
    height: 18px;

    border-radius: 50%;

    background: white;
    color: black;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 11px;
    font-weight: 700;
  }

  &__bottom {
    background: #181818;
    border-top: 1px solid #222;
  }

  &__nav {
    max-width: 1400px;
    margin: 0 auto;

    display: flex;
    justify-content: center;
    gap: 48px;

    padding: 16px 20px;
  }

  &__link {
    position: relative;

    color: #d6d6d6;
    text-decoration: none;

    font-size: 17px;
    font-weight: 500;

    transition: 0.25s;

    &:hover {
      color: white;
    }

    &::after {
      content: '';

      position: absolute;
      left: 0;
      bottom: -8px;

      width: 0;
      height: 2px;

      background: white;

      transition: 0.25s;
    }

    &:hover::after {
      width: 100%;
    }
  }
}
</style>
