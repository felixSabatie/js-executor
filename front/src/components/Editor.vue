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
        decorations: [],
        currentUser: ''
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
      users(users) {
        if(users) {
          let i = 0
          let newDecorations = []
          users.forEach((value) => {
            let [key, user] = value
            if(key !== this.currentUser && user.cursor.lineNumber && user.cursor.column) {
              newDecorations.push({
                range: new monaco.Range(user.cursor.lineNumber, user.cursor.column, user.cursor.lineNumber, user.cursor.column + 1),
                options: { className: 'my-cursor cursor-' + (i % 5 + 1) }
              })

              i++
            }
          })

          this.decorations = this.editor.deltaDecorations(this.decorations, newDecorations)
        }

      },
      currentUser(currentUser) {
        this.currentUser = currentUser
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
