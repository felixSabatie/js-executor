<template>
  <div class="project">
    <Navbar @run="run" />
    <div class="project-content">
      <div class="editor-container">
        <Editor @text-changed="textChanged" :default-text="defaultText" />
      </div>
      <div class="terminal-container">
        <Terminal :logs="logs" />
      </div>
      <div class="chat-container">
        <Chat />
      </div>
    </div>
  </div>
</template>

<script>
  import Editor from '../components/Editor'
  import Chat from '../components/Chat'
  import Terminal from '../components/Terminal'
  import Navbar from '../components/Navbar'
  import axios from 'axios'
  import {serverUrl} from '../../env'

  export default {
    data() {
      return {
        defaultText: "function hello() {\n\tconsole.log('Hello world!');\n}\n\nhello();",
        editorData: "function hello() {\n\tconsole.log('Hello world!');\n}\n\nhello();",
        logs: ''
      }
    },
    components: {Editor, Chat, Terminal, Navbar},
    methods: {
      textChanged(newValue) {
        this.editorData = newValue
      },
      run() {
        this.logs += 'running...\n'
        axios.post(`${serverUrl}/api/projects/aze/execute`, {
          function: this.editorData
        }).then(response => {
          this.logs += response.data
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
  }
</style>
