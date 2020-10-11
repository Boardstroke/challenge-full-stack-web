<template>
  <v-container class="cadastro">
    <header>
      <h2>Criar usuário</h2>
      <v-btn to="/">Cancelar</v-btn>
    </header>
    <v-form>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="form.nome"
            label="Nome"
            solo
            :rules="rules.nome"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="form.email"
            label="Email"
            :rules="rules.email"
            required
            solo
          />
        </v-col>
        <v-col cols="12" md="6"
          ><v-text-field
            v-model="form.cpf"
            label="CPF"
            :rules="rules.cpf"
            required
            solo
            v-mask="'###.###.###-##'"
        /></v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="form.registro_academico"
            label="Registro Acadêmico"
            required
            solo
            :rules="rules.ra"
          />
        </v-col>
      </v-row>
    </v-form>
    <section class="action">
      <v-btn @click="createNewUser">Salvar</v-btn>
    </section>
  </v-container>
</template>

<script>
import { createUser } from "@/services/users";
//eslint-disable-next-line
let emailRe = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
//eslint-disable-next-line
let cpfRe = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/i;
export default {
  data: () => ({
    form: {
      nome: "",
      email: "",
      cpf: "",
      registro_academico: "",
    },
    rules: {
      nome: [(v) => !!v || "Nome é necessário"],
      email: [
        (v) => !!v || "Email é necessário",
        (v) => emailRe.test(v) || "Email deve ser válido",
      ],
      cpf: [
        (v) => !!v || "CPF é necessário",
        (v) => cpfRe.test(v) || "CPF deve ser válido",
      ],
      ra: [(v) => !!v || "Registro acadêmico é necessário"],
    },
  }),
  methods: {
    async createNewUser() {
      let { status } = await createUser(this.form);
      console.log(status);
    },
  },
};
</script>

<style>
</style>