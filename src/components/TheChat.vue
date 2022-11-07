<script>
import cfg from "../applicationConfig.json"
import axios from "axios";
import SendMessageIcon from "@/components/assets/SendMessageIcon.vue";


export default {
  name: "TheChat",
  components: {SendMessageIcon},
  props: {
    roomId: Number
  },

  data: function () {
    return {
      username: null,
      password: null,

      connection: null,
      chatMessages: [],
      newMessage: null
    }
  },
  methods: {
    sendMessage(event) {
      console.log("message sent")
      let obj = {
        roomId: this.roomId,
        memberId: 1,
        message: this.newMessage
      }
      console.log(obj)
      this.connection.send(JSON.stringify(obj))
      console.log(event)
      this.newMessage = ""
    },
    isMyMessage(message) {
      console.log(`isMyMessage: memberUsername ${message.username} == myUsername ${this.username}`)
      if (message.memberName === this.username) {
        return true
      } else {
        return false
      }
    },
    setHomeHeight() {
      console.log("asdfgdsadfgrewdfsb")
      let home = document.querySelector(".home")
      if (home == null) {
        console.error(".home in TheChat.vue is nul!!!!!")
      } else {
        home.style.height = home.clientHeight + "px"
      }
    },
    setUserCreds() {
      let userCreds = JSON.parse(localStorage.getItem("userCreds"))
      this.username = userCreds.username
      this.password = userCreds.password
    },
    getMessages() {
      let thisRef = this;
      // let routerRef = this.$router
      (() => {
        axios.get(`${cfg.httpUri}/rooms/${this.roomId}/messages`, {
          auth: {
            username: this.username,
            password: this.password
          },
        }).then(function (response) {
          thisRef.chatMessages = response.data
          console.log(thisRef.messages);
        }).catch(function (error) {
          console.log(error);
          // routerRef.push('login');
        })
      })();
    },
    initWebSockets() {
      this.chatMessages = "12"
      this.connection = new WebSocket(cfg.wsUri + "/rooms/" + this.roomId + "/" + 1)
      this.connection.onopen = function (event) {
        console.log("opened")
        console.log(event)
      }
      let thisRef = this
      this.connection.onmessage = function (event) {
        console.log("message received")

        thisRef.chatMessages.push(JSON.parse(event.data))
      }

      this.connection.onabort = function (event) {
        console.log("connection adorted")
        console.log(event)
      }
      this.connection.onclose = function (event) {
        console.log("connection closed")
        console.log(event)
      }
    }

  },
  created() {
    console.log("created");
    this.setHomeHeight();

    this.setUserCreds()

    this.getMessages();

    this.initWebSockets();
  },
  beforeUnmount() {
    console.log("connection closing")
    this.connection.close()
  }
}

</script>


<template>
  <p style="position: absolute;
              top: -2.5em;">
    Room {{ roomId }}
  </p>

  <div class="the_chat">
    <div class="chat">
      <div class="messages">
        <div v-if="chatMessages.length !== 0"
             v-for="message in chatMessages"
             :class="`message ${isMyMessage(message) ? 'my' : ''}`">
          <div class="logo mr-3">{{ message.memberId }}</div>
          <div>
            <span class="author">{{ message.memberName }}</span>
            <div class="msg">{{ message.message }}</div>
          </div>
        </div>
        <p v-else style="margin: 0 auto;width: fit-content;">
          There is no messages yet(
        </p>

      </div>


    </div>
    <div class="new_message">
      <textarea rows="1" type="text" v-model="newMessage" @keyup.enter="sendMessage($event)"></textarea>
      <button @click="sendMessage($event)">
        <SendMessageIcon/>
      </button>
    </div>
  </div>


</template>

<style scoped>

.the_chat {
  height: 100%;
  display: flex;
  flex-direction: column;
}


.chat {
  /*height: 100%;*/
  flex-grow: 1;
  position: relative;
  overflow: auto;
  overflow-y: scroll;
}

.new_message {
  /*left: 50%;*/
  /*transform: translate(-50%);*/
  white-space: nowrap;
  display: flex;
  box-shadow: 0px -6px 1px 0px rgb(24 24 24 / 94%);
  margin: 0 auto;
}

.new_message textarea {
  background: #656565;
  border: none;
  outline: none;
  padding: 8px 22px 12px;
  font-size: 1.3rem;
  border-radius: 15px;
  resize: none;
}

button {
  background-color: transparent;
  border: none;
  outline: none;
  user-select: none;
}

button svg {
  width: 2rem;
}

.messages .message {
  display: flex;
  margin-bottom: 15px;
  align-items: center;
  clear: both;
}

.messages .message.my {
  float: right;
}

.messages .message .logo,
.messages .message .msg {
  background: #888888b0;
  padding: 15px;
  width: fit-content;
  color: #000;
  font-size: 1.10rem;
}
.messages .message.my .logo,
.messages .message.my .msg {
  background-color: hsla(160, 100%, 37%, 0.2);
  color: #ebebebb0;
}

.messages .message .author {
  color: #ebebebb0;
}

.messages .message .logo {
  padding: 4px 14px;
  aspect-ratio: 1 / 1;
  border-radius: 50px;
}

.messages .message .msg {
  padding: 9px 15px 12px;
  border-radius: 18px;
}




::-webkit-scrollbar {
  width: 10px;
  background-color: transparent;
}

::-webkit-scrollbar-track {
}

::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background: #888;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>