<template>
  <v-container class="cadastro">
    <header>
      <h2>Criar usuário</h2>
      <v-btn>Cancelar</v-btn>
    </header>
    <v-form>
      <v-text-field
        v-model="nome"
        label="Nome"
        required
        solo
        :rules="nomeRules"
      ></v-text-field>
      <v-text-field
        v-model="email"
        label="Email"
        :rules="emailRules"
        required
        solo
      ></v-text-field>
      <v-text-field
        v-model="cpf"
        label="CPF"
        :rules="cpfRules"
        required
        solo
        v-mask="'###.###.###-##'"
      ></v-text-field>
      <v-text-field
        v-model="registro_academico"
        label="Registro Acadêmico"
        required
        solo
        :rules="raRules"
      ></v-text-field>
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
    nome: "",
    email: "",
    cpf: "",
    registro_academico: "",
    nomeRules: [(v) => !!v || "Nome é necessário"],
    emailRules: [
      (v) => !!v || "Email é necessário",
      (v) => emailRe.test(v) || "Email deve ser válido",
    ],
    cpfRules: [
      (v) => !!v || "CPF é necessário",
      (v) => cpfRe.test(v) || "CPF deve ser válido",
    ],
    raRules: [(v) => !!v || "Registro acadêmico é necessário"],
  }),
  methods: {
    async createNewUser() {
      let { status, body } = await createUser({

        nome: this.nome,

        email: this.email,
        cpf: this.cpf,
        registro_academico: this.registro_academico,
      });
      console.log(status, body);
    },
  },
};
</script>

<style>
</style>