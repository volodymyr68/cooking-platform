<script>
import { mapWritableState } from "pinia";
import useUserStore from "@/stores/userStore.js";
import formValidationMixin from "@/mixins/formValidationMixin.js";
import { auth } from "@/main.js";
import authMixin from "@/mixins/authMixin.js";

export default {
  name: "SignIn",
  mixins: [formValidationMixin, authMixin],
  computed: {
    ...mapWritableState(useUserStore, ["userStore", "email", "password"]),
  },
  methods: {
    handleSubmit() {
      this.setErrors();
      this.validateSignIn(this.email,this.password);
      if (this.isValidSignIn()) {
        this.singIn(auth, this.email, this.password);
      }
    },
  },
};
</script>

<template>
  <v-container class="sign-in-form">
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card class="pa-5" elevation="3">
          <v-card-title class="auth-title headline text-center"
          >Sign In</v-card-title
          >
          <v-card-text>
            <v-form name="signInForm" @submit.prevent="handleSubmit">
              <v-text-field
                  v-model="email"
                  label="Email"
                  type="email"
                  required
                  :error-messages="errors.emailErrors"
              />
              <v-text-field
                  v-model="password"
                  label="Password"
                  type="password"
                  required
                  :error-messages="errors.passwordErrors"
              />
              <v-btn class="auth-btn" color="primary" type="submit" block
              >Sign In</v-btn
              >
              <v-btn class="auth-btn" color="secondary" to="/" block
              >Cancel</v-btn
              >
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
