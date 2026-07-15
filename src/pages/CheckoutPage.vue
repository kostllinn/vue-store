<script setup>
import { useCartStore } from '../stores/cart';
import { ref } from 'vue';
const name = ref('');
const phone = ref('');
const email = ref('');
const cartStore = useCartStore();
const paymentMethod = ref('cash');
const cardNumber = ref('');
const expiryDate = ref('');
const expiryError = ref('');
const cvv = ref('');

const product = cartStore.items[0];
const errors = ref({
  name: '',
  phone: '',
  email: '',
  cardNumber: '',
  expiryDate: '',
  cvv: '',
});

function handleCardInput() {
  cardNumber.value = cardNumber.value.replace(/\D/g, '');
  if (cardNumber.value.length > 16) {
    cardNumber.value = cardNumber.value.slice(0, 16);
  }
  if (cvv.value.length > 3) {
    cvv.value = cvv.value.slice(0, 3);
  }
}

function handleExpiryInput() {
  expiryDate.value = expiryDate.value.replace(/\D/g, '');
  if (expiryDate.value.length > 5) {
    expiryDate.value = expiryDate.value.slice(0, 5);
  }

  if (expiryDate.value.length > 2 && !expiryDate.value.includes('/')) {
    expiryDate.value = expiryDate.value.slice(0, 2) + '/' + expiryDate.value.slice(2);
  }
  const month = Number(expiryDate.value.slice(0, 2));

  if (month > 12) {
    expiryDate.value = expiryDate.value.slice(0, 1);
  }
}

function handleCvvInput() {
  cvv.value = cvv.value.replace(/\D/g, '');
  if (cvv.value.length > 3) {
    cvv.value = cvv.value.slice(0, 3);
  }
}

function submitOrder() {
  // Очищаем все ошибки
  errors.value = {
    name: '',
    phone: '',
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  };

  if (name.value.trim() === '') {
    errors.value.name = "Введіть ім'я";
    return;
  }

  if (phone.value.trim() === '' && email.value.trim() === '') {
    errors.value.phone = 'Введіть номер телефону або Email';
    errors.value.email = 'Введіть номер телефону або Email';
    return;
  }

  if (paymentMethod.value === 'card') {
    if (cardNumber.value.length < 16) {
      errors.value.cardNumber = 'Номер картки повинен містити 16 цифр';
      return;
    }

    if (expiryDate.value.length < 5) {
      errors.value.expiryDate = 'Введіть правильний термін дії картки';
      return;
    }

    if (cvv.value.length < 3) {
      errors.value.cvv = 'CVV повинен містити 3 цифри';
      return;
    }
  }

  alert('✅ Замовлення успішно оформлено!');
}
</script>

