<script setup>
import { ref, onMounted } from 'vue';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase';

import ProductCard from '../components/product/ProductCard.vue';

const products = ref([]);
const catalogProducts = ref([]);

onMounted(async () => {
  try {
    const snapshot = await getDocs(collection(db, 'products'));

    products.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const catalog = [];

    products.value.forEach((product) => {
      product.memoryOptions.forEach((memory) => {
        product.colors.forEach((color) => {
          catalog.push({
            id: `${product.id}-${memory.storage}-${color.name}`,

            slug: product.slug,
            title: product.title,
            model: product.model,

            image: color.image,
            color: color.name,
            colorCode: color.code,

            memory: memory.storage,
            price: memory.price,

            originalProduct: product,
          });
        });
      });
    });

    catalogProducts.value = catalog;
    console.log(catalogProducts.value[0]);
    console.log(catalogProducts.value);
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <div class="products">
    <ProductCard v-for="product in catalogProducts" :key="product.id" :product="product" />
  </div>
</template>

<style scoped lang="scss">
.products {
  max-width: 1400px;
  margin: 40px auto;
  padding: 0 20px;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 60px;
}
</style>
