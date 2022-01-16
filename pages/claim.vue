<template>
  <div class="container flex-text-center">
    <section>
      <br />
      <h3 class="text-center">{{ $t("claim.title") }}</h3>
      <br />
      <div class="flex-text-center">
        <p class="text-center w-mc m-0 info">
          {{ $t("claim.info1") }}
          <br />
          {{ $t("claim.info2") }}
          <br />
          {{ $t("claim.info3") }}
        </p>
      </div>
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
              claim();
            }
          }
        "
      ></b-form-input>
      <br />
      <br />

      <div class="flex-text-center">
        <b-button variant="outline-primary" @click="claim()">
          {{ $t("claim.button") }}
        </b-button>
      </div>
    </section>
  </div>
</template>

<style scoped>
section {
  width: 51rem;
}
</style>

<script>
export default {
  data() {
    return {
      name: "",
      password: "",
      user: undefined,
    };
  },
  async beforeMount() {
    let data;
    try {
      data = await this.$axios.$get(`${process.env.MULTIAUTH_BACKEND_URL}/me`, {
        headers: { Authorization: `Bearer ${this.$store.state.bearer}` },
      });
    } catch (e) {
      return this.$handlecatch(this, e);
    }
    if (!data.guest) {
      this.$router.push("/account");
    }

    this.user = data;
    this.name = this.user.name;
  },
  methods: {
    async claim() {
      try {
        await this.$axios.$post(
          `${process.env.MULTIAUTH_BACKEND_URL}/me/claim`,
          { name: this.name, password: this.password },
          {
            headers: { Authorization: `Bearer ${this.$store.state.bearer}` },
          }
        );
      } catch (e) {
        return this.$handlecatch(this, e);
      }
      this.$router.push("/account");
    },
  },
};
</script>
