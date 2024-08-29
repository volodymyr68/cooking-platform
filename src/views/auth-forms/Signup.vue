<script>
import "../../styles/auth/auth.css";
import {mapState, mapWritableState} from "pinia";
import useUserStore from "@/stores/userStore.js";
import formValidationMixin from "@/mixins/formValidationMixin.js";
import {auth} from "@/main.js";
import authMixin from "@/mixins/authMixin.js";

export default {
  name: "SignUp",
  mixins: [formValidationMixin,authMixin],
  computed: {
    ...mapWritableState(useUserStore, [
      "userStore",
      "firstName",
      "lastName",
      "email",
      "password",
      "confirmPassword",
    ]),
    ...mapState(useUserStore,["getFullName"])
  },
  methods: {
      handleSubmit() {
      this.errors.firstNameErrors = [];
      this.errors.lastNameErrors = [];
      this.errors.emailErrors = [];
      this.errors.passwordErrors = [];
      this.errors.confirmPasswordErrors = [];

      this.validateFirstName(this.firstName);
      this.validateLastName(this.lastName);
      this.validateEmail(this.email);
      this.validatePassword(this.password);
      this.validateConfirmPassword(this.password, this.confirmPassword);

      if (
          this.errors.firstNameErrors.length === 0 &&
          this.errors.lastNameErrors.length === 0 &&
          this.errors.emailErrors.length === 0 &&
          this.errors.passwordErrors.length === 0 &&
          this.errors.confirmPasswordErrors.length === 0
      ) {
         this.signUp(auth,this.email,this.password);
         // this.createUser(localStorage.getItem("userId"),this.firstName,this.email,this.password);
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
          <v-card-title class="headline text-center">Sign Up</v-card-title>
          <v-card-text>
            <v-form name="signInForm" @submit.prevent="handleSubmit">
              <v-text-field
                  v-model="firstName"
                  label="First Name"
                  required
                  :error-messages="errors.firstNameErrors"
              />
              <v-text-field
                  v-model="lastName"
                  label="Last Name"
                  required
                  :error-messages="errors.lastNameErrors"
              />
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
              <v-text-field
                  v-model="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  required
                  :error-messages="errors.confirmPasswordErrors"
              />
              <v-btn class="auth-btn" color="primary" type="submit" block>Sign Up</v-btn>
              <v-btn color="secondary" to="/" block>Cancel</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>