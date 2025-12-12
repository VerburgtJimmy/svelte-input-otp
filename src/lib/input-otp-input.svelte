<script lang="ts">
	import type { inputProps } from './types.js';

	type $$Props = inputProps;

	interface Props {
		field: $$Props['field'];
		className?: $$Props['className'];
		focusClassName?: $$Props['focusClassName'];
	}

	let { field, className = '', focusClassName = '' }: Props = $props();
</script>

<div class={`${className} ${field.isActive ? focusClassName : ''}`} tabindex="-1">
	{field.char}
</div>
