<template>
  <div v-show="show" class="vcp-layer loading-layer">
    <div class="loading-wrap">
      <div class="h5-layer-loading">
        <svg class="spinner" width="100%" height="100%" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad" gradientUnits="objectBoundingBox" gradientTransform="rotate(135 0.5 0.5)">
              <stop offset="0%" stop-color="#ff6060" />
              <stop offset="100%" stop-color="#fa3b3b" />
            </linearGradient>
          </defs>
          <circle class="path" stroke="url(#grad)" stroke-width="10" fill="none" stroke-linecap="round" cx="40" cy="40" r="30"></circle>
        </svg>
      </div>
      <p>{{i18n.t('layers.loading.msg')}}</p>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { EVENTS } from '../constants'
import coreMixins from '../mixins'
import { inject } from 'vue'
import i18n from '../helper/i18n'
const showTimeout = 600

export default {
  name: 'LoadingLayer',
  mixins: [coreMixins],
  setup() {
    const playerKey = inject('playerKey')
    return {
      i18n,
      playerKey
    }
  },
  data() {
    return {
      show: false
    }
  },
  created() {
    this._playerKey = this.playerKey
  },

  beforeMount() {
    // safari trigger canplaythrough
    this.on([EVENTS.CANPLAY, EVENTS.CANPLAYTHROUGH, EVENTS.PLAY, EVENTS.LOADEDMETADATA, EVENTS.SEEKED, EVENTS.ERROR], () => {
      this.hideLoading()
    })
    this.on([EVENTS.SEEKING, EVENTS.STALLED, EVENTS.LOADSTART], (item) => {
      this.showLoading()
    })
    this.on(['playing'], () => {
      this.hideLoading()
    })
  },

  methods: {
    showLoading(isForce) {
      if (isForce) {
        this.show = true
        return
      }
      window.clearTimeout(this._timeout)
      this._timeout = setTimeout(() => {
        this.show = true
      }, showTimeout)
    },
    hideLoading() {
      window.clearTimeout(this._timeout)
      this.show = false
    }
  }
}
</script>

<style lang="scss">

.loading-layer {
  z-index: 16;
  background-color: #333;
  .loading-wrap{
    position: absolute;
    left: 50%;
    top: 50%;
    width: 120px;
    height: 80px;
    margin-top: -40px;
    margin-left: -60px;
    text-align: center;
  }
  .h5-layer-loading {
    position: relative;
    width: 40px;
    height: 40px;
    margin: 0 auto;
    .spinner {
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      animation: rotator 1.4s linear infinite;
    }

    p {
      padding-top: 20px;
    }

    @keyframes rotator {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(270deg); }
    }

    .path {
      stroke-dasharray: 188.8;
      stroke-dashoffset: 188.8;
      transform-origin: center;
      //transform:rotate(450deg);
      animation: dash 1.4s ease-in-out infinite;
    }
    .dot1 {
      stroke-dasharray: 188.8;
      stroke-dashoffset: 187.8;
      transform-origin: center;
     // transform:rotate(135deg);
     animation: dot1a 1.4s ease-in-out infinite;
    }
    .dot2{
      stroke-dasharray: 188.8;
      stroke-dashoffset: 187.8;
      transform-origin: center;
      animation: dot2a 1.4s ease-in-out infinite forwards;
    }

    @keyframes dash {
     0% { stroke-dashoffset: 188.8; }
     50% {
       stroke-dashoffset: 188.8/4;
       transform:rotate(135deg);
     }
     100% {
       stroke-dashoffset: 188.8;
       transform:rotate(450deg);
     }
    }
    @keyframes dot1a {
     0% {
       stroke-dashoffset: 188.8;
       transform:rotate(0);
     }
     50% {
       stroke-dashoffset: 187.8;
       transform:rotate(135deg);
     }
     100% {
       stroke-dashoffset: 188.8;
       transform:rotate(450deg);
     }
    }
    @keyframes dot2a {
     0% {
       stroke-dashoffset: 188.8;
       transform:rotate(0deg); }
     50% {
       stroke-dashoffset: 187.8;
       transform:rotate(415deg);
     }
     100% {
       stroke-dashoffset: 188.8;
       transform:rotate(450deg);
     }
    }
  }
}
</style>
