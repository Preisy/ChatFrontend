<template>
  <div class="home_component_container">
    <h1 style="user-select: none">Home</h1>
    <section class="home">
      <nav>
        <b-nav style="width: fit-content; user-select: none" vertical pills class="mr-8">
          <!--      <RoomPreview v-for="room in rooms" :room-id="room.id"></RoomPreview>-->
          <template v-for="room in rooms">
            <b-nav-item :to="{
              name: 'chat',
                params: {
                  id: room.id
                }
              }" style="white-space: nowrap">
              Room {{ room.id }}
            </b-nav-item>
            <br>
          </template>
        </b-nav>
      </nav>

      <section style="position: relative">
        <RouterView/>
      </section>

    </section>
  </div>
</template>

<script>
import axios from "axios";
import cfg from "@/applicationConfig.json"


export default {
  name: 'HomeComponent',
  components: {},
  data() {
    let userCreds = JSON.parse(localStorage.getItem('userCreds'))
    return {
      username: userCreds.username,
      password: userCreds.password,
      rooms: []
    }
  },


  created: function () {
    console.log("getting rooms", this.username, this.password)
    let thisRef = this
    let routerRef = this.$router
    axios.get(`${cfg.httpUri}/rooms`, {
      auth: {
        username: this.username,
        password: this.password
      },
    }).then(function (response) {
      thisRef.rooms = response.data
      console.log(thisRef.rooms);
    }).catch(function (error) {
      console.log(error);
      routerRef.push('login');
    })

  }
}
</script>

<style scoped>
.home_component_container {
  height: 100%;
  display: flex;
  align-content: stretch;
  flex-direction: column;
}

.home {
  display: flex;
  /*position: absolute;*/
  /*bottom: 0;*/
}


section {
  flex-grow: 1;
}

</style>