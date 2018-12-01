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
        receivingModifications: false,
        cursors: [],
        decorations: []
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
      this.editor.onDidChangeCursorPosition((event) => {
        this.$socket.emit('cursorMoved', event.position)
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
      },
      cursorMoved(infos) {
        this.cursors[infos.id] = infos.position
        console.log(this.cursors)

        let i = 0
        let newDecorations = []
        for(let key in this.cursors) {
          newDecorations.push({
            range: new monaco.Range(this.cursors[key].lineNumber, this.cursors[key].column, this.cursors[key].lineNumber, this.cursors[key].column + 1),
            options: { className: 'my-cursor cursor-' + (i % 5 + 1) }
          })

          i++
        }
        console.log(newDecorations)

        this.decorations = this.editor.deltaDecorations(this.decorations, newDecorations)
      }
    },
  }
</script>

<style lang="scss">
  @import '../styles/colors';

  #editor {
    height: 100%;

    .my-cursor {
      width: 2px !important;
      animation: 1s blink step-end infinite;

      &.cursor-1 {
        background: $accent;
      }
      &.cursor-2 {
        background: $accent2;
      }
      &.cursor-3 {
        background: $accent3;
      }
      &.cursor-4 {
        background: $accent4;
      }
      &.cursor-5 {
        background: $accent5;
      }

      @keyframes blink {
        from, to {
          opacity: 0;
        }
        50% {
          opacity: 1;
        }
      }
    }
  }
</style>
