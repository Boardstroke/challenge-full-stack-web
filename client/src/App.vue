<template>
  <v-app>
  <v-main>

    <!-- Provides the application the proper gutter -->
    <v-container fluid>

      <!-- If using vue-router -->
      <!-- <router-view> -->
        <IndexUsers/>
      <!-- </router-view> -->

    </v-container>
  </v-main>
  </v-app>
</template>

<script>
import IndexUsers from '@/pages/IndexUsers.vue'

export default {
  name: 'App',
  components: {
    'IndexUsers': IndexUsers
  }



};
</script>
