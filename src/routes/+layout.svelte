<script>
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	import Footer from '../components/footer.svelte';
	import Header from '../components/header.svelte';
	let { children } = $props();
</script>

<ModeWatcher />
<div class="relative flex min-h-[100dvh] flex-col bg-background">
	<Header />
	<main class="flex-1 flex flex-col">{@render children?.()}</main>
	<Footer />
</div>
