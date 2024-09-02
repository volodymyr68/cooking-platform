import { ERRORS } from "@/errors/form-errors.js";

export default {
    data() {
        return {
            errors: {
                firstNameErrors: [],
                lastNameErrors: [],
                emailErrors: [],
                passwordErrors: [],
                confirmPasswordErrors: [],
            },
        };
    },
    methods: {
        validateFirstName(name) {
            this.errors.firstNameErrors = [];
            if (name.trim().length === 0) {
                this.errors.firstNameErrors.push(ERRORS.EMPTY_NAME);
            }
            if (name.length < 3) {
                this.errors.firstNameErrors.push(ERRORS.NAME_SIZE);
            }
            if (!/^[a-zA-Z ]+$/.test(name)) {
                this.errors.firstNameErrors.push(ERRORS.NAME_FORMAT);
            }
        },
        validateLastName(name) {
            this.errors.lastNameErrors = [];
            if (name.trim().length === 0) {
                this.errors.lastNameErrors.push(ERRORS.EMPTY_NAME);
            }
            if (name.length < 3) {
                this.errors.lastNameErrors.push(ERRORS.NAME_SIZE);
            }
            if (!/^[a-zA-Z ]+$/.test(name)) {
                this.errors.lastNameErrors.push(ERRORS.NAME_FORMAT);
            }
        },
        validateEmail(email) {
            this.errors.emailErrors = [];
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                this.errors.emailErrors.push(ERRORS.EMAIL_FORMAT);
            }
        },
        validatePassword(password) {
            this.errors.passwordErrors = [];

            if (
                password.length < 8 ||
                !/[a-z]/.test(password) ||
                !/[A-Z]/.test(password) ||
                !/[0-9]/.test(password) ||
                !/[!@#$%^&*(),.?":{}|<>_\-\\[\]\/+=`~;']/.test(password)
            ) {
                this.errors.passwordErrors.push(ERRORS.PASSWORD_FORMAT);
            }
        },
        validateConfirmPassword(password, confirmPassword) {
            this.errors.confirmPasswordErrors = [];
            if (password !== confirmPassword) {
                this.errors.confirmPasswordErrors.push(ERRORS.CONFIRM_PASSWORD_MATCH);
            }
        },
        setErrors(){
            this.errors.firstNameErrors = [];
            this.errors.lastNameErrors = [];
            this.errors.emailErrors = [];
            this.errors.passwordErrors = [];
            this.errors.confirmPasswordErrors = [];
        },
        validateSignUp(firstName, lastName, email, password, confirmPassword){
            this.validateFirstName(firstName);
            this.validateLastName(lastName);
            this.validateEmail(email);
            this.validatePassword(password);
            this.validateConfirmPassword(password, confirmPassword);
        },
        isValidSignUp(){
            if (
                this.errors.firstNameErrors.length === 0 &&
                this.errors.lastNameErrors.length === 0 &&
                this.errors.emailErrors.length === 0 &&
                this.errors.passwordErrors.length === 0 &&
                this.errors.confirmPasswordErrors.length === 0
            ){
                return true;
            }
            return false;
        },
        validateSignIn(email,password){
            this.validateEmail(email);
            this.validatePassword(password);
        },
        isValidSignIn(){
            if (
                this.errors.emailErrors.length === 0 &&
                this.errors.passwordErrors.length === 0
            ){
                return true;
            }
            return false;
        }
    },
};
