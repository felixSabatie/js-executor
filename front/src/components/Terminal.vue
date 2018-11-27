<template>
  <div class="terminal">
    <h1>Terminal</h1>
    <div class="logs">
      {{logs}}
    </div>
  </div>
</template>

<script>
  export default {
    props: ['logs']
  }
</script>

<style lang="scss">
  @import '../styles/colors';

  .terminal {
    color: $white-text;

    .logs {
      white-space: pre;
    }
  }
</style>
