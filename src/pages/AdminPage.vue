<script setup>
import { products } from '@/data/products';
import { db } from '@/services/firebase';
import { doc, setDoc, collection } from 'firebase/firestore';
const uploadProducts = async () => {
  try {
    for (const product of products) {
      await setDoc(doc(collection(db, 'products'), product.slug), product);
    }

    alert('Все товары успешно загружены!');
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <div>
    <h1>Admin</h1>

    <button @click="uploadProducts">Загрузить товары</button>
  </div>
</template>
