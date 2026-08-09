<script setup>
defineProps({
  title: String,
  message: String,
  type: {
    type: String,
    default: 'success',
  },
});

const emit = defineEmits(['close']);
</script>

<template>
  <div class="notification" :class="`notification--${type}`">
    <button class="notification__close" @click="emit('close')">✕</button>

    <div class="notification__content">
      <div class="notification__icon">
        {{ type === 'success' ? '✅' : '❌' }}
      </div>

      <div>
        <h3 class="notification__title">
          {{ title }}
        </h3>

        <p v-if="message" class="notification__message">
          {{ message }}
        </p>
      </div>
    </div>

    <div class="notification__progress"></div>
  </div>
</template>

<style scoped lang="scss">
.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 400px;
  padding: 20px 40px;

  border-radius: 16px;

  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.9);

  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);

  overflow: hidden;

  animation: show 0.3s ease;
  z-index: 9999;
  &__content {
    display: flex;
    gap: 14px;
    align-items: flex-start;
  }

  &__icon {
    font-size: 24px;
  }

  &__title {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: #111827;
  }

  &__message {
    margin-top: 6px;
    font-size: 16px;
    color: #6b7280;
  }

  &__close {
    position: absolute;
    top: 12px;
    right: 12px;

    border: none;
    background: none;

    cursor: pointer;

    font-size: 16px;

    color: #9ca3af;

    transition: 0.2s;

    &:hover {
      color: #111827;
    }
  }

  &__progress {
    position: absolute;
    left: 0;
    bottom: 0;

    height: 4px;
    width: 100%;

    animation: progress 3s linear forwards;
  }

  &--success {
    .notification__progress {
      background: #22c55e;
    }
  }

  &--error {
    .notification__progress {
      background: #ef4444;
    }
  }
}

@keyframes progress {
  from {
    width: 100%;
  }

  to {
    width: 0%;
  }
}

@keyframes show {
  from {
    transform: translateY(-30px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
