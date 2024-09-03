import { defineStore } from "pinia";
import useUserStore from "@/stores/userStore.js";
import {
    collection,
    addDoc,
    query as firestoreQuery,
    where,
    getDocs,
    getDoc,
} from "firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/main.js";

export const useDbStore = defineStore("dbStore", {
    state: () => ({
        forumRecords: "",
    }),
    actions: {
        async createUser() {
            const userStore = useUserStore();
            try {
                const docRef = await addDoc(collection(db, "users"), {
                    firstName: userStore.firstName,
                    lastName: userStore.lastName,
                    email: userStore.email,
                    uid: userStore.uid,
                    categories: [],
                    areas: [],
                    ingredients: [],
                    recipes: [],
                });
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        },
        async getUserById() {
            const userStore = useUserStore();
            const q = firestoreQuery(
                collection(db, "users"),
                where("uid", "==", userStore.uid),
            );

            const userSnapshot = await getDocs(q);
            userSnapshot.forEach((doc) => {
                userStore.firstName = doc.data().firstName;
                userStore.lastName = doc.data().lastName;
                userStore.email = doc.data().email;
                userStore.selectedCategories = doc.data().categories;
                userStore.selectedAreas = doc.data().areas;
                userStore.selectedIngredients = doc.data().ingredients;
                userStore.recipes = doc.data().recipes;
                userStore.id = doc.id;
            });
        },
        async updateUserById(
            categories = [],
            areas = [],
            ingredients = [],
            recipes = [],
        ) {
            const userStore = useUserStore();
            if (recipes.length === 0) {
                recipes = userStore.recipes;
            }
            const docRef = doc(db, "users", userStore.id);
            try {
                await updateDoc(docRef, {
                    firstName: userStore.firstName,
                    lastName: userStore.lastName,
                    email: userStore.email,
                    categories: categories,
                    areas: areas,
                    ingredients: ingredients,
                    recipes: recipes,
                });
                await this.getUserById();
            } catch (e) {
                console.error(e);
            }
        },
        async deleteUserRecipe(recipe) {
            const userStore = useUserStore();
            const updatedRecipes = userStore.recipes.filter(
                (item) => item.idMeal !== recipe.idMeal,
            );
            const docRef = doc(db, "users", userStore.id);
            try {
                await updateDoc(docRef, {
                    firstName: userStore.firstName,
                    lastName: userStore.lastName,
                    email: userStore.email,
                    categories: userStore.selectedCategories,
                    areas: userStore.selectedAreas,
                    ingredients: userStore.selectedIngredients,
                    recipes: updatedRecipes,
                });
                await this.getUserById();
            } catch (e) {
                console.error(e);
            }
        },
        async createForumRecord(text) {
            const userStore = useUserStore();
            try {
                const docRef = await addDoc(collection(db, "forum"), {
                    text: text,
                    time: new Date(),
                    name: userStore.firstName +" " + userStore.lastName,
                });
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        },

        async getForumRecords() {
            try {
                const querySnapshot = await getDocs(collection(db, "forum"));
                this.forumRecords = querySnapshot.docs.map((doc) => doc.data());
                this.sortForumRecordsByTime();
            } catch (e) {
                console.error("Error getting documents: ", e);
            }
        },
        sortForumRecordsByTime() {
            this.forumRecords = this.forumRecords.sort((a, b) => {
                if (a.time.seconds === b.time.seconds) {
                    return b.time.nanoseconds - a.time.nanoseconds;
                } else {
                    return b.time.seconds - a.time.seconds;
                }
            });
        },
    },
});
