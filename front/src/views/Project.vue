<template>
  <div class="project" @keyup.ctrl.enter.prevent="run">
    <Navbar @run="run" @save="save" @share="share" :changes-saved="changesSaved" :display-copied-text="displayCopiedText" />
    <div class="project-content" v-if="defaultTextLoaded">
      <div class="editor-container">
        <Editor @user-changed="userChanged" @received-change="receivedChange" :default-text="defaultText" />
      </div>
      <div class="terminal-container">
        <Terminal :logs="logs" @erase-logs="eraseLogs" />
      </div>
      <div class="chat-container">
        <Chat />
      </div>
    </div>

    <div v-else class="loader-container">
      <Loader />
    </div>
  </div>
</template>

<script>
  import Editor from '../components/Editor'
  import Chat from '../components/Chat'
  import Terminal from '../components/Terminal'
  import Navbar from '../components/Navbar'
  import Loader from '../components/Loader'
  import axios from 'axios'
  import {serverUrl} from '../../env'

  export default {
    data() {
      return {
        defaultText: '',
        editorData: '',
        logs: [],
        projectUrl: '',
        changesSaved: true,
        defaultTextLoaded: false,
        timeout: {},
        displayCopiedText: false
      }
    },
    components: {Editor, Chat, Terminal, Navbar, Loader},
    mounted() {
      const projectHash = this.$route.params.hash
      this.projectUrl = `${serverUrl}/api/projects/${projectHash}`

      axios.get(this.projectUrl).then(response => {
        this.defaultText = response.data
        this.editorData = response.data
        this.defaultTextLoaded = true

        this.$socket.emit('connectedOnProject', projectHash)
      }).catch(err => {
        if(err.response && err.response.status === 404) {
          // TODO 404 page
          this.$router.push({name: 'home'})
        } else {
          console.error(err)
        }
      })
    },
    sockets: {
      newLogs(infos) {
        this.logs.push({
          message: `running from ${infos.from}...`,
          isError: false,
          isWarning: false
        })
        this.displayLogs(infos.logs)
      },
      saved() {
        this.changesSaved = true
      }
    },
    methods: {
      textChanged(newValue) {
        this.editorData = newValue
        this.changesSaved = false
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          this.save()
        }, 2000)
      },
      userChanged(newValue, changes) {
        this.textChanged(newValue)
        this.$socket.emit('editedText', changes)
      },
      receivedChange(newValue) {
        this.textChanged(newValue)
      },
      eraseLogs() {
        this.logs = []
      },
      run() {
        this.logs.push({
          message: 'running...',
          isError: false,
          isWarning: false
        })

        this.saveProjectToServer().then(() => {
          this.changesSaved = true

          axios.post(`${serverUrl}/api/projects/${this.$route.params.hash}/execute`).then(response => {
            this.displayLogs(response.data)
            this.$socket.emit('newLogs', response.data)
          })
        }).catch(err => {
          console.error(err)
        })
      },
      displayLogs(logs) {
        this.logs.push(...logs)
        this.logs.push({
          message: ' ',
          isError: false,
          isWarning: false
        })
      },
      save() {
        this.saveProjectToServer().then(() => {
          this.changesSaved = true
        })
      },
      saveProjectToServer() {
        return new Promise((resolve, reject) => {
          axios.put(this.projectUrl, {
            code: this.editorData
          }).then(response => {
            this.$socket.emit('saved')
            resolve(response)
          }).catch(err => reject(err))
        })
      },
      share() {
        navigator.clipboard.writeText(window.location.href).then(() => {
          this.displayCopiedText = true
          setTimeout(() => {
            this.displayCopiedText = false
          }, 2000)
        })
      }
    }
  }
</script>

<style lang="scss">
  @import '../styles/colors';

  .project {
    height: 100%;
    overflow: hidden;
    display: grid;
    background-color: $dark-background;
    grid-template-rows: 50px auto;

    .project-content {
      display: grid;
      grid-template-rows: repeat(2, 1fr);
      grid-template-columns: auto 300px;

      @media screen and (max-width: 601px) {
        grid-template-rows: 6fr 4fr;
        grid-template-columns: auto;
      }

      .editor-container {
        grid-row: 1 / last-line;
        background-color: #1e1e1e;
        padding-top: 10px;

        @media screen and (max-width: 601px) {
          grid-row: 1 / 2;
          grid-column: 1 / last-column;
        }
      }
      .terminal-container {
        grid-column: 2 / 3;
        grid-row: 1 / 2;

        @media screen and (max-width: 601px) {
          grid-row: 2 / last-line;
          grid-column: 1 / last-column;
        }
      }
      .chat-container {
        grid-column: 2 / 3;
        grid-row: 2 / 3;

        @media screen and (max-width: 601px) {
          display: none;
        }
      }
    }

    .loader-container {
      margin-top: 20px;
    }
  }
</style>
