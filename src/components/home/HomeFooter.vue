<script>
import "../../styles/home/home-footer.css";
export default {
  name: "HomeFooter",
};
</script>

<template>
  <v-footer class="footer" padless>
    <v-col class="text-center" cols="12">
      <v-container>
        <v-row>
          <v-col>
            <h2 class="footer-title">Free Recipe API Support</h2>
            <p class="footer-text">
              The API and site will always remain free at point of access. If
              you love our service and want extra features, you can sign up as a
              PayPal supporter. You can cancel anytime. This allows us to pay
              for the servers and bandwidth and develop new features.
            </p>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <h3 class="footer-subtitle">Test API Keys</h3>
            <p class="footer-text">
              You can use the test API key "1" during development of your app or
              for educational use (see test links below). However, you must
              become a supporter if releasing publicly on an app store. All data
              is returned in JSON format. We recommend using the JSON View
              Chrome extension to view the data in your web browser.
            </p>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <h3 class="footer-subtitle">API Production Key Upgrade</h3>
            <p class="footer-text">
              All supporters have access to the beta version of the API, which
              allows multiple ingredient filters. You also get access to adding
              your own meals and images. You can also list the full database
              rather than being limited to 100 items. Please sign up on PayPal
              and we will email you the upgrade.
            </p>
          </v-col>
        </v-row>
      </v-container>
      <v-divider></v-divider>
      <p class="footer-bottom-text">
        &copy; 2024 Culinary Inspirations. All rights reserved.
      </p>
    </v-col>
  </v-footer>
</template>
