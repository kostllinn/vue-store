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

    catalogProducts.value = products.value;

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
  margin: 50px auto;
  padding: 0 20px;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
  gap: 34px;
}
</style>
