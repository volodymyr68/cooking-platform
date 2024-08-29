<script>
import HomeMain from "@/components/home/HomeMain.vue";
import HomeFooter from "@/components/home/HomeFooter.vue";

export default {
  name: "HomeView",
  components: { HomeFooter, HomeMain },
};
</script>

<template>
  <home-main />
  <home-footer />
</template>
