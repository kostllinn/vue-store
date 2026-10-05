<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '../../stores/cart';
import { useNotificationStore } from '../../stores/notification';

const props = defineProps({
  product: Object,
});

const router = useRouter();
const cartStore = useCartStore();
const notificationStore = useNotificationStore();

const selectedColor = ref(props.product.colors?.[0] || null);
const selectedMemory = ref(props.product.memoryOptions?.[0] || null);

const price = computed(() => {
  return selectedMemory.value?.price ?? 0;
});

const configuration = computed(() => {
  const storage = selectedMemory.value?.storage;

  if (!storage) return '';

  if (typeof storage === 'number') {
    return `${storage} GB`;
  }

  return storage;
});

function openProduct() {
  router.push({
    path: `/product/${props.product.slug}`,
    query: {
      color: selectedColor.value?.name || '',
      memory: selectedMemory.value?.storage || '',
    },
  });
}

function addToCart() {
  const cartProduct = {
    id: `${props.product.slug}-${selectedColor.value?.name || 'default'}-${selectedMemory.value?.storage || 'default'}`,
    title: props.product.title,
    image: selectedColor.value?.image || '',
    color: selectedColor.value?.name || '',
    memory: selectedMemory.value?.storage || '',
    price: selectedMemory.value?.price || 0,
  };

  cartStore.addToCart(cartProduct);

  notificationStore.show('Товар додано до кошика');
}
</script>

