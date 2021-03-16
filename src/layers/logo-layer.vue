<template>
  <div v-if="logo" class="vcp-layer logo-layer">
    <div class="logo-wrap">
      <img alt="logo" :src="logo" />
    </div>
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
      logo: ''
    }
  },
  created() {
    this._playerKey = this.playerKey
  },

  mounted() {
    this.on(EVENTS.LIFECYCLE_INITING, (player) => {
      const { logo } = player.config
      if (logo) {
        this.logo = logo
      }
    })
  }
}
</script>

<style lang="scss">
.logo-layer {
  z-index: 13;
  text-align: left;
  .logo-wrap{
    position: absolute;
    top: 15px;
    right: 15px;
    opacity: .8;
    text-align: right;
    img {
      max-width: 160px;
      height: 48px;
    }
  }
}
</style>
