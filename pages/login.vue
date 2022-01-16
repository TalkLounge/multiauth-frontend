<template>
  <div class="container flex-text-center">
    <section v-if="!otp_confirmed">
      <br />
      <h3 class="text-center">{{ $t("login.title") }}</h3>
      <br />
      <br />

      <label>{{ $t("claim.labelName") }}</label>
      <b-form-input
        :placeholder="$t('claim.inputName')"
        v-model="name"
      ></b-form-input>
      <br />

      <label>{{ $t("claim.labelPassword") }}</label>
      <b-form-input
        :placeholder="$t('claim.inputPassword')"
        v-model="password"
        type="password"
        @keydown.native="
          (event) => {
            if (event.which === 13) {
              checkOTP();
            }
          }
        "
      ></b-form-input>
      <NuxtLink to="/resetPassword">{{ $t("login.passwordReset") }}</NuxtLink>
      <br />
      <br />
      <br />

      <div class="flex-text-center">
        <b-button variant="outline-primary" @click="checkOTP()">
          {{ $t("login.button") }}
        </b-button>
      </div>
    </section>

    <section v-else>
      <br />
      <h3 class="text-center">{{ $t("login.title") }}</h3>
      <br />
      <br />

      <label>{{ $t("login.label2FA") }}</label>
      <b-form-input
        :placeholder="$t('login.input2FA')"
        v-model="totp"
        @keydown.native="
          (event) => {
            if (event.which === 13) {
              login();
            }
          }
        "
      ></b-form-input>
      <br />
      <br />
      <br />

      <div class="flex-text-center">
        <b-button variant="outline-primary" @click="login()">
          {{ $t("login.button") }}
        </b-button>
      </div>
    </section>
  </div>
</template>

<style scoped>
section {
  width: 51rem;
}

input[type="password"] {
  margin-bottom: 0.5rem;
}
</style>

<script>
export default {
  data() {
    return {
      otp_confirmed: false,
      name: "",
      password: "",
      totp: "",
    };
  },
  methods: {
    async checkOTP() {
      let data;
      try {
        data = await this.$axios.$post(
          `${process.env.MULTIAUTH_BACKEND_URL}/checkOTP`,
          { name: this.name, password: this.password },
          {
            headers: { Authorization: `Bearer ${this.$store.state.bearer}` },
          }
        );
      } catch (e) {
        return this.$handlecatch(this, e);
      }

      this.otp_confirmed = data.otp_confirmed;

      if (!this.otp_confirmed) {
        this.login();
      }
    },
    login() {
      window.location.href = `${
        process.env.MULTIAUTH_BACKEND_URL
      }/login?name=${encodeURIComponent(
        this.name
      )}&password=${encodeURIComponent(
        this.password
      )}&totp=${encodeURIComponent(this.totp)}`;
    },
  },
};
</script>
