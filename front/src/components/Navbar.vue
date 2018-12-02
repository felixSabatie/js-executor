<template>
  <div class="navbar">
    <router-link :to="{name: 'home'}" class="title item">
      JS EXECUTOR
    </router-link>
    <ul class="content">
      <li class="item" @click="share">
        <span class="text">
          <span v-if="displayCopiedText">URL copied to clipboard !</span>
          <span v-else>Share</span>
        </span>
        <font-awesome-icon class="icon" icon="share-alt" />
      </li>
      <li class="item" @click="save">
        <font-awesome-icon class="icon circle" icon="circle" v-if="!changesSaved" />
        <span class="text">Save</span>
        <font-awesome-icon class="icon" icon="save" />
      </li>
      <li class="item run-button" @click="run">
        <span class="text">Run</span><font-awesome-icon class="icon" icon="play" />
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: ['changesSaved', 'displayCopiedText'],
    methods: {
      run() {
        this.$emit('run')
      },
      save() {
        this.$emit('save')
      },
      share() {
        this.$emit('share')
      }
    }
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

      .text {
        margin-right: 10px;
      }

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

      .run-button {
        .text {
          transition: margin-right .3s ease-in-out;
        }
        .icon {
          transition: transform .3s ease-in-out;
        }

        &:hover {
          .text {
            margin-right: 15px;
          }
          .icon {
            transform: scale(1.2);
          }
        }
      }

      .circle {
        margin-right: 5px;
        font-size: 10px;
      }
    }
  }
</style>
