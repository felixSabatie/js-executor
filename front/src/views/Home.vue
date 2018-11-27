<template>
  <div class="home">
    <div class="content">
      <div class="welcome-text">
        Ready to write some beautiful code ?
      </div>
      <div class="buttons">
        <button class="btn">Create a project</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="scss">
  @import '../styles/colors';
  
  .home {
    height: 100%;
    background-color: $dark-background;
    color: $white-text;
    display: flex;
    justify-content: center;
    align-items: center;

    .content {
      .welcome-text {
        font-size: 30px;
      }
      .buttons {
        margin-top: 30px;
        text-align: center;
      }
    }
  }
</style>
