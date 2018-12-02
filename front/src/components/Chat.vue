<template>
  <div class="chat">
    <div class="header">
      <div class="title">
        Chat
      </div>
      <div class="erase" @click="eraseMessages">
        Clear all
        <font-awesome-icon class="icon" icon="trash"/>
      </div>
    </div>
    <div class="messages-wrapper">
      <div class="messages">
        <div v-for="message in messages">
          <div class="messageSystem" v-if="message.userName==='System'">
            {{message.content}}
          </div>
          <div class="message" v-else>
            {{message.userName}} : {{message.content}}
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <input class="input"
             v-model="contentMessage"
             type="text"
             @keyup.enter.prevent="sendMessage">
      <div class="send" @click="sendMessage">
        <font-awesome-icon class="icon" icon="paper-plane"/>
        <!--TODO change icon-->
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        messages: [],
        contentMessage: '',
      }
    },
    sockets: {
      messageSent(message) {
        this.messages.push(message)
      },

      //TODO : add message at connect and and disconnect
      // connectedOnProject(userName) {
      //   this.messages.push({
      //     userName: 'System',
      //     content: userName + ' is connected'
      //   })
      // }
    },
    methods: {
      eraseMessages() {
        this.messages = []
      },
      sendMessage() {
        this.messages.push({
              userName: 'Vous',
              content: this.contentMessage
            })
        this.$socket.emit('messageSent', this.contentMessage)
        this.contentMessage = ''
      }
    }
  }
</script>

<style lang="scss">
  @import '../styles/colors';

  .chat {
    color: $white-text;
    height: 100%;
    display: flex;
    flex-direction: column;

    .header {
      padding: 10px;
      color: $grey-text;
      background-color: $darker-background;

      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      .erase {
        cursor: pointer;
        font-size: 13px;
        .icon {
          margin-left: 5px;
          color: $accent;
          font-size: 11px;
        }
      }
    }

    .messages-wrapper {
      background-color: white;
      position: relative;
      flex: 1;

      .messages {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        overflow: auto;
        padding: 10px;

        .message {
          min-height: 10px;
          color: $black-text
        }

        .messageSystem {
          font-family: Inconsolata, monospace;
          text-align: center;
          min-height: 10px;
          color: $system-text;
        }
      }
    }

    .footer {
      padding: 10px;
      background-color: $darker-background;

      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      .input {
        width: 90%;
      }
    }
  }
</style>
