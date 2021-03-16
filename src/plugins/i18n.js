// 全局注册i18n，为了避免冲突我们并不这样做
import { i18n } from '../helper'

const VuePluginI18n = {
  install(app) {
    app.config.globalProperties.$t = function(expression) {
      return i18n.t(expression)
    }
  }
}

export default VuePluginI18n
