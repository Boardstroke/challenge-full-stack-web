<template>
  <div style="overflow-x: auto">
  <table class="users-table">
    <tr class="header">
      <th v-for="headItem in headers" :key="headItem.name">
        {{ headItem.label }}
      </th>
      <th class="actions">Ações</th>
    </tr>

    <tbody>
      <tr v-for="(user, index) in users" :key="index">
        <td v-for="headItem in headers" :key="headItem.name">
          {{ user[headItem.name] }}
        </td>
        <td class="actions">
          <button class="edit">
            <fa  icon="pen"/>
          </button>
          <button class="delete" v-on:click="deleteUser(user.id)">
            <fa icon="trash-alt"/>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  </div>
</template>
<script>
export default {
  props: { users: Array },

  data: () => ({
    headers: [
      {
        name: "id",
        label: "ID",
      },
      {
        name: "nome",
        label: "Nome",
      },
      {
        name: "email",
        label: "Email",
      },
      {
        name: "cpf",
        label: "CPF",
      },
      {
        name: "registro_academico",
        label: "RA",
      },
    ],
  }),
  methods: {
    deleteUser(userId) {
      console.log(userId);
    },
  },
};
</script>