<template>
  <div v-show="show && title.length" class="vcp-layer title-layer">
    <div class="video-title">{{title}}</div>
  </div>
</template>

<script>
/*eslint no-underscore-dangle: 0*/
import { EVENTS } from '../constants'
import coreMixins from '../mixins'
import { inject } from 'vue'

export default {
  name: 'CoverLayer',
  mixins: [coreMixins],
  setup() {
    const playerKey = inject('playerKey')
    return {
      playerKey
    }
  },
  data() {
    return {
      title: '',
      show: false
    }
  },
  created() {
    this._playerKey = this.playerKey
  },
  mounted() {
    this.on(EVENTS.LIFECYCLE_INITING, (player) => {
      const { title } = player.config
      if (title) {
        this.title = title
      }
    })
    this.on(EVENTS.UI_DASHBOARD_SHOW, () => {
      this.show = true
    })
    this.on(EVENTS.UI_DASHBOARD_HIDE, () => {
      this.show = false
    })
  }
}
</script>

<style lang="scss">
.title-layer {
  z-index: 13;
  text-align: left;
  .video-title{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    padding: 8px 16px;
    line-height: 32px;
    font-size: 16px;
    font-weight: bold;
    background-image: linear-gradient(to bottom ,rgba(0,0,0, .4), rgba(0,0,0, 0));
  }
}
</style>
