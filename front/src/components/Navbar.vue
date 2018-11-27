<template>
  <div class="navbar">
    <router-link :to="{name: 'home'}" class="title item">
      JS EXECUTOR
    </router-link>
    <ul class="content">
      <li class="item">Share</li>
    </ul>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="scss">
  @import '../styles/colors';

  .navbar {
    background-color: $primary;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .title {
      font-weight: bold;
      font-size: 20px;
      padding: 0 10px;
      height: 100%;
    }

    .item {
      list-style: none;
      height: 100%;
      padding: 0 15px;
      cursor: pointer;
      display: flex;
      align-items: center;
      position: relative;
      color: $white-text;
      text-decoration: none;

      &:before {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: $black;
        opacity: 0;
        transition: opacity .2s ease-in-out;
      }

      &:hover {
        &:before {
          opacity: .1;
        }
      }
    }

  .content {
    display: flex;
    flex-direction: row;
    height: 100%;
    margin: 0;
    padding: 0;
    }
  }
</style>
