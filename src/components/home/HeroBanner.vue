<script setup>
import { ref, onMounted } from 'vue';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebase';
import ProductCard from '../product/ProductCard.vue';

import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

const sliderModules = [Autoplay, Pagination];

const popularProducts = ref([]);
const newProducts = ref([]);

onMounted(async () => {
  try {
    const snapshot = await getDocs(collection(db, 'products'));

    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    popularProducts.value = products
      .filter((product) => product.isAvailable)
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);

    newProducts.value = products.filter((product) => product.isNew === true).slice(0, 4);

    console.log('ВСЕ ТОВАРЫ:', products);

    console.log(
      'IS NEW:',
      products.map((product) => ({
        title: product.title,
        isNew: product.isNew,
        type: typeof product.isNew,
      })),
    );
  } catch (error) {
    console.error(error);
  }
});
</script>
<template>
  <main class="home">
    <Swiper
      :modules="sliderModules"
      :loop="true"
      :speed="800"
      :autoplay="{
        delay: 3000,
        disableOnInteraction: false,
      }"
      :pagination="{ clickable: true }"
      class="hero-swiper"
    >
      <!-- iPhone -->
      <SwiperSlide>
        <section class="hero">
          <div class="hero__left">
            <span class="hero__subtitle"> Нова колекція Apple </span>

            <h1 class="hero__title">iPhone 17 Pro</h1>

            <p class="hero__text">
              Найпотужніший iPhone з новим дизайном, професійною камерою та неймовірною
              продуктивністю.
            </p>

            <div class="hero__buttons">
              <RouterLink to="/product/iphone-17-pro" class="hero__button hero__button--black">
                Купити
              </RouterLink>
            </div>
          </div>

          <div class="hero__right">
            <img src="/src/components/home/slider-image/iphone_17-pro.png" alt="iPhone 17 Pro" />
          </div>
        </section>
      </SwiperSlide>

      <!-- MacBook -->
      <SwiperSlide>
        <section class="hero">
          <div class="hero__left">
            <span class="hero__subtitle"> Новий рівень продуктивності </span>

            <h1 class="hero__title">MacBook Air M3</h1>

            <p class="hero__text">
              Потужність для роботи, навчання та творчості у легкому сучасному корпусі.
            </p>

            <div class="hero__buttons">
              <RouterLink to="/product/macbook-air-m3" class="hero__button hero__button--black">
                Купити
              </RouterLink>
            </div>
          </div>

          <div class="hero__right">
            <img src="/src/components/home/slider-image/Mac-t.png" alt="MacBook" />
          </div>
        </section>
      </SwiperSlide>

      <!-- iPad -->
      <SwiperSlide>
        <section class="hero">
          <div class="hero__left">
            <span class="hero__subtitle"> Більше можливостей </span>

            <h1 class="hero__title">iPad Pro M4</h1>

            <p class="hero__text">
              Потужний iPad із неймовірним дисплеєм для роботи, творчості та розваг.
            </p>

            <div class="hero__buttons">
              <RouterLink to="/product/ipad-pro-m4" class="hero__button hero__button--black">
                Купити
              </RouterLink>
            </div>
          </div>

          <div class="hero__right">
            <img src="/src/components/home/slider-image/ipad-pro.png" alt="iPad Pro" />
          </div>
        </section>
      </SwiperSlide>

      <!-- AirPods -->
      <SwiperSlide>
        <section class="hero">
          <div class="hero__left">
            <span class="hero__subtitle"> Новий рівень звуку </span>

            <h1 class="hero__title">AirPods Pro 2</h1>

            <p class="hero__text">
              Чистий звук, активне шумозаглушення та ще більше комфорту щодня.
            </p>

            <div class="hero__buttons">
              <RouterLink to="/product/airpods-pro-2" class="hero__button hero__button--black">
                Купити
              </RouterLink>
            </div>
          </div>

          <div class="hero__right">
            <img src="/src/components/home/slider-image/Airpods.png" alt="AirPods Pro 2" />
          </div>
        </section>
      </SwiperSlide>
      <SwiperSlide>
        <section class="hero">
          <div class="hero__left">
            <span class="hero__subtitle"> Новий рівень можливостей </span>

            <h1 class="hero__title">Apple Watch Series 11</h1>

            <p class="hero__text">
              Стильний дизайн, розумні функції та все необхідне для активності, здоров’я й
              повсякденного використання.
            </p>

            <div class="hero__buttons">
              <RouterLink
                to="/product/apple-watch-series-11"
                class="hero__button hero__button--black"
              >
                Купити
              </RouterLink>
            </div>
          </div>

          <div class="hero__right">
            <img
              src="/src/components/home/slider-image/watch-removebg-preview.png"
              alt="Apple Watch"
            />
          </div>
        </section>
      </SwiperSlide>
    </Swiper>

    <section class="categories">
      <RouterLink to="/iphone" class="categories__card">
        <img
          src="https://i.pinimg.com/1200x/79/fc/97/79fc97f3d1327d26212835e1d7cc7991.jpg"
          alt="iPhone"
        />
        <h3>iPhone</h3>
      </RouterLink>

      <RouterLink to="/macbook" class="categories__card">
        <img
          src="https://i.pinimg.com/736x/a3/ea/9f/a3ea9f31563dae1609dda6f8485c6723.jpg"
          alt="MacBook"
        />
        <h3>MacBook</h3>
      </RouterLink>

      <RouterLink to="/watch" class="categories__card">
        <img
          src="https://i.pinimg.com/1200x/9a/36/03/9a3603193e6add051ae2baf504a723bc.jpg"
          alt="Watch"
        />
        <h3>Watch</h3>
      </RouterLink>

      <RouterLink to="/airpods" class="categories__card">
        <img
          src="https://i.pinimg.com/736x/4a/52/3f/4a523f1b80c7aa765212c4f641551395.jpg"
          alt="AirPods"
        />
        <h3>AirPods</h3>
      </RouterLink>

      <RouterLink to="/ipad" class="categories__card">
        <img
          src="https://i.pinimg.com/1200x/5b/23/53/5b2353e578f90e60f16de47b77f655b5.jpg"
          alt="iPad"
        />
        <h3>iPad</h3>
      </RouterLink>
    </section>
    <section class="products">
      <h2 class="section-title">Популярні товари</h2>

      <div class="products__grid">
        <ProductCard v-for="product in popularProducts" :key="product.id" :product="product" />
      </div>
    </section>
    <section class="promo">
      <div class="promo__content">
        <span class="promo__subtitle">AirPods</span>

        <h2 class="promo__title">AirPods Pro 2</h2>

        <p class="promo__text">
          Новий рівень звуку.<br />
          Ще більше можливостей.
        </p>

        <RouterLink to="/product/airpods-pro-2" class="promo__button"> Купити </RouterLink>
      </div>

      <div class="promo__image">
        <img src="/src/components/home/image/Airpods.png" alt="AirPods Pro 2" />
      </div>
    </section>
    <section class="products">
      <h2 class="section-title">Новинки</h2>

      <div class="products__grid">
        <ProductCard v-for="product in newProducts" :key="product.id" :product="product" />
      </div>
    </section>
  </main>
