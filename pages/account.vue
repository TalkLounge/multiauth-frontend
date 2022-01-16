<template>
  <div class="container">
    <br />
    <h3 class="text-center">{{ $t("account.title") }}</h3>
    <br />

    <section
      id="info"
      v-if="!user.email || !user.email_confirmed || !user.otp_confirmed"
    >
      <div class="flex-text-center">
        <p class="text-center w-mc m-0 info">
          <span v-if="!user.email">
            {{ $t("account.infoEmail1") }}
            <a @click="$bvModal.show('modalEnableEmail')" href="#">{{
              $t("account.infoEmail2")
            }}</a>
            {{ $t("account.infoEmail3") }}
          </span>
          <span v-else-if="!user.email_confirmed">
            {{ $t("account.infoEmail4") }}
          </span>
          <span v-if="!user.otp_confirmed">
            <br v-if="!user.email || !user.email_confirmed" />
            {{ $t("account.info2FA1") }}
            <a @click="enableOTP()" href="#">{{ $t("account.info2FA2") }}</a>
            {{ $t("account.info2FA3") }}
          </span>
        </p>
      </div>
      <br />
      <br />
    </section>

    <section id="account" class="flex-text-center">
      <br />
      <b-row class="w-mc">
        <b-col class="pic">
          <div v-html="user.pic"></div>
        </b-col>
        <b-col class="flex-align-vertical">
          <h3>{{ user.name }}</h3>
        </b-col>
        <b-col class="flex-align-vertical ml-4">
          <b-icon icon="envelope" font-scale="2"></b-icon>
          <b-iconstack scale="3.25" v-if="user.email && user.email_confirmed">
            <b-icon
              icon="check"
              stacked
              variant="success"
              shift-v="-2.75"
              shift-h="3.5"
            ></b-icon>
          </b-iconstack>
          <b-iconstack scale="3.25" v-else>
            <b-icon
              icon="x"
              stacked
              variant="danger"
              shift-v="-2.5"
              shift-h="4"
            ></b-icon>
          </b-iconstack>
        </b-col>
        <b-col class="flex-align-vertical ml-3">
          <b-icon icon="shield-lock" font-scale="1.75"></b-icon>
          <b-iconstack scale="3.25" v-if="user.otp_confirmed">
            <b-icon
              icon="check"
              stacked
              variant="success"
              shift-v="-2.75"
              shift-h="3.5"
            ></b-icon>
          </b-iconstack>
          <b-iconstack scale="3.25" v-else>
            <b-icon
              icon="x"
              stacked
              variant="danger"
              shift-v="-2.5"
              shift-h="4"
            ></b-icon>
          </b-iconstack>
        </b-col>
      </b-row>
    </section>

    <section id="modals">
      <b-modal
        id="modalChangePicture"
        :title="$t('account.modalTitlePicture')"
        header-bg-variant="dark"
        header-text-variant="light"
        body-bg-variant="dark"
        body-text-variant="light"
        footer-bg-variant="dark"
        footer-text-variant="light"
      >
        <template #default="{ hide }">
          <label>{{ $t("claim.labelPassword") }}</label>
          <b-form-input
            :placeholder="$t('claim.inputPassword')"
            type="password"
            v-model="password"
            @keydown.native="
              (event) => {
                if (event.which === 13) {
                  changePic();
                  password = '';
                  hide();
                }
              }
            "
          ></b-form-input>
        </template>

        <template #modal-footer="{ cancel, ok }">
          <b-button
            variant="secondary"
            @click="
              password = '';
              cancel();
            "
          >
            {{ $t("account.buttonCancel") }}
          </b-button>
          <b-button
            variant="primary"
            @click="
              changePic();
              password = '';
              ok();
            "
          >
            {{ $t("account.buttonChange") }}
          </b-button>
        </template>
      </b-modal>

      <b-modal
        id="modalChangeName"
        :title="$t('account.modalTitleName')"
        header-bg-variant="dark"
        header-text-variant="light"
        body-bg-variant="dark"
        body-text-variant="light"
        footer-bg-variant="dark"
        footer-text-variant="light"
      >
        <template #default="{ hide }">
          <label>{{ $t("claim.labelName") }}</label>
          <b-form-input
            :placeholder="$t('claim.inputName')"
            v-model="name"
          ></b-form-input>

          <br />

          <label>{{ $t("claim.labelPassword") }}</label>
          <b-form-input
            :placeholder="$t('claim.inputPassword')"
            type="password"
            v-model="password"
            @keydown.native="
              (event) => {
                if (event.which === 13) {
                  changeName();
                  name = '';
                  password = '';
                  hide();
                }
              }
            "
          ></b-form-input>
        </template>

        <template #modal-footer="{ cancel, ok }">
          <b-button
            variant="secondary"
            @click="
              name = '';
              password = '';
              cancel();
            "
          >
            {{ $t("account.buttonCancel") }}
          </b-button>
          <b-button
            variant="primary"
            @click="
              changeName();
              name = '';
              password = '';
              ok();
            "
          >
            {{ $t("account.buttonChange") }}
          </b-button>
        </template>
      </b-modal>

      <b-modal
        id="modalChangePassword"
        :title="$t('account.modalTitlePassword')"
        header-bg-variant="dark"
        header-text-variant="light"
        body-bg-variant="dark"
        body-text-variant="light"
        footer-bg-variant="dark"
        footer-text-variant="light"
      >
        <template #default="{ hide }">
          <label>{{ $t("account.labelNewPassword") }}</label>
          <b-form-input
            :placeholder="$t('account.inputNewPassword')"
            type="password"
            v-model="newPassword"
          ></b-form-input>

          <br />

          <label>{{ $t("account.labelCurrentPassword") }}</label>
          <b-form-input
            :placeholder="$t('account.inputCurrentPassword')"
            type="password"
            v-model="password"
            @keydown.native="
              (event) => {
                if (event.which === 13) {
                  changePassword();
                  newPassword = '';
                  password = '';
                  hide();
                }
              }
            "
          ></b-form-input>
        </template>

        <template #modal-footer="{ cancel, ok }">
          <b-button
            variant="secondary"
            @click="
              newPassword = '';
              password = '';
              cancel();
            "
          >
            {{ $t("account.buttonCancel") }}
          </b-button>
          <b-button
            variant="primary"
            @click="
              changePassword();
              newPassword = '';
              password = '';
              ok();
            "
          >
            {{ $t("account.buttonChange") }}
          </b-button>
        </template>
      </b-modal>

      <b-modal
        id="modalEnableEmail"
        :title="$t('account.modalTitleEmailEnable')"
        header-bg-variant="dark"
        header-text-variant="light"
        body-bg-variant="dark"
        body-text-variant="light"
        footer-bg-variant="dark"
        footer-text-variant="light"
      >
        <template #default="{ hide }">
          <label>{{ $t("account.labelEmail") }}</label>
          <b-form-input
            :placeholder="$t('account.inputEmail')"
            type="email"
            v-model="email"
          ></b-form-input>

          <br />

          <label>{{ $t("claim.labelPassword") }}</label>
          <b-form-input
            :placeholder="$t('claim.inputPassword')"
            type="password"
            v-model="password"
            @keydown.native="
              (event) => {
                if (event.which === 13) {
                  enableEmail();
                  email = '';
                  password = '';
                  hide();
                }
              }
            "
          ></b-form-input>
        </template>

        <template #modal-footer="{ cancel, ok }">
          <b-button
            variant="secondary"
            @click="
              email = '';
              password = '';
              cancel();
            "
          >
            {{ $t("account.buttonCancel") }}
          </b-button>
          <b-button
            variant="success"
            @click="
              enableEmail();
              email = '';
              password = '';
              ok();
            "
          >
            {{ $t("account.buttonEnable") }}
          </b-button>
        </template>
      </b-modal>

      <b-modal
        id="modalDisableEmail"
        :title="$t('account.modalTitleEmailDisable')"
        header-bg-variant="dark"
        header-text-variant="light"
        body-bg-variant="dark"
        body-text-variant="light"
        footer-bg-variant="dark"
        footer-text-variant="light"
      >
        <template #default="{ hide }">
          <label>{{ $t("claim.labelPassword") }}</label>
          <b-form-input
            :placeholder="$t('claim.inputPassword')"
            type="password"
            v-model="password"
            @keydown.native="
              (event) => {
                if (event.which === 13) {
                  disableEmail();
                  password = '';
                  hide();
                }
              }
            "
          ></b-form-input>
        </template>

        <template #modal-footer="{ cancel, ok }">
          <b-button
            variant="secondary"
            @click="
              password = '';
              cancel();
            "
          >
            {{ $t("account.buttonCancel") }}
          </b-button>
          <b-button
            variant="danger"
            @click="
              disableEmail();
              password = '';
              ok();
            "
          >
            {{ $t("account.buttonDisable") }}
          </b-button>
        </template>
      </b-modal>

      <b-modal
        id="modalConfirmOTP"
        :title="$t('account.modalTitle2FAEnable')"
        header-bg-variant="dark"
        header-text-variant="light"
        body-bg-variant="dark"
        body-text-variant="light"
        footer-bg-variant="dark"
        footer-text-variant="light"
      >
        <template #default="{ hide }">
          <div class="flex-text-center">
            <div>
              <img :src="img" />
              <br />
              <h5 class="text-center">{{ otp }}</h5>
            </div>
          </div>
          <br />
          <label>{{ $t("login.label2FA") }}</label>
          <b-form-input
            :placeholder="$t('login.input2FA')"
            v-model="totp"
          ></b-form-input>

          <br />

          <label>{{ $t("claim.labelPassword") }}</label>
          <b-form-input
            :placeholder="$t('claim.inputPassword')"
            type="password"
            v-model="password"
            @keydown.native="
              (event) => {
                if (event.which === 13) {
                  confirmOTP();
                  img = '';
                  otp = '';
                  totp = '';
                  password = '';
                  hide();
                }
              }
            "
          ></b-form-input>
        </template>

        <template #modal-footer="{ cancel, ok }">
          <b-button
            variant="secondary"
            @click="
              img = '';
              otp = '';
              totp = '';
              password = '';
              cancel();
            "
          >
            {{ $t("account.buttonCancel") }}
          </b-button>
          <b-button
            variant="success"
            @click="
              confirmOTP();
              img = '';
              otp = '';
              totp = '';
              password = '';
              ok();
            "
          >
            {{ $t("account.buttonEnable") }}
          </b-button>
        </template>
      </b-modal>

      <b-modal
        id="modalDisableOTP"
        :title="$t('account.modalTitle2FADisable')"
        header-bg-variant="dark"
        header-text-variant="light"
        body-bg-variant="dark"
        body-text-variant="light"
        footer-bg-variant="dark"
        footer-text-variant="light"
      >
        <template #default="{ hide }">
          <label>{{ $t("claim.labelPassword") }}</label>
          <b-form-input
            :placeholder="$t('claim.inputPassword')"
            type="password"
            v-model="password"
            @keydown.native="
              (event) => {
                if (event.which === 13) {
                  disableOTP();
                  password = '';
                  hide();
                }
              }
            "
          ></b-form-input>
        </template>

        <template #modal-footer="{ cancel, ok }">
          <b-button
            variant="secondary"
            @click="
              password = '';
              cancel();
            "
          >
            {{ $t("account.buttonCancel") }}
          </b-button>
          <b-button
            variant="danger"
            @click="
              disableOTP();
              password = '';
              ok();
            "
          >
            {{ $t("account.buttonDisable") }}
          </b-button>
        </template>
      </b-modal>
    </section>

    <section id="settings">
      <br />
      <br />
      <br />
      <div class="flex-text-center">
        <div class="w-25rem text-center">
          <b-row>
            <b-col>
              <h5>{{ $t("account.picture") }}</h5>
            </b-col>
            <b-col>
              <b-button variant="outline-primary" v-b-modal.modalChangePicture>
                {{ $t("account.buttonChange") }}
              </b-button>
            </b-col>
          </b-row>
          <br />
          <b-row>
            <b-col>
              <h5>{{ $t("account.name") }}</h5>
              <label>{{ user.name }}</label>
            </b-col>
            <b-col class="flex-align-bottom flex-text-center">
              <b-button variant="outline-primary" v-b-modal.modalChangeName>
                {{ $t("account.buttonChange") }}
              </b-button>
            </b-col>
          </b-row>
          <br />
          <b-row>
            <b-col>
              <h5>{{ $t("account.password") }}</h5>
              <label>*********</label>
            </b-col>
            <b-col class="flex-align-bottom flex-text-center">
              <b-button variant="outline-primary" v-b-modal.modalChangePassword>
                {{ $t("account.buttonChange") }}
              </b-button>
            </b-col>
          </b-row>
          <br />
          <b-row>
            <b-col>
              <h5>{{ $t("account.email") }}</h5>
              <label>{{
                user.email ? user.email : $t("account.labelDisabled")
              }}</label>
            </b-col>
            <b-col class="flex-align-bottom flex-text-center">
              <b-button
                variant="outline-danger"
                @click="$bvModal.show('modalDisableEmail')"
                v-if="user.email"
              >
                {{ $t("account.buttonDisable") }}
              </b-button>
              <b-button
                variant="outline-success"
                @click="$bvModal.show('modalEnableEmail')"
                v-else
              >
                {{ $t("account.buttonEnable") }}
              </b-button>
            </b-col>
          </b-row>
          <br />
          <b-row>
            <b-col>
              <h5>{{ $t("account.otp") }}</h5>
              <label>{{
                user.otp_confirmed
                  ? $t("account.labelEnabled")
                  : $t("account.labelDisabled")
              }}</label>
            </b-col>
            <b-col class="flex-align-bottom flex-text-center">
              <b-button
                variant="outline-danger"
                @click="$bvModal.show('modalDisableOTP')"
                v-if="user.otp_confirmed"
              >
                {{ $t("account.buttonDisable") }}
              </b-button>
              <b-button variant="outline-success" @click="enableOTP()" v-else>
                {{ $t("account.buttonEnable") }}
              </b-button>
            </b-col>
          </b-row>
        </div>
      </div>
    </section>

    <br />
    <br />
    <br />
  </div>
