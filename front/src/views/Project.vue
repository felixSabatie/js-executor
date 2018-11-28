<template>
  <div class="project">
    <Navbar @run="run" @save="save" :changes-saved="changesSaved" />
    <div class="project-content" v-if="defaultTextLoaded">
      <div class="editor-container">
        <Editor @text-changed="textChanged" :default-text="defaultText" />
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
      }
    },
    components: {Editor, Chat, Terminal, Navbar, Loader},
    mounted() {
      this.projectUrl = `${serverUrl}/api/projects/${this.$route.params.hash}`

      axios.get(this.projectUrl).then(response => {
        this.defaultText = response.data
        this.defaultTextLoaded = true
      }).catch(err => {
        if(err.response && err.response.status === 404) {
          // TODO 404 page
          this.$router.push({name: 'home'})
        } else {
          console.error(err)
        }
      })
    },
    methods: {
      textChanged(newValue) {
        this.editorData = newValue
        this.changesSaved = false
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
            this.logs.push(...response.data)
          })
        }).catch(err => {
          console.error(err)
        })
      },
      save() {
        this.saveProjectToServer().then(() => {
          this.changesSaved = true
        })
      },
      saveProjectToServer() {
        return axios.put(this.projectUrl, {
          code: this.editorData
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

      .editor-container {
        grid-row: 1 / last-line;
        background-color: #1e1e1e;
        padding-top: 10px;
      }
      .terminal-container {
        grid-column: 2 / 3;
        grid-row: 1 / 2;
      }
      .chat-container {
        grid-column: 2 / 3;
        grid-row: 2 / 3;
      }
    }

    .loader-container {
      margin-top: 20px;
    }
  }
</style>
