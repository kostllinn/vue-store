import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC74Jh47UqOGDbgarTi-q1BwrSdFqABWUA',
  authDomain: 'vue-store-49c8a.firebaseapp.com',
  projectId: 'vue-store-49c8a',
  storageBucket: 'vue-store-49c8a.firebasestorage.app',
  messagingSenderId: '536242402901',
  appId: '1:536242402901:web:43cbd8f9904ebf722706dc',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
