<script>
import axios from "axios";
import cfg from "@/applicationConfig.json"
axios.interceptors.request.use((config) => {
  config.withCredentials = true;
  return config;
});

export default {
  name: "JoinToRoom",
  data() {
    return {
      roomId: null,
      status: null
    }
  },
  methods: {
    joinToRoom() {
      var thisRef = this
      axios.post(`${cfg.httpUri}/rooms/join`, {
        roomId: Number(this.roomId),
      }, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        auth: {
          username: this.username,
          password: Number(this.password)
        }
      }).then(function (response) {
        thisRef.status = true;
        console.log(response);
        console.log("joined!")
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

<template>
  <h1>Join to room</h1>
  <div class="mb-4">
    <span class="mr-3">Room id: </span>
    <input type="text" v-model="roomId">
  </div>
  <b-button class="mb-4" @click="joinToRoom()">Join</b-button>
  <template v-if="status != null">
    <b-alert show variant="success" v-if="status">Joined!</b-alert>
    <b-alert show variant="danger" v-else>Can't join</b-alert>
  </template>
</template>

<style scoped>

</style>