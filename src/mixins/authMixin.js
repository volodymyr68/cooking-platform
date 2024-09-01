import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { mapActions } from "pinia";
import useUserStore from "@/stores/userStore.js";
import { useDbStore } from "@/stores/dbStore.js";
export default {
    methods: {
        ...mapActions(useUserStore, ["toggleLogin", "setUID"]),
        ...mapActions(useDbStore, ["createUser"]),
        signUp(auth, email, password) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    this.setUID(user.uid);
                    this.toggleLogin();
                    this.createUser();
                    this.$router.push("/auth-content");
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorMessage);
                });
        },
        singIn(auth, email, password) {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    this.setUID(user.uid);
                    this.toggleLogin();
                    this.$router.push("/auth-content");
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorMessage);
                });
        },
        logOut(auth) {
            signOut(auth)
                .then(() => {
                    this.$router.push("/");
                    this.toggleLogin();
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
};
