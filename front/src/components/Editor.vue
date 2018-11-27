<template>
  <div id="editor">
  </div>
</template>

<script>
  import * as monaco from 'monaco-editor'

  export default {
    mounted() {
      monaco.editor.create(document.getElementById("editor"), {
        value: "function hello() {\n\talert('Hello world!');\n}",
        language: "javascript",
        theme: 'vs-dark'
      });
    }
  }
</script>

<style lang="scss">
  #editor {
    height: 100%;
  }
</style>
