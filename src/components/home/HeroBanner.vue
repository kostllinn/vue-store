<template>
  <main class="home">
    <section class="hero">
      <div class="hero__left">
        <span class="hero__subtitle"> Нова колекція Apple </span>

        <h1 class="hero__title">iPhone 17 Pro</h1>

        <p class="hero__text">
          Найпотужніший iPhone з новим дизайном, професійною камерою та неймовірною продуктивністю.
        </p>

        <div class="hero__buttons">
          <button class="hero__button hero__button--black">Купити</button>

          <button class="hero__button hero__button--white">Детальніше</button>
        </div>
      </div>

      <div class="hero__right">
        <img
          src="https://i.pinimg.com/736x/f0/77/b4/f077b414e6c83516f86bbc943e33ea5d.jpg"
          alt="iPhone 17 Pro"
        />
      </div>
    </section>

    <section class="categories">
      <div class="categories__card">
        <img src="" alt="" />

        <h3>iPhone</h3>
      </div>

      <div class="categories__card">
        <img src="" alt="" />

        <h3>MacBook</h3>
      </div>

      <div class="categories__card">
        <img src="" alt="" />

        <h3>Watch</h3>
      </div>

      <div class="categories__card">
        <img src="" alt="" />

        <h3>AirPods</h3>
      </div>

      <div class="categories__card">
        <img src="" alt="" />

        <h3>iPad</h3>
      </div>
    </section>

    <section class="products">
      <h2 class="section-title">Популярні товари</h2>
    </section>
  </main>
</template>
<style lang="scss">
.home {
  background: #fff;
}

.hero {
  max-width: 1400px;
  margin: 60px auto;

  padding: 80px;

  border-radius: 32px;

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

  max-width: 550px;

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
</style>
