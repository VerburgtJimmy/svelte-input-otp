<script>
	import Github from 'lucide-svelte/icons/github';
	import Twitter from 'lucide-svelte/icons/twitter';
	import DarkmodeSwitch from './darkmode-switch/darkmode-switch.svelte';
	import Button from './ui/button/button.svelte';
</script>

<header
	class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
>
	<div class="container flex h-14 max-w-screen-2xl items-center">
		<div class="flex flex-1 items-center justify-between space-x-2 md:justify-end">
			<nav class="flex items-center">
				<Button
					variant="ghost"
					href="https://github.com/VerburgtJimmy/svelte-input-otp"
					target="_blank"
					rel="noreferrer"
				>
					<div>
						<Github className="h-4 w-4" />
						<span class="sr-only">GitHub</span>
					</div>
				</Button>
				<Button variant="ghost" href="https://x.com/jimmyverburgt" target="_blank" rel="noreferrer">
					<div>
						<Twitter class="h-4 w-4 fill-current" />
						<span class="sr-only">Twitter</span>
					</div>
				</Button>
			</nav>
		</div>
		<DarkmodeSwitch />
	</div>
</header>
