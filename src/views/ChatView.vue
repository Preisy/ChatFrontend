<template>
<TheChat :key="id()" :roomId="id()"  ></TheChat>
</template>

<script>
import TheChat from "@/components/TheChat.vue";
export default {
  name: "ChatView",
  components: {TheChat},
  methods: {
    id() {
      return Number(this.$route.params.id);
    }
  }
}
</script>

<style scoped>

</style>