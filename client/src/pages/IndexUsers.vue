<template>
  <v-container class="indexUsers">
    <header>
      <h2>Usuários</h2>
      <v-btn to="/cadastro" color="primary">
        <v-icon left> mdi-account-plus </v-icon>
        Criar usuário
      </v-btn>
    </header>
    <nav class="options">
      <v-text-field
        class="search"
        v-model="search"
        text="Pesquisar"
        prepend-inner-icon="mdi-magnify"
        placeholder="Pesquisar..."
        solo
      >
      </v-text-field>
      <Pagination
        :items="items"
        :paginate="paginate"
        :usersPerPage="usersPerPage"
        :totalUsers="users.length"
        :currentPage="currentPage"
        :handleSelectChange="handleSelectChange"
      />
    </nav>

    <v-divider></v-divider>

    <UsersTable :users="filterUsers" :deleteUser="removeUser" />

    <v-overlay :value="loading">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>
import UsersTable from "@/components/UsersTable.vue";
import Pagination from "@/components/Pagination.vue";
import { index, deleteUser } from "@/services/users";
export default {
  components: {
    UsersTable: UsersTable,
    Pagination: Pagination,
  },
  data: () => ({
    error: "",
    users: [],
    loading: true,
    currentPage: 1,
    usersPerPage: {
      text: "Mostrar 10",
      value: 10,
    },

    search: "",
    items: [
      {
        text: "Mostrar 5",
        value: 5,
      },
      {
        text: "Mostrar 10",
        value: 10,
      },
      {
        text: "Mostrar 15",
        value: 15,
      },
    ],
  }),
  created() {
    this.fetchUsers();
  },
  computed: {
    indexOfLastPost: function () {
      return this.currentPage * this.usersPerPage.value;
    },
    indexOfFirstPage: function () {
      return this.indexOfLastPost - this.usersPerPage.value;
    },
    filterUsers: function () {
      let searchedItem = this.users.filter((user) => {
        for (const key in user) {
          if (
            user[key]
              .toString()
              .toLowerCase()
              .includes(this.search.toLowerCase())
          )
            return true;
        }
        return false;
      });
      let currents = searchedItem.slice(
        this.indexOfFirstPage,
        this.indexOfLastPost
      );

      return currents;
    },
  },
  methods: {
    async fetchUsers() {
      let { status, body } = await index();
      if ((status <= 299) & (status >= 200)) {
        this.users = body;
      } else {
        this.error = body.message;
        this.snackbar = true;
      }
      this.loading = false
    },
    paginate(numberOfPage) {
      this.currentPage = numberOfPage;
    },
    handleSelectChange(value) {
      this.usersPerPage = {
        text: `Mostrar ${value}`,
        value: value,
      };
    },
    handleSnackbar(message,status){
      return this.$EventBus.$emit('showSnackbar', message, status)
    },
    async removeUser(id) {
      deleteUser(id).then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          this.users = [...this.users].filter((user) => user.id != id);
          this.handleSnackbar('Usuário excluído com sucesso', 'success')
        }
      });
    },

  },
};
</script>

<style>
</style>