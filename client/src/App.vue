<template>
<!-- App.vue -->

<v-app>

  <!-- Sizes your content based upon application components -->
  <v-main>

    <!-- Provides the application the proper gutter -->
    <v-container fluid>

      <!-- If using vue-router -->
      <router-view></router-view>
    </v-container>
  </v-main>
  <Snackbar/>
  <v-footer app class="footer">
    <small>Criado por Matheus Fachini</small>
    <small><a href="https://github.com/Boardstroke/" target="_blank"><v-icon left> mdi-github </v-icon> Boardstroke</a></small>
  </v-footer>
</v-app>

</template>


<script>
export default {
  name: "App",
};
</script>
