<script lang="ts">
	import { Check, Copy } from 'lucide-svelte';
	import { Button } from '../ui/button/index.js';

	let code = 'npm install @jimmyverburgt/svelte-otp-input';
	let copied = false;
	function copyToClipboardWithMeta(value: string) {
		window && window.isSecureContext && navigator.clipboard.writeText(value);
		copied = true;
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
