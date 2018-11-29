<template>
  <div class="terminal">
    <div class="header">
      <div class="title">
        Results
      </div>
      <div class="erase" @click="eraseLogs">
        Clear all
        <font-awesome-icon class="icon" icon="trash" />
      </div>
    </div>
    <div class="logs-wrapper">
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
    data() {
      return {
        domLogs: {}
      }
    },
    props: ['logs'],
    mounted() {
      this.domLogs = this.$el.querySelector('.terminal .logs')
    },
    watch: {
      logs() {
        this.$nextTick(() => {
          this.domLogs.scrollTop = this.domLogs.scrollHeight
        })
      }
    },
    methods: {
      eraseLogs() {
        this.$emit('erase-logs')
      }
    }
  }
</script>

<style lang="scss">
  @import '../styles/colors';

  .terminal {
    color: $white-text;
    height: 100%;
    display: flex;
    flex-direction: column;

    .header {
      padding: 10px;
      color: $grey-text;
      background-color: $darker-background;

      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      .erase {
        cursor: pointer;
        font-size: 13px;
        .icon {
          margin-left: 5px;
          color: $accent;
          font-size: 11px;
        }
      }
    }

    .logs-wrapper {
      position: relative;
      flex: 1;

      .logs {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        overflow: auto;

        padding: 10px;
        font-family: Inconsolata, monospace;

        .log {
          min-height: 10px;
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
