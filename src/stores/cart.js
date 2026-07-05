import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';

export const useCartStore = defineStore('cart', () => {
  const items = ref([]);
  const isOpen = ref(false);

  const savedCart = localStorage.getItem('cart');

  if (savedCart) {
    items.value = JSON.parse(savedCart);
  }

  function openCart() {
    isOpen.value = true;
  }

  function closeCart() {
    isOpen.value = false;
  }

  function addToCart(product) {
    const existingItem = items.value.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      items.value.push({ ...product, quantity: 1 });
    }
    console.log(product.id);
    console.log(existingItem);
    openCart();
  }

  function increaseQuantity(id) {
    const existingItem = items.value.find((item) => item.id === id);
    if (existingItem) {
      existingItem.quantity++;
    }
  }

  function decreaseQuantity(id) {
    const existingItem = items.value.find((item) => item.id === id);

    if (existingItem) {
      existingItem.quantity--;
      if (existingItem.quantity === 0) {
        items.value = items.value.filter((item) => item.id !== id);
      }
    }
  }

  const totalPrice = computed(() => {
    return items.value.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  });

  function removeItem(id) {
    items.value = items.value.filter((item) => item.id !== id);
  }

  watch(
    items,
    () => {
      localStorage.setItem('cart', JSON.stringify(items.value));
    },
    {
      deep: true,
    },
  );

  return {
    items,
    isOpen,
    openCart,
    removeItem,
    closeCart,
    totalPrice,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
  };
});
