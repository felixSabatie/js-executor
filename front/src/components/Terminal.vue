<template>
  <div class="terminal-wrapper">
    <div class="terminal">
      <div class="title">Results</div>
      <div class="logs">
        <div class="log" v-for="log in logs" :class="{error: log.isError, warn: log.isWarning}">
          {{log.message}}
        </div>
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

  .terminal-wrapper {
    position: relative;
    height: 100%;

    .terminal {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;

      color: $white-text;
      overflow: auto;

      .title {
        padding: 10px;
        color: $grey-text;
        background-color: $darker-background;
        position: sticky;
        top: 0;
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
  }
</style>
