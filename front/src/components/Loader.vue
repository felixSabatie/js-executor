<template>
  <div class="loader">
    <font-awesome-icon class="spinner" icon="cog" />
  </div>
</template>

<style lang="scss">
  @import '../styles/colors';

  .loader {
    color: $white-text;
    text-align: center;

    .spinner {
      font-size: 25px;
      animation: 1.7s spin ease-in-out infinite;

      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        70% {
          transform: rotate(380deg);
        }
        85%, to {
          transform: rotate(360deg);
        }
      }
    }
  }
</style>
