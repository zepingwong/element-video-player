<template>
  <div class="vue-core-video-player-control timespan">
    <span class="time-current">{{currentTime}}</span>
    <span class="time-split"> / </span>
    <span class="time-duration">{{duration}}</span>
  </div>
</template>

<script>
/*eslint no-underscore-dangle: 0*/
import { EVENTS } from '../constants'
import coreMixins from '../mixins'
import { secondsToTime } from '../helper/util'
import { inject } from 'vue'

export default {
  name: 'TimeSpan',
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
      currentTime: '00:00',
      duration: '--:--'
    }
  },
  created() {
    this._playerKey = this.playerKey
  },
  beforeMount() {
    this.on(EVENTS.TIMEUPDATE, () => {
      const currentTime = this.$player.getCurrentTime()
      if (!currentTime) {
        return
      }
      this.currentTime = secondsToTime(currentTime)
      const newDuration = this.$player.getDuration()
      if (newDuration !== this.duration) {
        this.duration = secondsToTime(newDuration)
      }
    })
    this.on(EVENTS.DURATIONCHANGE, () => {
      const newDuration = this.$player.getDuration()
      this.duration = secondsToTime(newDuration)
    })
  }
}
</script>

<style lang="scss">
.vue-core-video-player-control.timespan {
  line-height: 30px;
  width: 140px;
  font-family: Arial,serif !important;
}
</style>
