import { h, onMounted, ref } from 'vue';
import { useOGImageGenerator } from '../composable/svgGenerator';

/**
 * Defines a Vue component named 'QOGImage' for generating and displaying Open Graph (OG) images.
 * This component utilizes a custom hook `useOGImageGenerator` to dynamically generate SVG images
 * based on provided templates and configurations. The generated image is then rendered within a `div` element.
 *
 * Props:
 * - template: An Object that represents the SVG template to be used for generating the OG image.
 *              This is required and must be provided for the component to function correctly.
 * - templateProps: An Object containing properties that will be passed to the SVG template. These
 *                  properties can customize the generated SVG image. This prop is required.
 * - config: An Object containing configuration options for the SVG generation process. This includes
 *           settings such as fonts and other SVG options. This prop is also required.
 *
 * The component uses the Vue Composition API's `setup` function to handle the SVG generation process.
 * Within `setup`, it declares a reactive reference `ogImageTemplate` to store the generated SVG image.
 * It then uses the `onMounted` lifecycle hook to asynchronously generate the SVG image when the component
 * is mounted to the DOM. The `generateSvg` method from the `useOGImageGenerator` hook is called with
 * the `template`, `templateProps`, and `config` props to generate the SVG image.
 *
 * The generated SVG image is stored in `ogImageTemplate.value`, and a functional component is returned
 * from `setup` that renders a `div` element with its `innerHTML` set to the generated SVG image, effectively
 * displaying the image within the component's template.
 */
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
		const ogImageTemplate = ref();
		const { generateSvg } = useOGImageGenerator();

		onMounted(async () => {
			ogImageTemplate.value = await generateSvg(props.template, props.templateProps, props.config);
		});

		return () => h('div', { innerHTML: ogImageTemplate.value });
	},
};
