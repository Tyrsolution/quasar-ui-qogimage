import { h } from 'vue';
import { renderToString } from 'vue/server-renderer';
import satori from 'satori';
import { html } from 'satori-html';

/**
 * Provides a function to generate Open Graph (OG) images dynamically using SVG templates.
 * This function is part of a custom hook designed for use in applications that require
 * dynamically generated images for social media previews or other purposes.
 *
 * The `useOGImageGenerator` function encapsulates the `generateSvg` function, which
 * performs the core functionality of generating an SVG image based on provided templates,
 * template properties, and configuration options.
 *
 * @returns {Object} An object containing the `generateSvg` method.
 */
export function useOGImageGenerator() {
	/**
	 * Generates an SVG image based on a template, its properties, and configuration.
	 *
	 * @param {Function} template - A Vue component or a render function that returns an SVG.
	 * @param {Object} templateProps - Properties to pass to the template for rendering the SVG.
	 * @param {Object} config - Configuration options for SVG generation, including fonts and other settings.
	 * @returns {Promise<string>} A promise that resolves with the generated SVG image as a string.
	 */
	async function generateSvg(template, templateProps, config) {
		/**
		 * Fetches font data from a URL and returns font attributes excluding the URL.
		 *
		 * @param {Object} font - An object containing font attributes, including a URL to fetch the font data.
		 * @returns {Promise<Object>} A promise that resolves with an object containing font attributes and data.
		 */
		async function fetchFontData(font) {
			const res = await fetch(font.url);
			const data = await res.arrayBuffer();
			const { url, ...fontAttrib } = font;
			return { ...fontAttrib, data };
		}

		/**
		 * Fetches data for multiple fonts.
		 *
		 * @param {Array<Object>} fonts - An array of font objects to fetch data for.
		 * @returns {Promise<Array<Object>>} A promise that resolves with an array of font objects including fetched data.
		 */
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

			console.log('template: ', template);

			const ogApp = await renderToString(h(template, templateProps));
			const ogHTML = html(ogApp);
			console.log('html string:', ogHTML);
			const ogImage = await satori(ogHTML, satoriConfig);
			// needeed to remove width and height attributes from the SVG to make size dynamic based on parent size
			return ogImage.replace(/width[^"]*"/, '').replace(/height[^"]*"/, '');
		} catch (error) {
			console.error('Error generating OG image:', error);
		}
	}

	return { generateSvg };
}