</template>
<style lang="scss">
.home {
  background: #fff;
}

.hero {
  margin: 0 auto;
  padding: 80px;
  background: #111;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;

  gap: 60px;
}

.hero__left {
  flex: 1;
}

.hero__subtitle {
  display: inline-block;
  margin-bottom: 20px;
  color: #8d8d8d;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.hero__title {
  font-size: 72px;

  font-weight: 800;

  line-height: 1.1;

  margin-bottom: 25px;
}

.hero__text {
  font-size: 20px;

  line-height: 1.8;

  color: #d4d4d4;

  max-width: 520px;

  margin-bottom: 40px;
}

.hero__buttons {
  display: flex;

  gap: 20px;
}

.hero__button {
  height: 56px;

  padding: 0 36px;

  border-radius: 16px;

  cursor: pointer;

  font-size: 17px;

  font-weight: 700;

  transition: 0.25s;
}

.hero__button--black {
  background: white;

  color: #111;

  border: none;
}

.hero__button--black:hover {
  transform: translateY(-3px);
}

.hero__button--white {
  background: transparent;

  color: white;

  border: 2px solid white;
}

.hero__button--white:hover {
  background: white;

  color: #111;
}

.hero__right {
  flex: 1;

  display: flex;

  justify-content: center;
}

.hero__right img {
  width: 100%;
  max-width: 630px;
  object-fit: contain;
}

