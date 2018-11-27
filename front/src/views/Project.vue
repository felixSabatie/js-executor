<template>
  <div class="project">
    <Editor @text-changed="textChanged" :default-text="defaultText" />
  </div>
</template>

<script>
  import Editor from '../components/Editor'

  export default {
    data() {
      return {
        defaultText: "function hello() {\n\tconsole.log('Hello world!');\n}"
      }
    },
    components: {Editor},
    methods: {
      textChanged(newValue) {
        console.log(newValue)
      }
    }
  }
</script>

<style lang="scss">
  .project {
    height: 100%;
    overflow: hidden;
  }
</style>
