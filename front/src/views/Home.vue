<template>
  <div class="home">
    <div class="content">
      <div class="welcome-text">{{welcomeText}}<span class="cursor"></span></div>
      <div class="buttons" :class="displayButtons ? 'show' : 'hide'">
        <button class="btn" @click="generateProject">Create a project</button>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import {serverUrl} from '../../env';

  export default {
    data() {
      return {
        welcomeText: '',
        welcomeTextToDisplay: 'Ready to write some beautiful code ? ',
        displayButtons: false
      }
    },
    mounted() {
      setTimeout(() => this.displayCharsOneByOne(0), 1000)
    },
    methods: {
      displayCharsOneByOne(charPos) {
        setTimeout(() => {
          this.welcomeText += this.welcomeTextToDisplay.charAt(charPos)
          if(charPos < this.welcomeTextToDisplay.length) {
            this.displayCharsOneByOne(charPos + 1)
          } else {
            this.displayButtons = true
          }
        }, 60)
      },

      generateProject() {
        axios.post(`${serverUrl}/api/projects`).then(response => {
          this.$router.push({name: 'project', params: { hash: response.data }})
        }).catch(err => {
          console.error(err)
        })
      }
    }
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
        white-space: pre-wrap;
        text-align: center;
        padding: 5px;

        .cursor {
          width: 3px;
          height: 26px;
          transform: translateY(3px);
          display: inline-block;
          animation: .9s blink step-end infinite;
          background-color: $accent;
        }
      }

      .buttons {
        margin-top: 30px;
        text-align: center;
        transition: all 1s ease-in-out;

        &.hide {
          opacity: 0;
          height: 0;
        }

        &.show {
          opacity: 1;
          height: 50px;
        }
      }
    }
  }
</style>
