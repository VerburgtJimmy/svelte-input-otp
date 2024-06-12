<script lang="ts">
	import Copy from 'lucide-svelte/icons/copy';
	import { mode } from 'mode-watcher';
	import rehypePrettyCode from 'rehype-pretty-code';
	import rehypeStringify from 'rehype-stringify';
	import remarkParse from 'remark-parse';
	import remarkRehype from 'remark-rehype';
	import { onMount } from 'svelte';
	import { unified } from 'unified';
	import { Button } from '../ui/button/index.js';
	function copyToClipboardWithMeta(value: string) {
		window && window.isSecureContext && navigator.clipboard.writeText(value);
	}

	export let code: string;
	let innerHTMLDark: string = '';
	let innerHTMLLight: string = '';
	async function highlightCode(code: string, dark: boolean) {
		const file = await unified()
			.use(remarkParse)
			.use(remarkRehype)
			.use(rehypePrettyCode, {
				keepBackground: false,
				theme: dark ? 'vesper' : 'github-light'
			})
			.use(rehypeStringify)
			.process(code);

		console.log(String(file));
		return String(file);
	}
	onMount(async () => {
		const copy = `\`\`\`svelte showLineNumbers \n${code}\n\`\`\``;
		innerHTMLDark = await highlightCode(copy, true);
		innerHTMLLight = await highlightCode(copy, false);
	});
</script>

<div class="relative">
	{@html $mode == 'dark' ? innerHTMLDark : innerHTMLLight}
	<div class="absolute top-4 right-4">
		<Button variant="ghost" on:click={() => copyToClipboardWithMeta(code)}
			><div>
				<Copy class="h-4 w-4" />
				<span class="sr-only">copy</span>
			</div>
		</Button>
	</div>
</div>
