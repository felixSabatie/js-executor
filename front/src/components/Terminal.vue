<template>
  <div class="terminal">
    <div class="title">Results</div>
    <div class="logs">{{logs}}</div>
  </div>
</template>

<script>
  export default {
    props: ['logs'],
  }
</script>

<style lang="scss">
  @import '../styles/colors';

  .terminal {
    color: $white-text;

    .title {
      padding: 10px;
      color: $grey-text;
      background-color: $darker-background;
    }

    .logs {
      padding: 10px;
      white-space: pre;
      font-family: Inconsolata, monospace;
    }
  }
</style>
