<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../services/firebase';

import { useCartStore } from '../stores/cart';
import { useNotificationStore } from '../stores/notification';

const route = useRoute();
const router = useRouter();

const cartStore = useCartStore();
const notificationStore = useNotificationStore();

const product = ref(null);
const selectedColor = ref(null);
const selectedMemory = ref(null);

const loading = ref(true);

onMounted(async () => {
  try {
    const productRef = doc(db, 'products', route.params.slug);
    const snapshot = await getDoc(productRef);

    if (!snapshot.exists()) {
      console.error('Товар не найден');
      return;
    }

    product.value = {
      id: snapshot.id,
      ...snapshot.data(),
    };
    const colorFromQuery = route.query.color;
    const memoryFromQuery = route.query.memory;

    selectedColor.value =
      product.value.colors?.find((color) => color.name === colorFromQuery) ||
      product.value.colors?.[0] ||
      null;

    selectedMemory.value =
      product.value.memoryOptions?.find(
        (memory) => String(memory.storage) === String(memoryFromQuery),
      ) ||
      product.value.memoryOptions?.[0] ||
      null;
  } catch (error) {
    console.error('Ошибка загрузки товара:', error);
  } finally {
    loading.value = false;
  }
});

function createCartProduct() {
  return {
    id: `${product.value.slug}-${selectedColor.value?.name || 'default'}-${selectedMemory.value?.storage || 'default'}`,

    title: product.value.title,

    image: selectedColor.value?.image || '',

    color: selectedColor.value?.name || '',

    memory: selectedMemory.value?.storage || '',

    price: selectedMemory.value?.price || 0,
  };
}

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
  <div v-if="loading" class="product-page-loading">Завантаження товару...</div>

  <div v-else-if="!product" class="product-page-error">
    <h2>Товар не знайдено</h2>

    <button @click="router.back()">Повернутися назад</button>
  </div>

  <div v-else class="product-page">
    <!-- Зображення -->
    <div class="product-page__gallery">
      <img v-if="selectedColor" :src="selectedColor.image" :alt="product.title" />

      <img v-else src="" :alt="product.title" />
    </div>

    <!-- Інформація -->
    <div class="product-page__info">
      <h1 class="product-page__title">
        {{ product.title }}
      </h1>

      <p v-if="selectedMemory" class="product-page__price">
        {{ selectedMemory.price?.toLocaleString() }} ₴
      </p>

      <div class="product-page__stock">
        {{ product.isAvailable !== false ? 'В наявності' : 'Немає в наявності' }}
      </div>

      <!-- Кольори -->
      <div v-if="product.colors?.length" class="product-page__section">
        <h3>Колір</h3>

        <div class="product-page__colors">
          <button
            v-for="color in product.colors"
            :key="color.name"
            class="product-page__color"
            :class="{
              'product-page__color--active': selectedColor?.name === color.name,
            }"
            :style="{ background: color.code }"
            :title="color.name"
            @click="selectedColor = color"
          />
        </div>

        <p class="product-page__selected">
          Колір:
          <b>{{ selectedColor?.name }}</b>
        </p>
      </div>

      <!-- Пам'ять -->
      <div
        v-if="product.memoryOptions?.length && product.category !== 'airpods'"
        class="product-page__section"
      >
        <h3>Пам'ять</h3>

        <div class="product-page__memory">
          <button
            v-for="memory in product.memoryOptions"
            :key="memory.storage"
            class="product-page__memory-btn"
            :class="{
              'product-page__memory-btn--active': selectedMemory?.storage === memory.storage,
            }"
            @click="selectedMemory = memory"
          >
            {{ memory.storage }}
          </button>
        </div>

        <p class="product-page__selected">
          Пам'ять:
          <b>{{ selectedMemory?.storage }}</b>
        </p>
      </div>

      <!-- Кнопки -->
      <div class="product-page__actions">
        <button
          class="product-page__cart"
          :disabled="product.isAvailable === false"
          @click="addToCart"
        >
          Додати до кошика
        </button>

        <button class="product-page__buy" :disabled="product.isAvailable === false" @click="buyNow">
          Купити
        </button>
      </div>

      <!-- Характеристики -->
      <div class="product-page__specs">
        <h2>Характеристики</h2>

        <!-- iPhone -->
        <template v-if="product.category === 'iphone'">
          <div class="product-page__spec">
            <span>Процесор</span>
            <strong>{{ product.specs?.chip }}</strong>
          </div>

          <div class="product-page__spec">
            <span>Дисплей</span>
            <strong>{{ product.specs?.display }}</strong>
          </div>

          <div class="product-page__spec">
            <span>Батарея</span>
            <strong>{{ product.specs?.battery }}</strong>
          </div>
        </template>

        <!-- MacBook -->
        <template v-else-if="product.category === 'macbook'">
          <div class="product-page__spec">
            <span>Екран</span>
            <strong>{{ product.macbookSpecs?.screen }}</strong>
          </div>

          <div class="product-page__spec">
            <span>Процесор</span>
            <strong>{{ product.macbookSpecs?.chip }}</strong>
          </div>

          <div class="product-page__spec">
            <span>Оперативна пам'ять</span>
            <strong>{{ product.macbookSpecs?.ram }}</strong>
          </div>

          <div class="product-page__spec">
            <span>Відеокарта</span>
            <strong>{{ product.macbookSpecs?.gpu }}</strong>
          </div>

          <div class="product-page__spec">
            <span>Батарея</span>
            <strong>{{ product.macbookSpecs?.battery }}</strong>
          </div>
        </template>

        <!-- iPad -->
        <template v-else-if="product.category === 'ipad'">
          <div class="product-page__spec">
            <span>Екран</span>
            <strong>{{ product.ipadSpecs?.screen }}</strong>
          </div>

          <div class="product-page__spec">
            <span>Процесор</span>
            <strong>{{ product.ipadSpecs?.chip }}</strong>
          </div>

          <div class="product-page__spec">
            <span>Apple Pencil</span>
            <strong>{{ product.ipadSpecs?.pencil }}</strong>
          </div>

          <div class="product-page__spec">
            <span>Батарея</span>
            <strong>{{ product.ipadSpecs?.battery }}</strong>
          </div>
        </template>

        <!-- Watch -->
        <template v-else-if="product.category === 'watch'">
          <div class="product-page__spec">
            <span>Екран</span>
            <strong>{{ product.watchSpecs?.screen }}</strong>
          </div>

          <div class="product-page__spec">
            <span>Процесор</span>
            <strong>{{ product.watchSpecs?.chip }}</strong>
          </div>

          <div class="product-page__spec">
            <span>Батарея</span>
            <strong>{{ product.watchSpecs?.battery }}</strong>
          </div>

          <div class="product-page__spec">
            <span>Матеріал</span>
            <strong>{{ product.watchSpecs?.material }}</strong>
          </div>
        </template>

        <!-- AirPods -->
        <template v-else-if="product.category === 'airpods'">
          <div class="product-page__spec">
            <span>Чип</span>
            <strong>{{ product.airpodsSpecs?.chip }}</strong>
          </div>

          <div class="product-page__spec">
            <span>Батарея</span>
            <strong>{{ product.airpodsSpecs?.battery }}</strong>
          </div>

          <div class="product-page__spec">
            <span>Шумозаглушення</span>
            <strong>{{ product.airpodsSpecs?.noiseCancellation }}</strong>
          </div>
        </template>
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
/* =========================
   ПЛАНШЕТ
========================= */

