<template>
  <div v-show="show" ref="dashboard" class="vcp-dashboard" autoplay>
    <Progress />
    <Controls :muted="muted" />
  </div>
</template>

<script>
/*eslint no-underscore-dangle: 0*/
import { DEFAULT_CONFIG, EVENTS } from '../constants'
import { isDescendant } from '../helper/dom'
import { isMobile } from '../helper/util'
import Progress from './progress'
import Controls from './controls'
import coreMixins from '../mixins'
import { inject } from 'vue'

const pageCoor = {
  x: null,
  y: null
}

export default {
  name: 'Dashboard',
  components: {
    Progress,
    Controls
  },
  mixins: [coreMixins],
  props: {
    controls: [Boolean, String],
    muted: Boolean
  },
  setup() {
    const playerKey = inject('playerKey')
    return {
      playerKey
    }
  },
  data() {
    return {
      show: true
    }
  },
  created() {
    this._playerKey = this.playerKey
  },
  mounted() {
    const { controls } = this
    if (!controls) {
      this.show = false
    } else if (controls === 'fixed') {
      this.show = true
    } else {
      this._initAutoMode()
    }
  },
  methods: {
    showDashboard(delay) {
      window.clearTimeout(this._hideTimeout)
      this.show = true
      this.emit(EVENTS.UI_DASHBOARD_SHOW)
      if (delay === 0) {
        // TODO handle force show
      } else {
        this._hideTimeout = setTimeout(() => {
          this.hideDashboard()
        }, delay || DEFAULT_CONFIG.dashboardHideDelay)
      }
    },
    hideDashboard() {
      this.show = false
      this.emit(EVENTS.UI_DASHBOARD_HIDE)
    },
    _initAutoMode() {
      const $parent = this.$refs.dashboard.parentNode
      if (isMobile) {
        $parent.addEventListener('touchend', this._onTouchend.bind(this), true)
      } else {
        $parent.addEventListener('mousemove', this._onMousemove.bind(this))
        $parent.addEventListener('mouseleave', this._onMouseleave.bind(this))
        $parent.addEventListener('mouseover', this._onMouseover.bind(this), true)
      }
      this.showDashboard(DEFAULT_CONFIG.dashboardHideDelay)
    },
    _onMousemove(e) {
      if (e.pageX === pageCoor.x && e.pageY === pageCoor.y) {
        pageCoor.x = e.pageX
        pageCoor.y = e.pageY
        return
      }
      pageCoor.x = e.pageX
      pageCoor.y = e.pageY
      if (isDescendant(this._el, e.target)) {
        return this.showDashboard(0)
      }
      this.showDashboard()
    },

    _onMouseleave() {
      this.showDashboard(200)
    },
    _onMouseover() {
      this.showDashboard(0)
    },
    _onTouchend() {
      this.showDashboard()
    }
  }
}
</script>

<style lang="scss">
.vcp-dashboard {
  z-index: 12;
  position: absolute;
  left: 0;
  bottom: 0;
  width: calc(100% - 40px);
  margin-left: 20px;
  height: 59px;
  background: rgba(0,0,0,.2);
}
.fullscreen .vcp-dashboard {
  bottom: 60px;
}
.small  .vcp-dashboard{
  height: 49px;
}
.settings-open .vcp-dashboard {
  display: block !important;
}
.small  .vcp-dashboard .vcp-controls {
  height: 40px;
}
</style>