</template>

<style scoped>
.input-size {
  width: 45rem;
}

.w-25rem {
  width: 25rem;
}
</style>

<style>
.pic svg {
  width: 4rem;
  border-radius: 50%;
  background: white;
}
</style>

<script>
export default {
  data() {
    return {
      user: {},
      password: "",
      name: "",
      newPassword: "",
      email: "",
      otp: "",
      img: "",
      totp: "",
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
    if (data.guest) {
      this.$router.push("/claim");
    }

    this.user = data;
  },
  methods: {
    async changePic() {
      let data;
      try {
        data = await this.$axios.$post(
          `${process.env.MULTIAUTH_BACKEND_URL}/me/changePic`,
          { password: this.password },
          {
            headers: { Authorization: `Bearer ${this.$store.state.bearer}` },
          }
        );
      } catch (e) {
        return this.$handlecatch(this, e);
      }

      this.user = data;
    },
    async changeName() {
      let data;
      try {
        data = await this.$axios.$post(
          `${process.env.MULTIAUTH_BACKEND_URL}/me/changeName`,
          { name: this.name, password: this.password },
          {
            headers: { Authorization: `Bearer ${this.$store.state.bearer}` },
          }
        );
      } catch (e) {
        return this.$handlecatch(this, e);
      }

      this.user = data;
    },
    async changePassword() {
      try {
        await this.$axios.$post(
          `${process.env.MULTIAUTH_BACKEND_URL}/me/changePassword`,
          { newPassword: this.newPassword, password: this.password },
          {
            headers: { Authorization: `Bearer ${this.$store.state.bearer}` },
          }
        );
      } catch (e) {
        return this.$handlecatch(this, e);
      }
    },
    async enableEmail() {
      let data;
      try {
        data = await this.$axios.$post(
          `${process.env.MULTIAUTH_BACKEND_URL}/me/enableEmail`,
          { email: this.email, password: this.password },
          {
            headers: { Authorization: `Bearer ${this.$store.state.bearer}` },
          }
        );
      } catch (e) {
        return this.$handlecatch(this, e);
      }

      this.user = data;
    },
    async disableEmail() {
      let data;
      try {
        data = await this.$axios.$post(
          `${process.env.MULTIAUTH_BACKEND_URL}/me/disableEmail`,
          { password: this.password },
          {
            headers: { Authorization: `Bearer ${this.$store.state.bearer}` },
          }
        );
      } catch (e) {
        return this.$handlecatch(this, e);
      }

      this.user = data;
    },
    async enableOTP() {
      let data;
      try {
        data = await this.$axios.$post(
          `${process.env.MULTIAUTH_BACKEND_URL}/me/enableOTP`,
          {},
          {
            headers: { Authorization: `Bearer ${this.$store.state.bearer}` },
          }
        );
      } catch (e) {
        return this.$handlecatch(this, e);
      }

      this.otp = data.otp;
      this.img = data.img;
      this.$bvModal.show("modalConfirmOTP");
    },
    async confirmOTP() {
      let data;
      try {
        data = await this.$axios.$post(
          `${process.env.MULTIAUTH_BACKEND_URL}/me/confirmOTP`,
          { totp: this.totp, password: this.password },
          {
            headers: { Authorization: `Bearer ${this.$store.state.bearer}` },
          }
        );
      } catch (e) {
        return this.$handlecatch(this, e);
      }

      this.user = data;
    },
    async disableOTP() {
      let data;
      try {
        data = await this.$axios.$post(
          `${process.env.MULTIAUTH_BACKEND_URL}/me/disableOTP`,
          { password: this.password },
          {
            headers: { Authorization: `Bearer ${this.$store.state.bearer}` },
          }
        );
      } catch (e) {
        return this.$handlecatch(this, e);
      }

      this.user = data;
    },
  },
};
</script>