import "./index.scss";
import axios from "axios";
import * as dom from "./src/dom.js";
import * as animation from "./src/animation.js";
import * as utils from "./src/utils.js";

const backendPath = "http://localhost:9000";

const toLoginBtnFunc = (event) => {
  event.preventDefault();
  animation.RegisterToLogin();
};

const toRegisterBtnFunc = (event) => {
  event.preventDefault();
  animation.LoginToRegister();
};

dom.toLoginBtn.addEventListener("click", toLoginBtnFunc);
dom.toRegisterBtn.addEventListener(
  "click",
  toRegisterBtnFunc
);

dom.loginBtn.addEventListener("click", login);
dom.registerBtn.addEventListener("click", register);
dom.signOutBtn.addEventListener("click", signOut);

async function login(event) {
  event.preventDefault();
  if (
    utils.isInputHasContext([
      dom.username,
      dom.password,
    ]) === 1
  ) {
    animation.showError();
    return;
  }

  try {
    const response = await axios
      .post(backendPath + "/api/login", {
        username: dom.username.value,
        password: dom.password.value,
      })
      .then((res) => res.data);

    if (response.code === 0) {
      dom.welcomeUsername.textContent = response.username;
      utils.clearDomValue([dom.username, dom.password]);
      animation.showCorrect();
      animation.LoginToWelcome();
      response.token &&
        localStorage.setItem("token", response.token);
    }
  } catch (error) {
    // console.log(error);
    // console.log(error?.response?.data);
    const code = error?.response?.data.code;
    switch (Number(code)) {
      case 1:
      case 2:
      case 3:
        animation.showError();
        break;
      default:
        animation.showUnknown();
        break;
    }
  }
}

async function register(event) {
  event.preventDefault();
  const code = utils.isInputHasContext([
    dom.new_username,
    dom.password_one,
    dom.password_two,
  ]);
  if (code === 1) {
    animation.showError();
    return;
  } else if (code === -1) {
    console.log("Error, domList is empty");
  } else if (
    dom.password_one.value !== dom.password_two.value
  ) {
    animation.showError();
    return;
  } else {
    let errResponse = null;
    const response = await axios
      .post(backendPath + "/api/register", {
        username: dom.new_username.value,
        password: dom.password_one.value,
      })
      .then((res) => res.data)
      .catch((err) => {
        console.log(err);
        errResponse = err?.response?.data;
      });

    switch (Number(response?.code || errResponse?.code)) {
      case 0:
        animation.showCorrect();
        utils.clearDomValue([
          dom.new_username,
          dom.password_one,
          dom.password_two,
        ]);
        animation.RegisterToLogin();
        break;
      case 1:
        console.log("Already have same username");
        animation.showError();
        break;
      case 2:
        console.log("Password is empty");
        animation.showError();
        break;
      default:
        animation.showUnknown();
        break;
    }
  }
}

async function signOut(event) {
  event.preventDefault();
  utils.clearDomValue([
    dom.username,
    dom.password,
    dom.new_username,
    dom.password_one,
    dom.password_two,
    dom.welcomeUsername,
  ]);
  animation.WelcomeToLogin();
  localStorage.removeItem("token");
}

async function checkToken() {
  const token = localStorage.getItem("token");
  if (!token) return;

  const configuration = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios
      .post(
        backendPath + "/api/login",
        { message: "token" },
        configuration
      )
      .then((res) => res.data);

    if (response.code === 0) {
      dom.welcomeUsername.textContent = response.username;
      animation.LoginToWelcome();
      response.token &&
        localStorage.setItem("token", response.token);
    }
  } catch (err) {
    console.log(err);
    localStorage.removeItem("token");
  }
}

checkToken();
