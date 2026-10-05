<template>
  <footer class="footer">
    <div class="footer__container">
      <div class="footer__top">
        <!-- Лого -->
        <div class="footer__brand">
          <h2 class="footer__logo">AppleHub</h2>

          <p class="footer__description">
            Техніка Apple з офіційною гарантією. Обирайте улюблені пристрої в одному місці.
          </p>
        </div>

        <!-- Магазин -->
        <div class="footer__column">
          <h3 class="footer__title">Магазин</h3>

          <RouterLink to="/iphone"> iPhone </RouterLink>

          <RouterLink to="/ipad"> iPad </RouterLink>

          <RouterLink to="/macbook"> MacBook </RouterLink>

          <RouterLink to="/watch"> Watch </RouterLink>

          <RouterLink to="/airpods"> AirPods </RouterLink>
        </div>

        <div class="footer__column">
          <h3 class="footer__title">Контакти</h3>

          <a href="tel:+380933330333"> +38 (093) 333-03-33 </a>

          <a href="mailto:info@applestore.ua"> info@AppleHub.ua </a>

          <p>Київ, Україна</p>
        </div>
      </div>

      <div class="footer__bottom">
        <p>© 2026 AppleHub. Всі права захищені.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  margin-top: 100px;

  background: #111;
  color: white;
}

.footer__container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 70px 30px 25px;
}

.footer__top {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr;
  gap: 60px;

  padding-bottom: 60px;
}

.footer__brand {
  max-width: 350px;
}

.footer__logo {
  margin-bottom: 20px;

  font-size: 28px;
  font-weight: 800;
}

.footer__description {
  color: #999;
  line-height: 1.7;
  font-size: 15px;
}

.footer__column {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.footer__title {
  margin-bottom: 10px;

  font-size: 16px;
  font-weight: 700;
}

.footer__column a,
.footer__column p {
  color: #999;

  font-size: 15px;
  text-decoration: none;

  transition: 0.2s;
}

.footer__column a:hover {
  color: white;
}

.footer__socials {
  display: flex;
  gap: 15px;

  margin-top: 10px;
}

.footer__socials a {
  color: white;
}

.footer__bottom {
  display: flex;
  justify-content: space-between;

  padding-top: 25px;

  border-top: 1px solid #2a2a2a;

  color: #666;
  font-size: 13px;
}

@media (max-width: 900px) {
  .footer__top {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .footer__top {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .footer__bottom {
    flex-direction: column;
    gap: 10px;
  }
}
</style>
