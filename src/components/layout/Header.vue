<script setup>
import { ref } from 'vue';
import { useCartStore } from '../../stores/cart';

const cartStore = useCartStore();

const isMenuOpen = ref(false);

function openCart() {
  cartStore.openCart();
  isMenuOpen.value = false;
}

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

function closeMenu() {
  isMenuOpen.value = false;
}
</script>

<template>
  <header class="header">
    <div class="header__top">
      <RouterLink to="/" class="header__brand" @click="closeMenu"> AppleHub </RouterLink>

      <RouterLink to="/" class="header__logo" @click="closeMenu">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Apple_logo_grey.svg/1280px-Apple_logo_grey.svg.png"
          alt="logo"
        />
      </RouterLink>

      <div class="header__actions">
        <div class="header__cart" @click="openCart">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>

          <span v-if="cartStore.items.length" class="header__count">
            {{ cartStore.items.length }}
          </span>
        </div>

        <button
          class="header__burger"
          :class="{ 'header__burger--active': isMenuOpen }"
          @click="toggleMenu"
          aria-label="Меню"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>

    <div class="header__bottom" :class="{ 'header__bottom--open': isMenuOpen }">
      <nav class="header__nav">
        <RouterLink to="/iphone" class="header__link" @click="closeMenu"> iPhone </RouterLink>

        <RouterLink to="/ipad" class="header__link" @click="closeMenu"> iPad </RouterLink>

        <RouterLink to="/macbook" class="header__link" @click="closeMenu"> MacBook </RouterLink>

        <RouterLink to="/watch" class="header__link" @click="closeMenu"> Watch </RouterLink>

        <RouterLink to="/airpods" class="header__link" @click="closeMenu"> AirPods </RouterLink>
      </nav>
    </div>
  </header>
</template>

<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
}

html,
body {
  margin: 0;
  padding: 0;
}

.header {
  width: 100%;

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
    justify-self: start;

    font-size: 26px;
    font-weight: 700;
    letter-spacing: 0.5px;

    color: white;
    text-decoration: none;
    cursor: pointer;
  }

  &__logo {
    justify-self: center;

    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;
    text-decoration: none;

    img {
      width: 42px;
      height: 42px;
      object-fit: contain;
    }
  }

  &__actions {
    justify-self: end;

    display: flex;
    align-items: center;
    gap: 6px;
  }

  &__cart {
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

  &__burger {
    display: none;

    width: 44px;
    height: 44px;

    padding: 0;

    border: none;
    border-radius: 50%;

    background: transparent;

    cursor: pointer;

    flex-direction: column;
    justify-content: center;
    align-items: center;

    gap: 5px;

    transition: 0.25s;

    span {
      width: 22px;
      height: 2px;

      background: white;
      border-radius: 10px;

      transition: 0.25s;
    }

    &:hover {
      background: rgba(255, 255, 255, 0.08);
    }

    &--active {
      span:nth-child(1) {
        transform: translateY(7px) rotate(45deg);
      }

      span:nth-child(2) {
        opacity: 0;
      }

      span:nth-child(3) {
        transform: translateY(-7px) rotate(-45deg);
      }
    }
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

@media (max-width: 900px) {
  .header {
    &__nav {
      gap: 28px;
    }

    &__link {
      font-size: 15px;
    }
  }
}

@media (max-width: 650px) {
  .header {
    &__top {
      padding: 12px 14px;

      grid-template-columns: 1fr auto 1fr;
      align-items: center;
    }

    &__brand {
      justify-self: start;

      font-size: 21px;
    }

    &__logo {
      justify-self: center;

      img {
        width: 32px;
        height: 32px;
      }
    }

    &__actions {
      justify-self: end;

      display: flex;
      align-items: center;
      gap: 4px;
    }

    &__cart {
      width: 40px;
      height: 40px;

      svg {
        width: 22px;
        height: 22px;
      }
    }

    &__burger {
      display: flex;

      width: 40px;
      height: 40px;
    }

    &__bottom {
      max-height: 0;

      overflow: hidden;

      opacity: 0;

      border-top: none;

      transition:
        max-height 0.3s ease,
        opacity 0.25s ease;
    }

    &__bottom--open {
      max-height: 350px;

      opacity: 1;

      border-top: 1px solid #222;
    }

    &__nav {
      width: 100%;

      padding: 8px 16px 16px;

      flex-direction: column;
      align-items: stretch;

      gap: 0;
    }

    &__link {
      width: 100%;

      padding: 14px 4px;

      border-bottom: 1px solid #2a2a2a;

      font-size: 17px;

      &::after {
        display: none;
      }

      &:last-child {
        border-bottom: none;
      }
    }
  }
}

@media (max-width: 380px) {
  .header {
    &__top {
      padding: 10px 10px;
    }

    &__brand {
      font-size: 18px;
    }

    &__logo {
      img {
        width: 28px;
        height: 28px;
      }
    }

    &__cart,
    &__burger {
      width: 36px;
      height: 36px;
    }
  }
}
</style>
