import { useOGImageGenerator } from '../composable/svgGenerator';
export default {
	name: 'q-og-image',

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
