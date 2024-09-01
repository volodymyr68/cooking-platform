import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import App from './App.vue';
import router from './router';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import './styles/main.css'
import useUserStore from "@/stores/userStore.js";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
};

const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);

const vuetify = createVuetify({
    components,
    directives,
});

let app;

auth.onAuthStateChanged((user) => {
    if (!app) {
        const pinia = createPinia();
        const userStore = useUserStore(pinia);

        app = createApp(App);
        app.use(pinia);
        app.use(router);
        app.use(vuetify);

        if(user){
            userStore.setUID(user.uid);
        }
        if (user) {
            userStore.setLogin();
            userStore.toggleLogin();
            console.log(userStore.isLoggedIn)
        } else {
            userStore.setLogin();
        }

        app.directive('hover', (el, binding) => {
            const opacity = binding.value || 0;
            el.addEventListener('mouseenter', () => {
                el.style.backgroundColor = `rgba(255, 255, 255, ${opacity})`;
                el.style.borderRadius = '4px';
                el.style.cursor = 'pointer';
            });
            el.addEventListener('mouseleave', () => {
                el.style.backgroundColor = '';
                el.style.borderRadius = '';
            });
        });

        app.mount('#app');
    }
});