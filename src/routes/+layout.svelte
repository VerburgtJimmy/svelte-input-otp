<script>
	import Footer from 'components/footer.svelte';
	import Header from 'components/header.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import { Confetti } from 'svelte-confetti';
	import '../app.css';
</script>

<ModeWatcher />
<div class="relative flex min-h-[100dvh] flex-col bg-background">
	<Header />
	<main class="flex-1 flex flex-col"><slot /></main>
	<Footer />
</div>
