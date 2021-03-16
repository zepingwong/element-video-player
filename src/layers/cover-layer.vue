<template>
  <div v-show="show" class="vcp-layer cover-layer">
    <img v-if="cover" alt="video cover" :src="cover" />
  </div>
</template>

<script>
/* eslint-disable */
import { EVENTS } from '../constants'
import coreMixins from '../mixins'
import { inject } from 'vue'

export default {
  name: 'CoverLayer',
  mixins: [coreMixins],
  props: {
    visible: Boolean
  },
  setup() {
    const playerKey = inject('playerKey')
    return {
      playerKey
    }
  },
  data() {
    return {
      cover: '',
      show: false
    }
  },
  created() {
    this._playerKey = this.playerKey
  },
  beforeMount() {
    this.on(EVENTS.LIFECYCLE_INITING, (player) => {
      const { cover } = player.config
      if (cover) {
        this.cover = cover
        this.show = true
      }
    })
    this.on(EVENTS.ERROR_AUTO_PLAY, () => {
      this.show = true
    })
    this.on(EVENTS.PLAY, () => {
      this.show = false
    })
    this.on(EVENTS.SEEKED, () => {
      this.show = false
    })
  }
}
</script>

<style lang="scss">
.cover-layer {
  z-index: 11;
  background-color: #333;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
