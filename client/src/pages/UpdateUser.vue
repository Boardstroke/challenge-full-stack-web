<template>
  <v-container class="cadastro">
    <header>
      <h2>Criar usuário</h2>
      <v-btn color="red" dark to="/">Cancelar</v-btn>
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
            disabled
            v-mask="'###.###.###-##'"
        /></v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="form.registro_academico"
            label="Registro Acadêmico"
            required
            solo
            disabled
            :rules="rules.ra"
          />
        </v-col>
      </v-row>
    </v-form>
    <section class="action">
      <v-btn color="green" dark @click="update">Salvar</v-btn>
    </section>
    <v-overlay :value="loading">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>
import { updateUser, getUser } from "@/services/users";
//eslint-disable-next-line
let emailRe = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
//eslint-disable-next-line
let cpfRe = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/i;
export default {
  data: () => ({
    loading: true,
    form: {
      nome: "",
      email: "",
      cpf: "",
      registro_academico: "",
    },
    prevForm: {},

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
  created() {
    this.getUserById();
  },
  computed: {
    difference: function () {
      return Object.keys(this.form).filter(
        (k) => this.form[k] !== this.prevForm[k]
      );
    },
  },
  methods: {
    async getUserById() {
      let { status, body } = await getUser(this.$route.params.id);
      if (status >= 200 && status <= 299) {
        this.form = body;
        this.prevForm = { ...body };
      }
      this.loading = false
    },
    async update() {
      let data = {};
      this.difference.forEach((key) => {
        data[key] = this.form[key];
      });

      let { status, body } = await updateUser(this.$route.params.id, data);

      if(status >= 200 && status <=299){
        this.$EventBus.$emit(
          "showSnackbar",
          "Usuário editado com sucesso",
          "success"
        );
        this.$router.push('/');
      }else{
        this.$EventBus.$emit(
          "showSnackbar",
          body.message,
          "error"
        );
      }
    },
  },
};
</script>

<style>
</style>