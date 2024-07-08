import { useOGImageGenerator } from '../composable/svgGenerator';
export default {
	name: 'q-og-image',

	/**
	 * This function is an asynchronous mounted lifecycle hook in a Vue.js directive.
	 * It is responsible for generating an SVG image and injecting it into the element
	 * where the directive is applied.
	 *
	 * @param {HTMLElement} el - The DOM element where the directive is bound. This is where
	 *                            the generated SVG will be injected.
	 * @param {Object} binding - An object containing the values passed to the directive. It
	 *                           should have the following properties:
	 *    - value.template: A string or template reference indicating which SVG template to use.
	 *    - value.templateProps: An object containing properties that will be passed to the
	 *                            template for generating the SVG.
	 *    - value.config: An optional configuration object for further customization of the
	 *                    SVG generation process.
	 *
	 * The function uses a custom hook `useOGImageGenerator` to access the `generateSvg` method,
	 * which takes the template, template properties, and configuration object to generate an SVG image.
	 * Once the SVG is generated, it sets the `innerHTML` of the bound element to the generated SVG,
	 * effectively rendering the image in the DOM.
	 */
	async mounted(el, binding) {
		const { generateSvg } = useOGImageGenerator();
		const generatedImage = await generateSvg(
			binding.value.template,
			binding.value.templateProps,
			binding.value.config,
		);
		el.innerHTML = generatedImage;
	},
};
