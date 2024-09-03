<script>
import { mapActions, mapState } from "pinia";
import { useDbStore } from "@/stores/dbStore.js";

export default {
  name: "Forum",
  data() {
    return {
      text: "",
    };
  },
  computed: {
    ...mapState(useDbStore, ["forumRecords"]),
  },
  methods: {
    ...mapActions(useDbStore, ["getForumRecords", "createForumRecord"]),
    addRecord() {
      this.createForumRecord({ text: this.text });
      this.text = "";
      this.getForumRecords();
    },
  },
  created() {
    this.getForumRecords();
  },
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
            <v-btn
              @click="addRecord"
              color="primary"
              :disabled="text.trim()===''"
            >
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
            <v-container class="forum-container">
              <v-row>
                <v-col
                  cols="12"
                  v-for="(record, index) in forumRecords"
                  :key="index"
                >
                  <v-card class="forum-message-card pa-3" elevation="2">
                    <v-card-title>{{ record.name }}</v-card-title>
                    <v-card-subtitle>
                      {{
                        new Date(record.time.seconds * 1000).toLocaleString()
                      }}
                    </v-card-subtitle>
                    <v-card-text class="message-text">
                      {{ record.text.text }}
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
