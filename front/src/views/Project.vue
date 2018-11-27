<template>
  <div class="project">
    <Editor />
  </div>
</template>

<script>
  import Editor from '../components/Editor'

  export default {
    components: {Editor},
  }
</script>

<style lang="scss">
  .project {
    height: 100%;
    overflow: hidden;
  }
</style>
