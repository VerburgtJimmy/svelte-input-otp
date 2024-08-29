<script lang="ts">
	import Check from 'lucide-svelte/icons/check';
	import Copy from 'lucide-svelte/icons/copy';
	import { Button } from '../ui/button/index.js';

	let code = 'npm install @jimmyverburgt/svelte-input-otp';
	let copied = false;
	function copyToClipboardWithMeta(value: string) {
		if (window && window.isSecureContext) {
			navigator.clipboard.writeText(value);
			copied = true;
		}

		setTimeout(() => {
			copied = false;
		}, 2500);
	}
</script>

<Button class="mr-2" variant="outline" on:click={() => copyToClipboardWithMeta(code)}>
	{code}
	{#if copied}
		<Check class="ml-3 h-3 w-3" />
	{:else}
		<Copy class="ml-3 h-3 w-3" />
	{/if}
</Button>
