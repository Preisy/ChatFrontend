<script setup>
// import {LayoutPlugin } from  'bootstrap-vue'
</script>
<template>
  <main>
    <nav>
      <h1 style="user-select: none">&nbsp;</h1>
      <b-nav style="user-select: none" vertical pills class="mr-8">
        <b-nav-item to="/">
          Home
        </b-nav-item>
        <br>
        <b-nav-item to="/new">
          Create new Room
        </b-nav-item>
        <br>
        <b-nav-item to="/login">
          Log in or Sign up
        </b-nav-item>
      </b-nav>
    </nav>

    <section>

      <router-view/>

    </section>
  </main>

</template>

<script>
import {defineComponent} from 'vue'
import axios from "axios";
import config from "@/applicationConfig.json"
import router from "@/router";
import HomeComponent from "@/components/HomeComponent.vue";


export default defineComponent({
  components: {HomeComponent},
  // type inference enabled
  props: {
    message: String,
  },
  data() {
    return {
      // username: "Sirgay",
      // password: "123"
    }
  },

  setup(props) {
    props.message // type: string | undefined
  },


  mounted() {

  }
})


</script>

<style>
</style>

<style scoped>


body {
  height: 100vh;

}

main {
  display: flex;
  height: 100%;
}

aside {
  margin-right: 20px;
}

section {
  flex-grow: 1;
}
</style>




