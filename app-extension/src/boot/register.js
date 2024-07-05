import { boot } from 'quasar/wrappers'
import VuePlugin from '@tyrsolutions/quasar-ui-qogimage'

export default boot(({ app }) => {
  app.use(VuePlugin)
})