<template>
  <div class="product-card" @click="openProduct">
    <div class="product-card__image-wrapper">
      <img class="product-card__image" :src="selectedColor?.image" :alt="product.title" />
    </div>
    <div class="product-card__options">
      <div class="product-card__colors">
        <button
          v-for="color in product.colors"
          :key="color.name"
          class="product-card__color"
          :class="{
            'product-card__color--active': selectedColor?.name === color.name,
          }"
          :style="{ background: color.code }"
          :title="color.name"
          @click.stop="selectedColor = color"
        />
      </div>
      <div class="product-card__memory">
        <template v-if="product.memoryOptions?.length > 1 && product.category !== 'airpods'">
          <button
            v-for="memory in product.memoryOptions"
            :key="memory.storage"
            class="product-card__memory-btn"
            :class="{
              'product-card__memory-btn--active': selectedMemory?.storage === memory.storage,
            }"
            @click.stop="selectedMemory = memory"
          >
            {{ memory.storage }}

            <span v-if="typeof memory.storage === 'number'"> GB </span>
          </button>
        </template>
      </div>
    </div>
    <div class="product-card__content">
      <div>
        <h2 class="product-card__title">
          {{ product.title }}
        </h2>

        <p class="product-card__info">
          <template v-if="configuration && product.category !== 'airpods'">
            {{ configuration }}
          </template>

          <template v-if="configuration && selectedColor?.name && product.category !== 'airpods'">
            •
          </template>

          <template v-if="selectedColor?.name">
            {{ selectedColor.name }}
          </template>
        </p>
      </div>

      <div class="product-card__footer">
        <div class="product-card__divider"></div>

        <p class="product-card__price">
          <span>від</span>

          {{ price.toLocaleString('uk-UA') }} ₴
        </p>

        <div class="product-card__actions">
          <button class="product-card__buy" @click.stop="openProduct">Купити</button>

          <button class="product-card__cart" title="Додати до кошика" @click.stop="addToCart">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 2.25h1.5l1.72 9.02a2.25 2.25 0 0 0 2.21 1.83h8.96a2.25 2.25 0 0 0 2.18-1.69l1.18-4.66H5.1"
              />

              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.25 18.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18 18.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />

              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 3.75v4.5M13.5 6h4.5" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.product-card {
  width: 100%;
  height: 100%;
  min-width: 0;

  padding: 24px;

  display: flex;
  flex-direction: column;

  background: #fff;

  border: 1px solid #ededed;
  border-radius: 26px;

  box-shadow: 0 5px 22px rgba(0, 0, 0, 0.05);

  cursor: pointer;

  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-5px);

    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.08);

    .product-card__image {
      transform: scale(1.035);
    }
  }

  &__image-wrapper {
    width: 100%;
    height: 290px;

    flex-shrink: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    overflow: hidden;
  }

  &__image {
    width: 100%;
    height: 100%;

    object-fit: contain;

    transition: 0.25s;
  }

  &__options {
    width: 100%;
    height: 120px;
    flex-shrink: 0;
    padding-top: 14px;
    display: flex;
    flex-direction: column;
    align-items: center;

    gap: 14px;
  }

  &__colors {
    min-height: 26px;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;

    gap: 10px;
  }

  &__color {
    width: 22px;
    height: 22px;

    padding: 0;

    border: 2px solid #fff;
    border-radius: 50%;

    box-shadow: 0 0 0 1px #dedede;

    cursor: pointer;

    transition: 0.2s;

    &:hover {
      transform: scale(1.12);
    }

    &--active {
      box-shadow: 0 0 0 2px #111;
    }
  }

  &__memory {
    min-height: 70px;

    display: flex;
    justify-content: center;
    align-content: flex-start;
    flex-wrap: wrap;

    gap: 8px;
  }

  &__memory-btn {
    min-width: 64px;
    height: 34px;

    padding: 0 12px;

    border: 1px solid #dedede;
    border-radius: 9px;

    background: #fff;
    color: #555;

    font-size: 13px;
    font-weight: 600;

    white-space: nowrap;

    cursor: pointer;

    transition: 0.2s;

    &:hover {
      border-color: #111;
      color: #111;
    }

    &--active {
      border-color: #111;

      background: #111;
      color: #fff;
    }
  }

  &__content {
    width: 100%;

    flex: 1;

    display: flex;
    flex-direction: column;
  }

  &__title {
    margin: 0 0 8px;

    color: #111;

    font-size: 22px;
    font-weight: 700;
    line-height: 1.25;
  }

  &__info {
    min-height: 22px;

    margin: 0;

    color: #8b8b8b;

    font-size: 14px;
    line-height: 1.4;
  }

  &__footer {
    margin-top: auto;
  }

  &__divider {
    width: 100%;

    margin: 20px 0;

    border-top: 1px solid #eee;
  }

  &__price {
    margin: 0 0 20px;

    color: #111;

    font-size: 28px;
    font-weight: 700;

    span {
      margin-right: 5px;

      font-size: 16px;
      font-weight: 500;
    }
  }

  &__actions {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 58px;

    gap: 10px;
  }

  &__buy {
    width: 100%;
    height: 54px;

    border: none;
    border-radius: 14px;

    background: #111;
    color: #fff;

    font-size: 16px;
    font-weight: 700;

    cursor: pointer;

    transition: 0.2s;

    &:hover {
      background: #282828;
    }

    &:active {
      transform: scale(0.98);
    }
  }

  &__cart {
    width: 58px;
    height: 54px;

    padding: 14px;

    display: flex;
    align-items: center;
    justify-content: center;

    border: 1px solid #dedede;
    border-radius: 14px;

    background: #fff;
    color: #111;

    cursor: pointer;

    transition: 0.2s;

    svg {
      width: 27px;
      height: 27px;
    }

    &:hover {
      background: #111;
      color: #fff;

      border-color: #111;
    }

    &:active {
      transform: scale(0.95);
    }
  }
}
@media (max-width: 1100px) {
  .product-card {
    padding: 20px;

    &__image-wrapper {
      height: 250px;
    }

    &__options {
      min-height: 130px;
      height: auto;
    }

    &__title {
      font-size: 20px;
    }

    &__info {
      font-size: 13px;
    }

    &__price {
      font-size: 25px;

      span {
        font-size: 14px;
      }
    }

    &__actions {
      grid-template-columns: minmax(0, 1fr) 54px;
    }

    &__buy {
      height: 50px;
      font-size: 15px;
    }

    &__cart {
      width: 54px;
      height: 50px;
      padding: 12px;
    }
  }
}

