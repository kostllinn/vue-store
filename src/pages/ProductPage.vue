<script setup>
import { iphones } from '../data/iphones';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCartStore } from '../stores/cart';
import { useNotificationStore } from '../stores/notification';

const notificationStore = useNotificationStore();
const router = useRouter();
const cartStore = useCartStore();
function createCartProduct() {
  return {
    id: `${product.slug}-${selectedColor.value.name}-${selectedMemory.value.storage}`,
    title: product.title,
    image: selectedColor.value.image,
    color: selectedColor.value.name,
    memory: selectedMemory.value.storage,
    price: selectedMemory.value.price,
  };
}
const route = useRoute();
const product = iphones.find((iphone) => iphone.slug === route.params.slug);
const selectedColor = ref(product.colors[0]);
const selectedMemory = ref(product.memoryOptions[0]);

function addToCart() {
  cartStore.addToCart(createCartProduct());
  notificationStore.show('Товар додано до кошика');
}
function buyNow() {
  cartStore.addToCart(createCartProduct());
  router.push('/checkout');
}
</script>
<template>
  <div class="product-page">
    <div class="product-page__gallery">
      <img :src="selectedColor.image" :alt="product.title" />
    </div>

    <div class="product-page__info">
      <h1 class="product-page__title">
        {{ product.title }}
      </h1>
      <p class="product-page__price">{{ selectedMemory.price.toLocaleString() }} ₴</p>

      <div class="product-page__stock">В наличии</div>

      <div class="product-page__section">
        <h3>Цвет</h3>

        <div class="product-page__colors">
          <div class="product-page__colors">
            <button
              v-for="color in product.colors"
              :key="color.name"
              class="product-page__color"
              :class="{ 'product-page__color--active': selectedColor.name === color.name }"
              :style="{ background: color.code }"
              @click="selectedColor = color"
            />
            <p class="product-page__selected">
              Цвет: <b>{{ selectedColor.name }}</b>
            </p>
          </div>
        </div>
      </div>

      <div class="product-page__section">
        <h3>Память</h3>

        <div class="product-page__memory">
          <button
            v-for="memory in product.memoryOptions"
            :key="memory.storage"
            class="product-page__memory-btn"
            :class="{
              'product-page__memory-btn--active': selectedMemory.storage === memory.storage,
            }"
            @click="selectedMemory = memory"
          >
            {{ memory.storage }} GB
          </button>
          <p class="product-page__selected">
            Память: <b>{{ selectedMemory.storage }} GB</b>
          </p>
        </div>
      </div>

      <div class="product-page__actions">
        <button class="product-page__cart" @click="addToCart">Додати до кошика</button>

        <button class="product-page__buy" @click="buyNow">Купити</button>
      </div>

      <div class="product-page__specs">
        <h2>Характеристики</h2>

        <div class="product-page__spec">
          <span>Процесор</span>
          <strong>{{ product.specs.chip }}</strong>
        </div>

        <div class="product-page__spec">
          <span>Дисплей</span>
          <strong>{{ product.specs.display }}</strong>
        </div>

        <div class="product-page__spec">
          <span>Батарея</span>
          <strong>{{ product.specs.battery }}</strong>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.product-page {
  max-width: 1400px;
  margin: 50px auto;
  padding: 0 20px;

  display: grid;
  grid-template-columns: 1fr 480px;
  gap: 50px;

  &__gallery {
    background: #fafafa;
    border: 1px solid #ececec;
    border-radius: 24px;

    padding: 40px;

    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 100%;
      max-width: 650px;
      object-fit: contain;
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
  }

  &__title {
    font-size: 38px;
    font-weight: 700;
    color: #111;

    margin-bottom: 12px;
  }

  &__rating {
    display: flex;
    align-items: center;
    gap: 10px;

    color: #777;
    font-size: 15px;

    margin-bottom: 30px;
  }

  &__price {
    font-size: 44px;
    font-weight: 700;

    color: #111;

    margin-bottom: 10px;
  }

  &__stock {
    color: #2aa94d;
    font-weight: 600;

    margin-bottom: 35px;
  }

  &__section {
    margin-bottom: 32px;

    h3 {
      font-size: 17px;
      font-weight: 600;

      margin-bottom: 14px;
    }
  }

  &__colors {
    display: flex;
    gap: 14px;
  }

  &__color {
    width: 38px;
    height: 38px;

    border-radius: 50%;
    border: 2px solid #ddd;

    cursor: pointer;

    transition: 0.2s;

    &:hover {
      transform: scale(1.1);
      border-color: #111;
    }

    &--active {
      border-color: #111;
      transform: scale(1.1);
    }
  }

  &__memory {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  &__cart {
    flex: 1;

    height: 56px;

    border: 2px solid #111;
    border-radius: 16px;

    background: #fff;

    color: #111;

    font-size: 17px;
    font-weight: 600;

    cursor: pointer;

    transition: 0.2s;

    &:hover {
      background: #111;
      color: white;
    }
  }
  &__actions {
    display: flex;
    gap: 16px;

    margin-top: 24px;
  }

  &__cart,
  &__buy {
    flex: 1;
    height: 56px;
  }
  &__memory-btn {
    min-width: 80px;
    height: 46px;

    border: 1px solid #ddd;
    border-radius: 12px;

    background: #fff;

    cursor: pointer;

    font-size: 15px;
    font-weight: 500;

    transition: 0.2s;

    &:hover {
      border-color: #111;
    }

    &--active {
      background: #111;
      color: #fff;
      border-color: #111;
    }
  }

  &__buy {
    flex: 1;
    height: 56px;
    border: none;
    border-radius: 16px;

    background: #111;

    color: #fff;

    font-size: 18px;
    font-weight: 600;

    cursor: pointer;

    transition: 0.2s;

    &:hover {
      background: #222;
      transform: translateY(-2px);
    }

    &:active {
      transform: scale(0.98);
    }
  }
  &__favorite {
    width: 100%;
    height: 52px;

    margin-top: 14px;

    border: 1px solid #ddd;
    border-radius: 16px;

    background: #fff;

    font-size: 16px;
    font-weight: 600;

    cursor: pointer;

    transition: 0.2s;

    &:hover {
      border-color: #111;
      background: #fafafa;
    }
  }

  &__specs {
    margin-top: 50px;

    padding: 28px;

    background: #fafafa;

    border: 1px solid #ececec;
    border-radius: 22px;

    h2 {
      font-size: 24px;
      font-weight: 700;

      margin-bottom: 24px;
    }
  }

  &__spec {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 18px 0;

    border-bottom: 1px solid #e9e9e9;

    &:last-child {
      border-bottom: none;
    }

    span {
      color: #777;
    }

    strong {
      font-weight: 700;
    }
  }
}
</style>