/* ================= */

.categories {
  max-width: 1400px;

  margin: 70px auto;

  display: grid;

  grid-template-columns: repeat(5, 1fr);

  gap: 24px;
}

.categories__card {
  background: #fafafa;
  text-decoration: none;
  border-radius: 24px;

  padding: 30px;

  text-align: center;

  border: 1px solid #ececec;

  transition: 0.25s;

  cursor: pointer;
}

.categories__card:hover {
  transform: translateY(-8px);

  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
}

.categories__card img {
  width: 130px;

  height: 130px;

  object-fit: contain;

  margin-bottom: 20px;
}

.categories__card h3 {
  font-size: 22px;

  color: #111;
}

/* ================= */

.products {
  max-width: 1400px;

  margin: 70px auto;
}

.section-title {
  font-size: 42px;

  margin-bottom: 40px;

  color: #111;
}
.products__grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 24px;
}
.promo {
  max-width: 1400px;
  min-height: 320px;

  margin: 70px auto;
  padding: 50px 70px;

  border-radius: 28px;

  background: #111;
  color: white;

  display: flex;
  align-items: center;
  justify-content: space-between;

  overflow: hidden;
}

.promo__content {
  z-index: 2;
}

.promo__subtitle {
  display: block;

  margin-bottom: 10px;

  color: #999;
  font-size: 16px;
  font-weight: 600;
}

.promo__title {
  margin: 0 0 15px;

  font-size: 48px;
  font-weight: 800;
  line-height: 1.1;
}

.promo__text {
  margin: 0 0 30px;

  color: #d4d4d4;

  font-size: 20px;
  line-height: 1.5;
}

.promo__button {
  padding: 14px 32px;

  border: none;
  border-radius: 14px;

  background: white;
  color: #000;

  font-size: 16px;
  font-weight: 700;

  cursor: pointer;

  transition: 0.25s;
}

.promo__button:hover {
  transform: translateY(-3px);
}

.promo__image {
  width: 55%;
  height: 300px;

  display: flex;
  align-items: center;
  justify-content: center;
}

.promo__image img {
  width: 100%;
  height: 100%;

  object-fit: contain;

  transform: scale(1.15);
}

.hero-swiper {
  width: 100%;
  overflow: hidden;

  background: #111;
}

.hero-swiper .swiper-slide {
  width: 100%;
  height: auto;

  background: #111;
}

.hero-swiper .hero {
  width: 100%;
  min-height: 650px;

  margin: 0;
  padding: 80px 80px 85px;

  box-sizing: border-box;
}

.hero-swiper .swiper-pagination {
  bottom: 26px !important;

  display: flex;
  justify-content: center;
  align-items: center;

  gap: 9px;
}

.hero-swiper .swiper-pagination-bullet {
  width: 32px;
  height: 3px;

  margin: 0 !important;

  border-radius: 20px;

  background: rgba(255, 255, 255, 0.28);

  opacity: 1;

  transition: 0.3s;
}

.hero-swiper .swiper-pagination-bullet-active {
  width: 48px;

  background: #fff;
}

.hero-swiper .hero__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  text-decoration: none;
}

.hero-swiper .hero__right img {
  max-height: 560px;
}
/* =========================
   ПЛАНШЕТ
========================= */

@media (max-width: 1100px) {
  .hero {
    padding: 60px 40px;
    gap: 40px;
  }

  .hero__title {
    font-size: 56px;
  }

  .hero__text {
    font-size: 18px;
  }

  .hero__right img {
    max-width: 430px;
  }

  .categories {
    padding: 0 24px;
    grid-template-columns: repeat(3, 1fr);
  }

  .products {
    padding: 0 24px;
  }
  .products__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  .promo {
    margin-left: 24px;
    margin-right: 24px;

    padding: 45px 50px;
  }

  .promo__title {
    font-size: 40px;
  }
}

