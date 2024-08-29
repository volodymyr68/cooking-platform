<script>
import { mapActions, mapState } from "pinia";
import { useDbStore } from "@/stores/dbStore.js";

export default {
  name: "Forum",
  data() {
    return {
      text: ""
    };
  },
  computed: {
    ...mapState(useDbStore, ["forumRecords"])
  },
  methods: {
    ...mapActions(useDbStore, ["getForumRecords", "createForumRecord"]),
    addRecord() {
      this.createForumRecord({ text: this.text });
      this.text = "";
      this.getForumRecords();
    }
  },
  created() {
    this.getForumRecords();
  }
};
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="pa-5">
          <v-card-title>Welcome to the Forum!</v-card-title>
          <v-card-text>
            <v-text-field
                v-model="text"
                label="Enter your message"
                outlined
                dense
            ></v-text-field>
            <v-btn @click="addRecord" color="primary" :disabled="!text">
              Create Record
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card class="pa-5">
          <v-card-title>Forum Records</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item v-for="(record, index) in forumRecords" :key="index">
                  <v-list-item-title>{{ record.text.text }}</v-list-item-title>
                  <v-list-item-subtitle>{{ new Date(record.time.seconds * 1000).toLocaleString() }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
</style>