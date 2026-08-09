import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useNotificationStore = defineStore('notification', () => {
  const visible = ref(false);
  const title = ref('');
  const message = ref('');
  const type = ref('success');

  function show(titleText, messageText = '', notificationType = 'success') {
    title.value = titleText;
    message.value = messageText;
    type.value = notificationType;

    visible.value = true;

    setTimeout(() => {
      visible.value = false;
    }, 3000);
  }

  function close() {
    visible.value = false;
  }

  return {
    visible,
    title,
    message,
    type,
    show,
    close,
  };
});