/* =========================
   НЕБОЛЬШОЙ ПЛАНШЕТ
========================= */

@media (max-width: 800px) {
  .hero {
    padding: 50px 28px;

    flex-direction: column;
    align-items: flex-start;

    gap: 35px;
  }

  .hero__left {
    width: 100%;
  }

  .hero__title {
    font-size: 50px;
  }

  .hero__text {
    max-width: 100%;

    font-size: 17px;
  }

  .hero__right {
    width: 100%;

    justify-content: center;
  }

  .hero__right img {
    max-width: 420px;
  }

  .categories {
    grid-template-columns: repeat(2, 1fr);

    gap: 18px;
  }

  .categories__card {
    padding: 24px;
  }

  .categories__card img {
    width: 110px;
    height: 110px;
  }

  .section-title {
    font-size: 34px;
  }

  .promo {
    padding: 40px;

    flex-direction: column;

    text-align: center;

    gap: 25px;
  }
  .products__grid {
    grid-template-columns: 1fr;
  }
  .promo__content {
    width: 100%;
  }

  .promo__image {
    width: 100%;
    height: 260px;
  }

  .promo__title {
    font-size: 38px;
  }
}

/* =========================
   ТЕЛЕФОН
========================= */

@media (max-width: 600px) {
  .hero {
    padding: 42px 18px;

    gap: 28px;
  }

  .hero__subtitle {
    margin-bottom: 14px;

    font-size: 12px;
    letter-spacing: 1.5px;
  }

  .hero__title {
    font-size: 42px;

    margin-bottom: 18px;
  }

  .hero__text {
    margin-bottom: 26px;

    font-size: 16px;
    line-height: 1.6;
  }

  .hero__button {
    width: 100%;
    height: 50px;

    padding: 0 22px;
  }

  .hero__buttons {
    width: 100%;
  }

  .hero__right img {
    max-width: 330px;
  }

  .categories {
    margin: 40px auto;
    padding: 0 16px;

    display: grid;
    grid-template-columns: 1fr;

    gap: 16px;
  }

  .categories__card {
    width: 100%;

    padding: 24px;

    display: flex;
    flex-direction: column;
    align-items: center;

    text-align: center;

    border-radius: 20px;
  }

  .categories__card img {
    width: 120px;
    height: 120px;

    object-fit: contain;

    margin-bottom: 14px;
  }

  .categories__card h3 {
    font-size: 19px;
  }

  .products {
    margin: 45px auto;

    padding: 0 16px;
  }

  .section-title {
    margin-bottom: 24px;

    font-size: 30px;
  }

  .products__grid {
    grid-template-columns: 1fr;

    gap: 18px;
  }

  .promo {
    min-height: auto;

    margin: 45px 16px;

    padding: 32px 20px;

    border-radius: 22px;
  }

  .promo__subtitle {
    font-size: 14px;
  }

  .promo__title {
    font-size: 34px;
  }

  .promo__text {
    margin-bottom: 22px;

    font-size: 17px;
  }

  .promo__button {
    width: 100%;
  }

  .promo__image {
    height: 220px;
  }

  .promo__image img {
    transform: scale(1);
  }
}

/* =========================
   МАЛЕНЬКИЙ ТЕЛЕФОН
========================= */

@media (max-width: 380px) {
  .hero {
    padding: 35px 14px;
  }

  .hero__title {
    font-size: 36px;
  }

  .hero__text {
    font-size: 15px;
  }

  .hero__right img {
    max-width: 280px;
  }

  .categories {
    padding: 0 12px;
  }

  .categories__card {
    padding: 14px 8px;
  }

  .categories__card img {
    width: 75px;
    height: 75px;
  }

  .categories__card h3 {
    font-size: 15px;
  }

  .products {
    padding: 0 12px;
  }

  .section-title {
    font-size: 27px;
  }

  .promo {
    margin-left: 12px;
    margin-right: 12px;

    padding: 28px 16px;
  }

  .promo__title {
    font-size: 30px;
  }

  .promo__image {
    height: 190px;
  }
}
</style>
