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
                    this.$notify({
                        title: "Signup successfully",
                        duration: 3000,
                        type: "success",
                      });
                    const user = userCredential.user;
                    this.setUID(user.uid);
                    this.toggleLogin();
                    this.createUser();
                    this.$router.push("/auth-content");
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    this.$notify({
                        title: "Error while signup",
                        text:errorMessage,
                        duration: 3000,
                        type: "error",
                      });
                });
        },
        singIn(auth, email, password) {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    this.$notify({
                        title: "Signin successfully",
                        duration: 3000,
                        type: "success",
                      });
                    const user = userCredential.user;
                    this.setUID(user.uid);
                    this.toggleLogin();
                    this.$router.push("/auth-content");
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    this.$notify({
                        title: "Error while signin",
                        text:errorMessage,
                        duration: 3000,
                        type: "error",
                      });
                });
        },
        logOut(auth) {
            signOut(auth)
                .then(() => {
                    this.$notify({
                        title: "Logout",
                        duration: 3000,
                        type: "warn",
                      });
                    this.$router.push("/");
                    this.toggleLogin();
                })
                .catch((error) => {
                    console.error(error);
                });
        },
    },
};
