import { boot } from 'quasar/wrappers'
import VuePlugin from 'quasar-ui-qogimage'

export default boot(({ app }) => {
  app.use(VuePlugin)
})
