<template>
  <div class="terminal">
    <div class="title">Results</div>
    <div class="logs">
      <div class="log" v-for="log in logs" :class="{error: log.isError, warn: log.isWarning}">
        {{log.message}}
      </div>
    </div>
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
      font-family: Inconsolata, monospace;

      .log {
        &.error {
          color: $error-text;
        }
        &.warn {
          color: $warn-text;
        }
      }
    }
  }
</style>
