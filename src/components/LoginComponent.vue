<template>
  <div class="login">
    <h1>Login</h1>
    <div class="mb-4">
      <span class="mr-3">Username: </span>
      <input type="text" v-model="username">
    </div>
    <div class="mb-4">
      <span class="mr-3">Password: </span>
      <input type="text" v-model="password">
    </div>
    <div class="mb-4">
      <b-button class="mr-4" @click="login()" @keyup.enter="login()">Log in</b-button>
      <b-button class="mr-8" @click="signup()">Sign up</b-button>
      <b-button v-if="isLogged" @click="logout()">Log out</b-button>
    </div>

    <b-alert show variant="success" v-if="isLogged == true">Logged!</b-alert>
    <b-alert show variant="danger" v-else-if="isLogged == null">Please log in</b-alert>
    <b-alert show variant="danger" v-else>{{ errorMessage }}</b-alert>
  </div>
</template>


<script>
import axios from "axios";
import cfg from "@/applicationConfig.json"

export default {
  name: 'LoginComponent',
  data() {
    return {
      id: 1,
      username: "Sirgay",
      password: "12",
      isLogged: false,
      errorMessage: "Please log in"
    }
  },
  methods: {
    saveLocalStorage() {
      localStorage.setItem("userCreds", JSON.stringify({
        username: this.username,
        password: this.password,
        isLogged: this.isLogged
      }))
    },
    removeLocalStorage() {
      localStorage.removeItem("userCreds");
      this.id = null
      this.username = null
      this.password = null
      this.isLogged = null
    },
    login() {
      var thisRef = this
      console.log("logging in" + this.username + " " + this.password)
      axios.post(`${cfg.httpUri}/login`, {
            "name": this.username,
            "password": Number(this.password)
          }
      ).then(function (response) {
        thisRef.errorMessage = null
        thisRef.isLogged = true
        let res = JSON.parse(response.data)
        thisRef.id = res.id;
        console.log(response);
      }).catch(function (error) {
        thisRef.errorMessage = error.response.data
        thisRef.isLogged = false
        console.log(error.response);
      }).finally(function () {
        thisRef.saveLocalStorage()
      })
    },
    signup() {
      var thisRef = this
      console.log("signing up " + this.username + " " + this.password)
      axios.post(`${cfg.httpUri}/signup`, {
            "name": this.username,
            "password": Number(this.password)
          }
      ).then(function (response) {
        thisRef.errorMessage = null
        thisRef.isLogged = true
        let res = JSON.parse(response.data)
        thisRef.id = res.id;
        console.log(response);
      }).catch(function (error) {
        thisRef.errorMessage = error.response.data
        thisRef.isLogged = false
        console.log(error);
      }).finally(function () {
        thisRef.saveLocalStorage()
      })
    },
    logout() {
      var thisRef = this
      console.log("logging out " + this.username + " " + this.password)
      axios.post(`${cfg.httpUri}/logout`, {}, {
        auth: {
          username: this.username,
          password: Number(this.password)
        }
      }).then(function (response) {
        thisRef.errorMessage = "Please log in"
        thisRef.isLogged = false
        thisRef.removeLocalStorage()
        console.log(response);
      }).catch(function (error) {
        thisRef.errorMessage = "Please log in"
        thisRef.isLogged = false
        thisRef.removeLocalStorage()
      }).finally(function () {
        thisRef.saveLocalStorage()
      })
    },
    beforeMount() {
      let userCreds = JSON.parse(localStorage.getItem('userCreds'))
      this.username = userCreds.username
      this.password = userCreds.password
      this.isLogged = userCreds.isLogged
      if (this.isLogged)
        this.errorMessage = "Logged!"
      else
        this.errorMessage = "Please log in"

    },

  }
}
</script>

<style scoped>
input {
  border-radius: 5px;
  outline: none;
}

.login {
  width: fit-content;
}
</style>