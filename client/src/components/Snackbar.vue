<template>
  <v-snackbar
    v-model="show"
    :color="status"
    fixed
    right
    shaped
    bottom
  >
    {{ message }}
  </v-snackbar>
</template>

<script>
export default {
  data: () => ({
    status: '',
    message: '',
    show: false
  }),
  created() {
    this.$EventBus.$on('showSnackbar', (message, status) => {

      this.message = message
      this.status = status
      this.show = true
    })
  }
};
</script>
