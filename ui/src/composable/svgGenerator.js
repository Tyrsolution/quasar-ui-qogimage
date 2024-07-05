import { h } from 'vue';
import { renderToString } from 'vue/server-renderer';
import satori from 'satori';
import { html } from 'satori-html';

export function useOGImageGenerator() {
	async function generateSvg(template, templateProps, config) {
		async function fetchFontData(font) {
			const res = await fetch(font.url);
			const data = await res.arrayBuffer();
			const { url, ...fontAttrib } = font;
			return { ...fontAttrib, data };
		}

		async function getFonts(fonts) {
			return Promise.all(fonts.map(fetchFontData));
		}
		try {
			const fonts = await getFonts(config.fonts);
			const userConfig = { ...config, fonts };
			delete userConfig.fonts;

			const satoriConfig = {
				height: 628,
				width: 1200,
				...userConfig,
				fonts,
			};

			const ogApp = await renderToString(h(template, templateProps));
			const ogHTML = html(ogApp);
			const ogImage = await satori(ogHTML, satoriConfig);
			// needeed to remove width and height attributes from the SVG to make size dynamic
			return ogImage.replace(/width[^"]*"/, '').replace(/height[^"]*"/, '');
		} catch (error) {
			console.error('Error generating OG image:', error);
		}
	}

	return { generateSvg };
}