@media (max-width: 1000px) {
  .product-page {
    grid-template-columns: 1fr 400px;
    gap: 32px;

    &__gallery {
      padding: 25px;

      img {
        max-width: 520px;
      }
    }

    &__title {
      font-size: 32px;
    }

    &__price {
      font-size: 38px;
    }

    &__specs {
      padding: 24px;
    }
  }
}

/* =========================
   НЕБОЛЬШОЙ ПЛАНШЕТ
========================= */

@media (max-width: 800px) {
  .product-page {
    max-width: 700px;

    margin: 30px auto;
    padding: 0 20px;

    grid-template-columns: 1fr;
    gap: 30px;

    &__gallery {
      width: 100%;

      padding: 20px;

      img {
        width: 100%;
        max-width: 480px;
        max-height: 480px;
      }
    }

    &__info {
      width: 100%;
    }

    &__title {
      font-size: 32px;
    }

    &__price {
      font-size: 36px;
    }

    &__stock {
      margin-bottom: 28px;
    }

    &__specs {
      margin-top: 35px;
    }
  }
}

/* =========================
   ТЕЛЕФОН
========================= */

@media (max-width: 600px) {
  .product-page {
    width: 100%;

    margin: 20px auto;

    padding: 0 14px;

    gap: 22px;

    &__gallery {
      min-height: 300px;

      padding: 10px;

      img {
        width: 100%;
        max-width: 330px;
        max-height: 330px;

        object-fit: contain;
      }
    }

    &__title {
      margin-bottom: 10px;

      font-size: 28px;
      line-height: 1.2;
    }

    &__price {
      margin-bottom: 8px;

      font-size: 32px;
    }

    &__stock {
      margin-bottom: 25px;

      font-size: 14px;
    }

    &__section {
      margin-bottom: 24px;

      h3 {
        margin-bottom: 12px;

        font-size: 16px;
      }
    }

    /* Цвета */

    &__colors {
      gap: 12px;

      flex-wrap: wrap;
    }

    &__color {
      width: 34px;
      height: 34px;
    }

    &__selected {
      margin-top: 12px;

      font-size: 14px;
    }

    /* Память */

    &__memory {
      gap: 8px;
    }

    &__memory-btn {
      min-width: 70px;
      height: 42px;

      padding: 0 12px;

      font-size: 14px;
    }

    /* Кнопки */

    &__actions {
      margin-top: 18px;

      flex-direction: column;

      gap: 10px;
    }

    &__cart,
    &__buy {
      width: 100%;
      height: 52px;

      flex: none;

      border-radius: 14px;

      font-size: 16px;
    }

    /* Характеристики */

    &__specs {
      margin-top: 32px;

      padding: 20px 16px;

      border-radius: 18px;

      h2 {
        margin-bottom: 16px;

        font-size: 21px;
      }
    }

    &__spec {
      padding: 14px 0;

      gap: 15px;

      span {
        flex: 1;

        font-size: 14px;
      }

      strong {
        flex: 1;

        text-align: right;

        font-size: 14px;

        overflow-wrap: anywhere;
      }
    }
  }

  .product-page-loading,
  .product-page-error {
    padding: 40px 16px;

    text-align: center;
  }
}

/* =========================
   МАЛЕНЬКИЙ ТЕЛЕФОН
========================= */

@media (max-width: 380px) {
  .product-page {
    padding: 0 10px;

    &__gallery {
      min-height: 260px;

      img {
        max-width: 280px;
        max-height: 280px;
      }
    }

    &__title {
      font-size: 25px;
    }

    &__price {
      font-size: 29px;
    }

    &__memory-btn {
      min-width: 64px;

      padding: 0 9px;

      font-size: 13px;
    }

    &__specs {
      padding: 18px 13px;
    }

    &__spec {
      align-items: flex-start;

      span,
      strong {
        font-size: 13px;
      }
    }
  }
}
</style>
