<template>
  <h1>Create new room</h1>
  <b-button class="mb-4" @click="createNewRoom()">Create</b-button>
  <template v-if="status != null">
    <b-alert show variant="success" v-if="status">Created!</b-alert>
    <b-alert show variant="danger" v-else>Can't create</b-alert>
  </template>
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
      status: null,
    }
  },
  methods: {
    createNewRoom() {
      var thisRef = this
      let routerRef = this.$router
      axios.post(`${cfg.httpUri}/rooms/new`, {}, {
        auth: {
          username: this.username,
          password: Number(this.password)
        }
      }).then(function (response) {
        thisRef.status = true;
        console.log(response);
        console.log("created!")
      }).catch(function (error) {
        thisRef.status = false
        console.log(error);
      })
    }
  },
  beforeMount() {
    let userCreds = JSON.parse(sessionStorage.getItem('userCreds'))
    this.username = userCreds.username
    this.password = userCreds.password
  },
}
</script>

<style scoped>

</style>