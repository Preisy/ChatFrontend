<template>
  <h1>Create new room</h1>
  <b-button class="mb-4" @click="createNewRoom()">Create</b-button>
  <b-alert show variant="success" v-if="status">Logged!</b-alert>
</template>

<script>
import axios from "axios";
import cfg from "@/applicationConfig.json"

export default {
  name: "NewRoom",
  data() {
    return {
      username: null,
      password: null,
      status: false,
    }
  },
  methods: {
    createNewRoom() {
      var thisRef = this
      let routerRef = this.$router
      console.log("logging out " + this.username + " " + this.password)
      axios.post(`${cfg.httpUri}/rooms/new`, {}, {
        auth: {
          username: this.username,
          password: Number(this.password)
        }
      }).then(function (response) {
        thisRef.status = true;
        console.log(response);
      }).catch(function (error) {
        thisRef.status = false
        routerRef.push("login")
        console.log(error);
      })
    }
  },
  beforeMount() {
    let userCreds = JSON.parse(localStorage.getItem('userCreds'))
    this.username = userCreds.username
    this.password = userCreds.password
  },
}
</script>

<style scoped>

</style>