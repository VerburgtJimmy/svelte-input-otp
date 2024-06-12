<script lang="ts">
	import { focusedIndex, otpArray } from './input-otp-store.js';
	import type { inputProps } from './types.js';

	type $$Props = inputProps;

	export let index: $$Props['index'];
	export let className: $$Props['className'] = '';
	export let focusClassName: $$Props['focusClassName'] = '';

	let value = '';
	let isFocused = false;

	otpArray.subscribe((array) => {
		value = array[index] || '';
	});

	focusedIndex.subscribe((focusIndex) => {
		isFocused = focusIndex === index;
	});
</script>

<div class={`${className} ${isFocused ? focusClassName : ''}`} tabindex="-1">
	{value}
</div>
