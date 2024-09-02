<script>
export default {
  name: "ProtectedNavigation",
  methods: {
    selectView(view) {
      this.$emit("update-view", view);
    },
  },
};
</script>

<template>
  <v-navigation-drawer floating permanent>
    <v-list density="compact" nav>
      <v-list-item
        prepend-icon="mdi-view-dashboard"
        title="Profile"
        @click="selectView('Profile')"
      >
      </v-list-item>
      <v-list-item
        prepend-icon="mdi-RecipeFeed"
        title="Recipe Feed"
        @click="selectView('RecipeFeed')"
      >
      </v-list-item>
      <v-list-item
        prepend-icon="mdi-forum"
        title="Forum"
        @click="selectView('Forum')"
      >
      </v-list-item>
      <v-list-item
        prepend-icon="mdi-random"
        title="Random meal"
        @click="selectView('RandMeal')"
      >
      </v-list-item>
      <v-list-item
        prepend-icon="mdi-recipe"
        title="My recipes"
        @click="selectView('Recipes')"
      >
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