<template>
  <div class="checkout">
    <div class="checkout__left">
      <h1 class="checkout__page-title">Оформлення замовлення</h1>

      <div class="checkout__card">
        <h2 class="checkout__title">Контактні дані</h2>

        <div class="checkout__field">
          <p class="checkout__label">Ім'я</p>
          <input
            v-model="name"
            class="checkout__input"
            type="text"
            placeholder=" Введіть ваше ім'я"
          />
          <p v-if="errors.name" class="checkout__error">
            {{ errors.name }}
          </p>
        </div>

        <div class="checkout__field">
          <p class="checkout__label">Телефон</p>
          <input v-model="phone" class="checkout__input" type="tel" placeholder="+380" />
          <p v-if="errors.phone" class="checkout__error">
            {{ errors.phone }}
          </p>
        </div>

        <div class="checkout__field">
          <p class="checkout__label">Email</p>
          <input v-model="email" class="checkout__input" type="email" placeholder="Email" />
          <p v-if="errors.email" class="checkout__error">
            {{ errors.email }}
          </p>
        </div>
      </div>

      <div class="checkout__card">
        <h2 class="checkout__title">Спосіб оплати</h2>

        <div class="checkout__payment">
          <label class="checkout__payment-item">
            <input type="radio" name="payment" value="cash" v-model="paymentMethod" />

            <div>
              <h4>Оплата при отриманні</h4>
              <p>Готівкою або карткою після отримання товару.</p>
            </div>
          </label>

          <label class="checkout__payment-item">
            <input type="radio" name="payment" value="card" v-model="paymentMethod" />

            <div>
              <h4>Оплата карткою</h4>
              <p>Visa / MasterCard будь-якого банку.</p>
            </div>
          </label>
        </div>
      </div>

      <div class="checkout__card" v-if="paymentMethod === 'card'">
        <h2 class="checkout__title">Дані картки</h2>

        <div class="checkout__field">
          <p class="checkout__label">Номер картки</p>

          <div class="checkout__input-wrapper">
            <input
              @input="handleCardInput"
              v-model="cardNumber"
              class="checkout__input"
              type="text"
              inputmode="numeric"
              placeholder="0000 0000 0000 0000"
            />
            <p v-if="errors.cardNumber" class="checkout__error">
              {{ errors.cardNumber }}
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="checkout__input-icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
              />
            </svg>
          </div>
        </div>

        <div class="checkout__row">
          <div class="checkout__field">
            <p class="checkout__label">Термін дії</p>
            <div class="checkout__input-wrapper">
              <input
                @input="handleExpiryInput"
                v-model="expiryDate"
                inputmode="numeric"
                class="checkout__input"
                placeholder="MM / YY"
              />
              <p v-if="errors.expiryDate" class="checkout__error">
                {{ errors.expiryDate }}
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="checkout__input-icon"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                />
              </svg>
            </div>
          </div>

          <div class="checkout__field">
            <p class="checkout__label">CVV</p>
            <div class="checkout__input-wrapper">
              <input
                @input="handleCvvInput"
                v-model="cvv"
                inputmode="numeric"
                class="checkout__input"
                placeholder="CVV"
              />
              <p v-if="errors.cvv" class="checkout__error">
                {{ errors.cvv }}
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="checkout__input-icon"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="checkout__right">
      <div class="checkout__summary">
        <h2 class="checkout__title">Ваше замовлення</h2>

        <div class="checkout__product">
          <img class="checkout__image" :src="product.image" :alt="product.title" />

          <div>
            <div class="checkout__name">{{ product.title }}</div>

            <div class="checkout__color">{{ product.color }}</div>

            <div class="checkout__memory">{{ product.memory }}</div>
          </div>

          <div class="checkout__price">{{ product.price }}</div>
        </div>

        <div class="checkout__total">
          <span>Разом:</span>

          <span class="checkout__total-price"> 59 999 ₴ </span>
        </div>

        <button @click="submitOrder" class="checkout__button">Підтвердити замовлення</button>

        <div class="checkout__secure">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="checkout__secure-icon"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
            />
          </svg>

          <span>Безпечна оплата</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
*,
*::before,
*::after {
  box-sizing: border-box;
}

.checkout {
  max-width: 1440px;
  margin: 60px auto;
  padding: 0 24px;

  display: grid;
  grid-template-columns: minmax(0, 1fr) 420px;

  gap: 32px;

  align-items: start;
}

.checkout__page-title {
  margin-bottom: 32px;
}

.checkout__right {
  align-self: start;
  margin-top: 78px;
}

.checkout__summary {
  position: sticky;
  top: 60px;
}
.checkout__page-title {
  font-size: 42px;
  font-weight: 700;
  color: #111;
  margin-bottom: 10px;
}

.checkout__card,
.checkout__summary {
  background: #fff;
  border: 1px solid #ececec;
  border-radius: 28px;
  padding: 32px;

  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.05);
}

.checkout__error {
  margin-top: 6px;
  color: #e53935;
  font-size: 13px;
}
.checkout__title {
  font-size: 26px;
  font-weight: 700;
  color: #111;

  margin-bottom: 28px;
}

