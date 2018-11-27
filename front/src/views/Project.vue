<template>
  <div class="project">
    <Navbar />
    <div class="project-content">
      <Editor @text-changed="textChanged" :default-text="defaultText" />
    </div>
  </div>
</template>

<script>
  import Editor from '../components/Editor'
  import Chat from '../components/Chat'
  import Terminal from '../components/Terminal'
  import Navbar from '../components/Navbar'

  export default {
    data() {
      return {
        defaultText: "function hello() {\n\tconsole.log('Hello world!');\n}"
      }
    },
    components: {Editor, Chat, Terminal, Navbar},
    methods: {
      textChanged(newValue) {
        console.log(newValue)
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
  }
</style>