@media (max-width: 900px) {
  .product-card {
    padding: 18px;

    &__image-wrapper {
      height: 230px;
    }

    &__options {
      min-height: 125px;
    }

    &__colors {
      gap: 8px;
    }

    &__color {
      width: 21px;
      height: 21px;
    }

    &__memory {
      gap: 7px;
    }

    &__memory-btn {
      min-width: 58px;
      height: 32px;

      padding: 0 8px;

      font-size: 12px;
    }

    &__title {
      font-size: 19px;
    }

    &__info {
      font-size: 13px;
    }

    &__price {
      font-size: 24px;
    }
  }
}

@media (max-width: 800px) {
  .product-card {
    width: 100%;
    max-width: 100%;

    padding: 24px;

    border-radius: 24px;

    &__image-wrapper {
      height: 320px;
    }

    &__image {
      max-width: 300px;
      max-height: 300px;
    }

    &__options {
      min-height: 120px;
      height: auto;

      padding-top: 14px;
    }

    &__colors {
      justify-content: center;
      gap: 10px;
    }

    &__color {
      width: 23px;
      height: 23px;
    }

    &__memory {
      justify-content: center;
      gap: 8px;
    }

    &__memory-btn {
      min-width: 64px;
      height: 34px;

      padding: 0 12px;

      font-size: 13px;
    }

    &__title {
      font-size: 22px;
    }

    &__info {
      font-size: 14px;
    }

    &__divider {
      margin: 20px 0;
    }

    &__price {
      font-size: 28px;

      span {
        font-size: 15px;
      }
    }

    &__actions {
      grid-template-columns: minmax(0, 1fr) 58px;
    }

    &__buy {
      height: 54px;
      font-size: 16px;
    }

    &__cart {
      width: 58px;
      height: 54px;
      padding: 14px;
    }
  }
}

@media (max-width: 600px) {
  .product-card {
    padding: 18px;

    border-radius: 22px;

    &__image-wrapper {
      height: 280px;
    }

    &__image {
      max-width: 260px;
      max-height: 260px;
    }

    &__options {
      min-height: 110px;
    }

    &__memory-btn {
      min-width: 58px;
      height: 32px;

      padding: 0 9px;

      font-size: 12px;
    }

    &__title {
      font-size: 20px;
    }

    &__info {
      font-size: 13px;
    }

    &__price {
      font-size: 25px;
    }

    &__actions {
      grid-template-columns: minmax(0, 1fr) 52px;
    }

    &__buy {
      height: 50px;
      font-size: 15px;
    }

    &__cart {
      width: 52px;
      height: 50px;
      padding: 12px;
    }
  }
}

@media (max-width: 450px) {
  .product-card {
    padding: 16px;

    &__image-wrapper {
      height: 240px;
    }

    &__image {
      max-width: 220px;
      max-height: 220px;
    }

    &__options {
      min-height: 100px;
    }

    &__color {
      width: 21px;
      height: 21px;
    }

    &__memory {
      gap: 6px;
    }

    &__memory-btn {
      min-width: 54px;
      height: 31px;

      padding: 0 7px;

      font-size: 11px;
    }

    &__title {
      font-size: 19px;
    }

    &__info {
      font-size: 12px;
    }

    &__price {
      font-size: 23px;
    }

    &__actions {
      grid-template-columns: minmax(0, 1fr) 50px;
      gap: 8px;
    }

    &__buy {
      height: 48px;
      font-size: 14px;
    }

    &__cart {
      width: 50px;
      height: 48px;
      padding: 11px;
    }
  }
}

@media (max-width: 360px) {
  .product-card {
    padding: 14px;

    border-radius: 18px;

    &__image-wrapper {
      height: 210px;
    }

    &__image {
      max-width: 195px;
      max-height: 195px;
    }

    &__options {
      min-height: 95px;
    }

    &__color {
      width: 20px;
      height: 20px;
    }

    &__memory-btn {
      min-width: 50px;
      height: 30px;

      padding: 0 6px;

      font-size: 10px;
    }

    &__title {
      font-size: 17px;
    }

    &__info {
      font-size: 11px;
    }

    &__price {
      font-size: 21px;
    }

    &__actions {
      grid-template-columns: minmax(0, 1fr) 46px;
    }

    &__buy {
      height: 46px;
      font-size: 13px;
    }

    &__cart {
      width: 46px;
      height: 46px;
      padding: 10px;
    }
  }
}
</style>