.checkout__field {
  width: 100%;
  margin-bottom: 18px;
}

.checkout__input {
  width: 100%;
  height: 58px;

  padding: 0 20px;

  border: 1px solid #d9d9d9;
  border-radius: 16px;

  background: white;

  font-size: 16px;

  transition: 0.25s;

  &:focus {
    outline: none;

    border-color: #111;

    box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.05);
  }
}

.checkout__row {
  display: flex;
  gap: 16px;
}

.checkout__row .checkout__field {
  flex: 1;
  margin-bottom: 0;
}
.checkout__label {
  margin-bottom: 10px;

  font-size: 15px;
  font-weight: 500;

  color: #6e6e73;
}
.checkout__payment {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.checkout__input-wrapper {
  position: relative;
}

.checkout__input {
  width: 100%;
  padding-right: 52px; // место для иконки
}

.checkout__input-icon {
  position: absolute;
  top: 50%;
  right: 18px;
  transform: translateY(-50%);
  max-width: 22px;
  max-height: 22px;

  color: #8a8a8a;

  pointer-events: none;
}
.checkout__payment-item {
  display: flex;
  align-items: center;
  gap: 14px;

  padding: 14px 18px;

  border: 1px solid #e5e5e5;
  border-radius: 16px;

  cursor: pointer;

  transition: 0.2s;

  &:hover {
    border-color: #111;
  }

  input {
    margin: 0;
    width: 18px;
    height: 18px;
  }

  h4 {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    color: #111;
  }

  p {
    margin-top: 4px;
    font-size: 13px;
    color: #777;
    line-height: 1.4;
  }
}

&:hover {
  border-color: #111;
}

.checkout__summary {
  display: flex;
  flex-direction: column;
}

.checkout__product {
  display: flex;
  align-items: center;
  gap: 18px;

  padding-bottom: 28px;

  border-bottom: 1px solid #ececec;
}

.checkout__image {
  width: 90px;
  height: 90px;

  border-radius: 18px;

  background: #f8f8f8;

  object-fit: contain;
}

.checkout__name {
  font-size: 22px;
  font-weight: 700;

  color: #111;
}

.checkout__color,
.checkout__memory {
  margin-top: 6px;

  color: #777;
}

.checkout__price {
  margin-left: auto;

  font-size: 24px;
  font-weight: 700;

  color: #111;
}

.checkout__total {
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin: 30px 0;

  font-size: 25px;
  font-weight: 600;
}

.checkout__total-price {
  font-size: 38px;
  font-weight: 700;

  color: #111;
}

.checkout__button {
  width: 100%;
  height: 60px;

  border: none;
  border-radius: 18px;

  background: #111;
  color: white;

  font-size: 17px;
  font-weight: 600;

  cursor: pointer;

  transition: 0.25s;

  &:hover {
    background: #2b2b2b;
    transform: translateY(-2px);
  }

  &:active {
    transform: scale(0.98);
  }
}

.checkout__secure {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;

  margin-top: 20px;

  color: #6e6e73;
  font-size: 15px;
}

.checkout__secure-icon {
  width: 20px;
  height: 20px;

  color: #6e6e73;
}

.checkout__advantage {
  display: flex;
  align-items: center;
  gap: 14px;

  color: #666;

  font-size: 15px;
}

@media (max-width: 1100px) {
  .checkout {
    grid-template-columns: 1fr;
  }

  .checkout__right {
    position: static;
  }
}

@media (max-width: 700px) {
  .checkout {
    padding: 0 16px;
  }

  .checkout__card,
  .checkout__summary {
    padding: 24px;
  }

  .checkout__row {
    flex-direction: column;
  }

  .checkout__page-title {
    font-size: 34px;
  }

  .checkout__total-price {
    font-size: 30px;
  }
}
</style>
