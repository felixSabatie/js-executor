<template>
  <div id="editor">
  </div>
</template>

<script>
  import * as monaco from 'monaco-editor'

  export default {
    data() {
      return {
        editor: {},
        receivingModifications: false
      }
    },
    props: ['defaultText'],
    mounted() {
      this.editor = monaco.editor.create(document.getElementById("editor"), {
        value: this.defaultText,
        language: 'javascript',
        theme: 'vs-dark',
        quickSuggestions: true,
        wordBasedSuggestions: true,
        automaticLayout: true,
      })
      this.editor.onDidChangeModelContent((changes) => {
        if(!this.receivingModifications)
          this.$emit('text-changed', this.editor.getValue(), changes)
      })

      window.addEventListener('resize', () => {
        this.editor.layout()
      })
    },
    sockets: {
      editedText(edits) {
        this.receivingModifications = true
        this.editor.executeEdits('', edits.changes)
        this.$nextTick(() => {
          this.receivingModifications = false
        })
      }
    },
  }
</script>

<style lang="scss">
  #editor {
    height: 100%;
  }
</style>
