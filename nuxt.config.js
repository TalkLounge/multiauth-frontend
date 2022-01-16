import fs from "fs";

let https;

if (process.env.CERT_PRIV) {
  https = {
    key: fs.readFileSync(process.env.CERT_PRIV),
    cert: fs.readFileSync(process.env.CERT_PUB),
    ca: fs.readFileSync(process.env.CERT_CA)
  };
}

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: "server",

  server: {
    port: process.env.PORT,
    host: process.env.HOSTNAME,
    https
  },

  serverMiddleware: ["~/server-middleware/redirect-multiauth"],

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "MultiAuth",
    meta: [
      { name: "format-detection", content: "telephone=no" },
      { name: "apple-mobile-web-app-title", content: "MultiAuth" }
    ],
    bodyAttrs: {
      class: "container bg-dark text-white"
    }
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/toast.js", mode: "client" }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    ["@nuxtjs/dotenv"]
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    "bootstrap-vue/nuxt",
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "@nuxtjs/i18n",
    "@nuxtjs/pwa"
  ],

  bootstrapVue: {
    icons: true
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: "/",
  },

  i18n: {
    strategy: "no_prefix",
    locales: ["en", "de"],
    defaultLocale: "en",
    vueI18n: {
      fallbackLocale: "en",
      messages: {
        en: {
          tabs: {
            claim: "Claim",
            login: "Login",
            account: "Account",
            logins: "Logins",
            roles: "Roles",
            logout: "Logout",
            back: "Back"
          },
          claim: {
            title: "Claim Account",
            info1: "You are currently using a guest account. This account is temporary and will expire after some time.",
            info2: "Consider claiming the account to get a regular account. All data will then be transferred to the regular account.",
            info3: "A regular account never expires and you can log in from different devices.",
            labelName: "Enter Name",
            inputName: "Your name",
            labelPassword: "Enter Password",
            inputPassword: "Your password",
            button: "Claim"
          },
          login: {
            title: "Login",
            passwordReset: "Forget password?",
            label2FA: "Enter 2FA Code",
            input2FA: "Your code",
            button: "Login"
          },
          account: {
            title: "Account Settings",
            infoEmail1: "Consider entering an",
            infoEmail2: "email",
            infoEmail3: "for password reset",
            infoEmail4: "Please confirm your email. May check your spam folder",
            info2FA1: "Consider enabling",
            info2FA2: "2 factor authentication",
            info2FA3: "for more security",
            modalTitlePicture: "Change Picture",
            buttonCancel: "Cancel",
            buttonChange: "Change",
            modalTitleName: "Change Name",
            modalTitlePassword: "Change Password",
            labelNewPassword: "Enter new Password",
            inputNewPassword: "Your new Password",
            labelCurrentPassword: "Enter current Password",
            inputCurrentPassword: "Your current Password",
            modalTitleEmailEnable: "Enable Email",
            labelEmail: "Enter email",
            inputEmail: "Your email",
            buttonEnable: "Enable",
            modalTitleEmailDisable: "Disable Email",
            buttonDisable: "Disable",
            modalTitle2FAEnable: "Enable 2FA",
            modalTitle2FADisable: "Disable 2FA",
            picture: "Picture",
            name: "Name",
            password: "Password",
            email: "Email",
            labelDisabled: "Disabled",
            otp: "2FA",
            labelEnabled: "Enabled"
          },
          error: "An error occurred",
          server: {
            internal: "Internal server error. Please try again later",
            timeout: "Server is down. Please try again later",
            _429: "Too many requests. Please try again later",
            _401: "Unauthorized. Please reload page",
            nameLength: "Name must be between 3 and 25 characters long",
            nameChars: "Name may only contain alphanumeric values, - and _",
            passwordLength: "Password must be between 6 and 256 characters long",
            nameTaken: "Name is already taken",
            accountClaimed: "Account must be claimed first",
            passwordWrong: "Wrong password",
            newPasswordLength: "New password must be between 6 and 256 characters long",
            emailLength: "Email must not be longer than 50 characters",
            emailValid: "Email must be valid",
            emailTaken: "Email is already taken",
            totpLength: "TOTP must be 6 characters long",
            totpWrong: "Wrong TOTP",
            accountNotFound: "Account not found"
          },
        },
        de: {
          tabs: {
            claim: "Beanspruchen",
            login: "Anmelden",
            account: "Konto",
            logins: "Anmeldungen",
            roles: "Rollen",
            logout: "Abmelden",
            back: "Zurück"
          },
          claim: {
            title: "Konto beanspruchen",
            info1: "Du verwendest ein Gastkonto. Dieses Konto ist nur vorübergehend und wird nach einiger Zeit gelöscht.",
            info2: "Beanspruche das Konto, um ein reguläres Konto zu erhalten. Alle Daten bleiben erhalten.",
            info3: "Ein reguläres Konto wird nicht gelöscht und du kannst dich an verschiedenenen Geräten damit anmelden.",
            labelName: "Name eingeben",
            inputName: "Dein Name",
            labelPassword: "Passwort eingeben",
            inputPassword: "Dein Passwort",
            button: "Beanspruchen"
          },
          login: {
            title: "Anmelden",
            passwordReset: "Passwort vergessen?",
            label2FA: "2FA Code eingeben",
            input2FA: "Dein Code",
            button: "Anmelden"
          },
          account: {
            title: "Konto Einstellungen",
            infoEmail1: "Hinterlege eine",
            infoEmail2: "E-Mail",
            infoEmail3: "um das Passwort zurücksetzen zu können",
            infoEmail4: "Bitte bestätige deine E-Mail. Überprüfe deinen Spam Ordner",
            info2FA1: "Aktiviere",
            info2FA2: "2 Faktor",
            info2FA3: "für eine höhere Sicherheit",
            modalTitlePicture: "Profilbild ändern",
            buttonCancel: "Abbrechen",
            buttonChange: "Ändern",
            modalTitleName: "Name ändern",
            modalTitlePassword: "Passwort ändern",
            labelNewPassword: "Neues Passwort eingeben",
            inputNewPassword: "Dein neues Passwort",
            labelCurrentPassword: "Aktuelles Passwort eingeben",
            inputCurrentPassword: "Dein aktuelles Passwort",
            modalTitleEmailEnable: "E-Mail aktivieren",
            labelEmail: "E-Mail eingeben",
            inputEmail: "Deine E-Mail",
            buttonEnable: "Aktivieren",
            modalTitleEmailDisable: "E-Mail deaktivieren",
            buttonDisable: "Deaktivieren",
            modalTitle2FAEnable: "2FA aktivieren",
            modalTitle2FADisable: "2FA deaktivieren",
            picture: "Profilbild",
            name: "Name",
            password: "Passwort",
            email: "E-Mail",
            labelDisabled: "Deaktiviert",
            otp: "2FA",
            labelEnabled: "Aktiviert"
          },
          error: "Ein Fehler ist aufgetreten",
          server: {
            internal: "Interner Server Fehler. Bitte versuche es später erneut",
            timeout: "Server ist nicht erreichbar. Bitte versuche es später erneut",
            _429: "Zu viele Anfragen. Bitte versuche es später erneut",
            _401: "Unautorisiert. Bitte Seite neu laden",
            nameLength: "Name muss zwischen 3 und 25 Zeichen lang sein",
            nameChars: "Name darf nur alphanumerische Zeichen, - und _ enthalten",
            passwordLength: "Passwort muss zwischen 6 und 256 Zeichen lang sein",
            nameTaken: "Name ist bereits vergeben",
            accountClaimed: "Konto muss zuerst beansprucht werden",
            passwordWrong: "Falsches Passwort",
            newPasswordLength: "Neues Passwort muss zwischen 6 und 256 Zeichen lang sein",
            emailLength: "E-Mail Adresse darf nicht länger als 50 Zeichen sein",
            emailValid: "Keine gültige E-Mail Adresse",
            emailTaken: "E-Mail Adresse wird bereits verwendet",
            totpLength: "2 Faktor Code muss 6 Zeichen lang sein",
            totpWrong: "Falscher 2 Faktor Code",
            accountNotFound: "Konto existiert nicht"
          },
        }
      }
    }
  },

  pwa: {
    meta: {
      ogSiteName: "MultiAuth",
      ogTitle: "MultiAuth",
      ogUrl: process.env.URL
    },
    manifest: {
      name: "MultiAuth",
      short_name: "MultiAuth"
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}