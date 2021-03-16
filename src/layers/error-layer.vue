<template>
  <div v-show="show" class="vcp-layer error-layer">
   <div class="error-msg-wrap">
     <h2>{{i18n.t('layers.error.title')}}</h2>
     <p class="error-msg">{{errMsg}}</p>
   </div>
  </div>
</template>

<script>
/* eslint-disable */
import { EVENTS } from '../constants'
import coreMixins from '../mixins'
import { i18n } from '../helper'
import { inject } from 'vue'

export default {
  name: 'CoverLayer',
  mixins: [coreMixins],
  props: {
    dsiable: Boolean
  },
  setup() {
    const playerKey = inject('playerKey')
    return {
      i18n,
      playerKey
    }
  },
  data() {
    return {
      errMsg: '',
      show: false
    }
  },
  created() {
    this._playerKey = this.playerKey
  },
  mounted() {
    this.on(EVENTS.ERROR, (e) => {
      this.show = true
      const errorKey = 'layers.error.' + e.code
      this.errMsg = i18n.t(errorKey, '')
    })
  }
}
</script>

<style lang="scss">
.error-layer {
  z-index: 14;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-repeat: repeat;
  text-align: center;
  .error-msg-wrap {
    border-radius: 10px;
    padding: 10px;
    background-color:#00000090;
  }
  .error-msg{
    font-weight: bold;
    color: rgb(255, 255, 255);
  }
}
</style>
