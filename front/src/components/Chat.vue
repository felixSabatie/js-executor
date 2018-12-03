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
        <div v-for="(message, index) in messages" :key="index">
          <div class="message-system" v-if="message.userName==='System'">
            {{message.content}}
          </div>
          <div class="message" v-else>
            <span class="user-name" v-if="index === 0 || messages[index-1].userName !== message.userName">
              {{message.userName}} :
            </span>
            <span class="content">{{message.content}}</span>
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

      userConnected(userName) {
        this.messages.push({
          userName: 'System',
          content: userName + ' connected'
        })
      },

      userDisconnected(userName) {
        this.messages.push({
          userName: 'System',
          content: userName + ' disconnected'
        })
      }
    },
    methods: {
      eraseMessages() {
        this.messages = []
      },
      sendMessage() {
        if (this.contentMessage !== "") {
          this.messages.push({
            userName: 'Vous',
            content: this.contentMessage
          })
          this.$socket.emit('messageSent', this.contentMessage)
          this.contentMessage = ''
        }
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
      background-color: $dark-background;
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
        font-size: 14px;

        .message {
          min-height: 10px;
          color: $white-text;

          .user-name {
            color: $accent
          }
          .content {
          }
        }

        .message-system {
          font-family: Inconsolata, monospace;
          text-align: center;
          min-height: 10px;
          color: $system-text;
          margin: 5px 0;
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
        background-color: $dark-background;
        border: none;
        $input-height: 30px;
        height: $input-height;
        line-height: $input-height;
        border-radius: $input-height;
        color: $white-text;
        outline: none;
        padding: 0 5px 0 15px;
        font-size: 14px;
      }

      .icon {
        margin-left: 5px;
        color: $accent;
        font-size: 11px;
      }
    }
  }
</style>
