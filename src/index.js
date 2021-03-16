import i18n from './helper/i18n'
import ElementVideoPlayer from './ElementVideoPlayer.vue'
import BaseVideoCore from './core/base'
import EVENTS from './constants/EVENTS'
import { setupDirectives } from './directives'

const ElementVideoPlayerPlugin = {
  install(app, options = {}) {
    i18n.setLocale(options.lang)
    setupDirectives(app)
    app.component(ElementVideoPlayer.name, ElementVideoPlayer)
  }
}

export default ElementVideoPlayerPlugin
export {
  BaseVideoCore,
  EVENTS
}
