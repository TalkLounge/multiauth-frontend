<template>
  <header>
    <b-navbar toggleable="lg" type="dark">
      <b-navbar-brand to="/">MultiAuth</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <NuxtLink
            tag="b-nav-item"
            active-class="active"
            to="/claim"
            v-if="guest"
          >
            {{ $t("tabs.claim") }}
          </NuxtLink>
          <NuxtLink
            tag="b-nav-item"
            active-class="active"
            to="/account"
            v-if="!guest"
          >
            {{ $t("tabs.account") }}
          </NuxtLink>
          <NuxtLink
            tag="b-nav-item"
            active-class="active"
            to="/logins"
            v-if="!guest"
          >
            {{ $t("tabs.logins") }}
          </NuxtLink>
          <NuxtLink
            tag="b-nav-item"
            active-class="active"
            to="/roles"
            v-if="user && user.roles.includes('multiauth:admin')"
          >
            {{ $t("tabs.roles") }}
          </NuxtLink>
          <a
            :href="MULTIAUTH_BACKEND_URL + '/logout'"
            class="nolink nav-link"
            v-if="!guest"
          >
            {{ $t("tabs.logout") }}
          </a>
          <NuxtLink
            tag="b-nav-item"
            active-class="active"
            to="/login"
            v-if="guest"
          >
            {{ $t("tabs.login") }}
          </NuxtLink>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <LanguageSwitcher></LanguageSwitcher>
          <a
            tag="b-nav-item"
            :href="back"
            class="ml-auto nolink nav-link"
            v-if="back"
          >
            <b-icon icon="chevron-left"></b-icon>
            {{ $t("tabs.back") }}
          </a>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </header>
</template>

<style>
.nolink {
  text-decoration: none;
  color: rgba(255, 255, 255, 0.5);
}

.nolink:hover {
  text-decoration: none;
  color: rgba(255, 255, 255, 0.75);
}
</style>

<script>
import LanguageSwitcher from "./LanguageSwitcher.vue";
export default {
  components: { LanguageSwitcher },
  data() {
    return {
      MULTIAUTH_BACKEND_URL: "",
      back: "",
      user: undefined,
      guest: true,
    };
  },
  async created() {
    this.$store.state.bearer = this.$route.query.bearer;
    this.back = this.$route.query.back;
    let query = JSON.parse(JSON.stringify(this.$route.query));
    delete query.bearer;
    delete query.back;
    this.$router.replace({ query });

    let path = this.$route.path;
    if (path == "/") {
      this.$router.push("/account");
    }

    let data;
    try {
      data = await this.$axios.$get(`${process.env.MULTIAUTH_BACKEND_URL}/me`, {
        headers: { Authorization: `Bearer ${this.$store.state.bearer}` },
      });
    } catch (e) {
      return this.$handlecatch(this, e);
    }
    this.$store.state.user = data;
    this.user = data;
    this.guest = data.guest;
    this.MULTIAUTH_BACKEND_URL = process.env.MULTIAUTH_BACKEND_URL;

    path = this.$route.path;
    if (
      this.guest &&
      (path == "/account" || path == "/logins" || path == "/roles")
    ) {
      this.$router.push("/claim");
    } else if (
      !this.guest &&
      (path == "/claim" ||
        (path == "/roles" && !this.user.roles.includes("multiauth:admin")) ||
        path == "/login")
    ) {
      this.$router.push("/account");
    }
  },
};
</script>