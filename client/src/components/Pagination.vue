<template>
  <div class="pagination">
    <v-btn icon @click="paginate(1)" :disabled="isFirstPage">
      <v-icon> mdi-chevron-double-left </v-icon>
    </v-btn>
    <v-btn icon @click="paginate(currentPage - 1)" :disabled="isFirstPage">
      <v-icon> mdi-chevron-left </v-icon>
    </v-btn>
    <v-btn icon @click="paginate(currentPage + 1)" :disabled="isLastPage">
      <v-icon> mdi-chevron-right </v-icon>
    </v-btn>
    <v-btn icon @click="paginate(totalNumberOfPages)" :disabled="isLastPage">
      <v-icon> mdi-chevron-double-right </v-icon>
    </v-btn>
    <v-select
      :value="usersPerPage"
      :items="items"
      @change="handleSelectChange"
      solo
      class="show-pages"
    ></v-select>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    items: Array,
    paginate: Function,
    currentPage: Number,
    usersPerPage: Object,
    handleSelectChange: Function,
    totalUsers: Number
  },
  computed:{

    isFirstPage: function(){
      return this.currentPage === 1
    },
    totalNumberOfPages: function(){
      return Math.ceil(this.totalUsers / this.usersPerPage.value)
    },
    isLastPage: function(){
      return this.currentPage === this.totalNumberOfPages
    }

  }
};
</script>
