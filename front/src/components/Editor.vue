<template>
  <div id="editor">
  </div>
</template>

<script>
  import * as monaco from 'monaco-editor'

  export default {
    props: ['defaultText'],
    mounted() {
      let editor = monaco.editor.create(document.getElementById("editor"), {
        value: this.defaultText,
        language: 'javascript',
        theme: 'vs-dark',
        quickSuggestions: true,
        wordBasedSuggestions: true
      })
      editor.onDidChangeModelContent(() => {
        this.$emit('text-changed', editor.getValue())
        // TODO send to server every 500ms --> Save last version and last sent version and do a timeout to ignore changes in between
      })
    }
  }
</script>

<style lang="scss">
  #editor {
    height: 100%;
  }
</style>
