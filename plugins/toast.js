function showToast(that, body, title, variant) {
    that.$bvToast.toast(body, {
        title: title,
        autoHideDelay: 5000,
        appendToast: true,
        variant: variant,
    });
}

function showToastInfo(that, body, title) {
    showToast(that, body, title, "info");
}

function showToastSuccess(that, body, title) {
    showToast(that, body, title, "success");
}

function showToastError(that, body, title) {
    showToast(that, body, title, "danger");
}

const map = [
    { i18n: "server.internal" },
    { status: 0, i18n: "server.timeout" },
    { status: 429, i18n: "server._429" },
    { status: 401, i18n: "server._401" },
    { status: 400, text: "Name must be between 3 and 25 characters long", i18n: "server.nameLength" },
    { status: 400, text: "Name may only contain alphanumeric values, - and _", i18n: "server.nameChars" },
    { status: 400, text: "Password must be between 6 and 256 characters long", i18n: "server.passwordLength" },
    { status: 400, text: "Name is already taken", i18n: "server.nameTaken" },
    { status: 400, text: "Account must be claimed first", i18n: "server.accountClaimed" },
    { status: 400, text: "Wrong password", i18n: "server.passwordWrong" },
    { status: 400, text: "newPassword must be between 6 and 256 characters long", i18n: "server.newPasswordLength" },
    { status: 400, text: "Email must not be longer than 50 characters", i18n: "server.emailLength" },
    { status: 400, text: "Email must be valid", i18n: "server.emailValid" },
    { status: 400, text: "Email is already taken", i18n: "server.emailTaken" },
    { status: 400, text: "TOTP must be 6 characters long", i18n: "server.totpLength" },
    { status: 400, text: "Wrong TOTP", i18n: "server.totpWrong" },
    { status: 400, text: "Account not found", i18n: "server.accountNotFound" }
];

function handleCatch(that, e) {
    let err = map.find(({ status, text }) => status == e.request.status && text == e.request.response);
    console.log(1, err);
    if (!err) {
        err = map.find(({ status }) => status == e.request.status);
    }
    console.log(2, err);
    if (!err) {
        err = map[0];
    }
    console.log(err);
    showToastError(that, that.$t(err.i18n), that.$t("error"));
    console.log(e.request);
    console.log(e.response);
}

export default ({ app }, inject) => {
    inject("handlecatch", handleCatch);
}