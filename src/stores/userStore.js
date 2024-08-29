import { defineStore } from "pinia";

const useUserStore = defineStore("userStore", {
    state: () => ({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        isLoggedIn: false,
        uid: "",
        selectedIngredients: [],
        selectedCategories: [],
        selectedAreas: [],
        recipes: [],
        id: "",
    }),
    getters: {
        getFullName: (state) => `${state.firstName} ${state.lastName}`,
    },
    actions: {
        setLogin() {
            this.isLoggedIn = false;
        },
        setUID(uid) {
            this.uid = uid;
        },
        setRecipes(recipe) {
            this.recipes.push(recipe);
        },
        toggleLogin() {
            this.isLoggedIn = !this.isLoggedIn;
            if (!this.isLoggedIn) {
                this.firstName = "";
                this.lastName = "";
                this.email = "";
                this.password = "";
                this.confirmPassword = "";
                this.selectedIngredients = [];
                this.selectedCategories = [];
                this.selectedAreas = [];
                this.uid = "";
            }
        },
    },
});

export default useUserStore;
