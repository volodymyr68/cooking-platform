<script>
export default {
  name: "NotFound",
};
</script>

<template>
  <v-container class="fill-height d-flex align-center justify-center test">
    <v-row>
      <v-col cols="12" class="text-center">
        <v-card class="pa-10" elevation="10">
          <v-card-title>
            <v-icon large color="red">mdi-alert-circle-outline</v-icon>
            <span class="ml-4" style="font-size: 2rem">Page Not Found</span>
          </v-card-title>
          <v-card-text>
            <p>The page you're looking for doesn't exist.</p>
            <v-btn color="primary" @click="$router.push('/')"> Go Home </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
