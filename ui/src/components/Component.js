import { h, onMounted, ref } from 'vue'
import { renderToString } from 'vue/server-renderer'
import satori from 'satori'
import { html } from 'satori-html'

export default {
  name: 'QOGImage',
  props: {
    template: {
      type: Object,
      required: true,
    },
    templateProps: {
      type: Object,
      required: true,
    },
    config: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const ogImageTemplate = ref()

    async function fetchFontData(font) {
      const res = await fetch(font.url)
      const data = await res.arrayBuffer()
      const { url, ...fontAttrib } = font
      return { ...fontAttrib, data }
    }

    async function getFonts(fonts) {
      return Promise.all(fonts.map(fetchFontData))
    }

    onMounted(async () => {
      try {
        const fonts = await getFonts(props.config.fonts)
        const userConfig = { ...props.config, fonts }
        delete userConfig.fonts

        const config = {
          height: 628,
          width: 1200,
          ...userConfig,
          fonts,
        }

        const ogApp = await renderToString(h(props.template, props.templateProps))
        const ogHTML = html(ogApp)
        ogImageTemplate.value = await satori(ogHTML, config)
      } catch (error) {
        console.error('Error generating OG image:', error)
      }
    })

    return () => h('div', { innerHTML: ogImageTemplate.value })
  },
}
