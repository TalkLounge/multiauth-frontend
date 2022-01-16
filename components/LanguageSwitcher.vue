<template>
  <div>
    <b-dropdown variant="dark">
      <template #button-content>
        <img
          :src="`flags/${
            locales.find((locale) => locale.code == $i18n.locale).code
          }.svg`"
        />
        {{ $i18n.locale.toUpperCase() }}
      </template>
      <b-dropdown-item-button
        variant="dark"
        v-for="locale in locales"
        :key="locale.code"
        @click="$i18n.setLocale(locale.code)"
      >
        <img :src="`flags/${locale.code}.svg`" />
        {{ locale.lang }}
      </b-dropdown-item-button>
    </b-dropdown>
  </div>
</template>

<style scoped>
img {
  height: 1.2rem;
  vertical-align: text-bottom;
}
</style>

<script>
// Flags from https://github.com/LeCoupa/vueflags/tree/master/flags
export default {
  data() {
    return {
      locales: [
        { code: "en", lang: "English" },
        { code: "de", lang: "Deutsch" },
      ],
    };
  },
};
</script>