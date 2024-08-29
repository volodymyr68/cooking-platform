<script>
export default {
  name: "ProtectedMain",
  props: {
    currentView: {
      type: String,
      required: true
    }
  }
}
</script>

<template>
  <v-main class="main d-flex align-center justify-center test">
    <component :is="currentView">
      <slot :name="currentView"></slot>
    </component>
  </v-main>
</template>