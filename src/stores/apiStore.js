import { defineStore } from "pinia";
import { axiosInstance } from "@/services/axios.js";
import useUserStore from "@/stores/userStore.js";

export const useApiStore = defineStore("apiStore", {
    state: () => ({
        categories: "",
        areas: "",
        ingredients: "",
        meals: "",
        categoryMeal: "",
        ingredientsMeal: "",
        areasMeal: "",
        mealDetails: "",
    }),
    actions: {
        async fetchCategories() {
            const response = await axiosInstance.get("list.php?c=list");
            this.categories = response.data.meals.map(category => category.strCategory);
        },
        async fetchAreas() {
            const response = await axiosInstance.get("list.php?a=list");
            this.areas = response.data.meals.map(area => area.strArea);
        },
        async fetchIngredients() {
            const response = await axiosInstance.get("list.php?i=list");
            this.ingredients = response.data.meals.map(ingredient => ingredient.strIngredient);
        },
        async fetchMealByCategory() {
            const userStore = useUserStore();
            const userCategories = userStore.selectedCategories;
            let mealList = [];
            for (const category of userCategories) {
                const response = await axiosInstance.get(`/filter.php?c=${category}`);
                mealList = [...mealList, ...response.data.meals.flat()];
            }
            this.categoryMeal = mealList;
        },
        async fetchMealByArea() {
            const userStore = useUserStore();
            const userAreas = userStore.selectedAreas;
            let mealList = [];
            for (const area of userAreas) {
                const response = await axiosInstance.get(`/filter.php?a=${area}`);
                mealList = [...mealList, ...response.data.meals.flat()];
            }
            this.areasMeal = mealList;
        },
        async fetchMealByMainIngredient() {
            const userStore = useUserStore();
            const userIngredients = userStore.selectedIngredients;
            let mealList = [];
            for (const ingredient of userIngredients) {
                const response = await axiosInstance.get(`/filter.php?i=${ingredient}`);
                mealList = [...mealList, ...response.data.meals.flat()];
            }
            this.ingredientsMeal = mealList;
        },
        async randomMeal() {
            const response = await axiosInstance.get(`/random.php`);
            this.meals = response.data.meals;
        },
        async fetchRecipeById(id){
            const response = await axiosInstance.get(`/lookup.php?i=${id}`);
            this.mealDetails = response.data.meals[0];
        }
    },
});