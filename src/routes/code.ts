export const code = `
<script lang="ts"> 
	import { OTPInput, OTPRoot } from '@jimmyverburgt/svelte-input-otp'; 
    import Minus from 'lucide-svelte/icons/minus';

	// Set default value if you want to
	let value = $state('12');

	function handleOtpComplete(code: string) {
		console.log('OTP Complete:', code);
	}

	function handleOtpChange(event: { detail: string }) {
		console.log('OTP changed:', event.detail);
	}
</script> 

<OTPRoot
	maxLength={6}
	ariaLabel="Svelte OTP Code"
	on:change={handleOtpChange}
	bind:value
	autoFocus={true}
	onComplete={handleOtpComplete}
	className="flex items-center gap-2"
>
	{#snippet children({ fields })}
		<div class="flex items-center">
			{#each fields.slice(0, 3) as field}
				<OTPInput
					{field}
					className="relative flex w-10 md:w-16 h-14 md:h-20 items-center justify-center border-y border-r border-input text-3xl transition-all first:rounded-l-md first:border-l last:rounded-r-md"
					focusClassName="z-10 ring-2 ring-ring ring-offset-background"
				/>
			{/each}
		</div>
		<div class="mx-1">
			<Minus />
		</div>
		<div class="flex items-center">
			{#each fields.slice(3, 6) as field}
				<OTPInput
					{field}
					className="relative flex w-10 md:w-16 h-14 md:h-20 items-center justify-center border-y border-r border-input text-3xl transition-all first:rounded-l-md first:border-l last:rounded-r-md"
					focusClassName="z-10 ring-2 ring-ring ring-offset-background"
				/>
			{/each}
		</div>
	{/snippet}
</OTPRoot>
`;
