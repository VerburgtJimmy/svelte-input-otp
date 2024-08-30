export const code = `
<script lang="ts"> 
	import { OTPInput, OTPRoot } from '@jimmyverburgt/svelte-input-otp'; 
    import Minus from 'lucide-svelte/icons/minus';

	let otpref: any; 

	// Set start value 
	let value = '12'; 

	function handleOtpComplete(otp: string) { 
		console.log('OTP Complete:', otp); 
		// Reset value 
		value = '';
	} 

	function handleOtpChange(event: { detail: string }) { 
		console.log('OTP changed:', value); 
	} 
</script> 

<OTPRoot 
	bind:this={otpref} 
	maxLength={6} 
	on:change={handleOtpChange}
	bind:value
	autoFocus={true}
	onComplete={handleOtpComplete}
	className="flex items-center gap-2"
	inputMode="numeric"
	ariaLabel='Svelte OTP Code'
> 
	<div class="flex items-center">
		<OTPInput
			index={0}
			className="relative flex h-20 w-16 items-center justify-center border-y border-r border-input text-3xl transition-all first:rounded-l-md first:border-l last:rounded-r-md"
			focusClassName="z-10 ring-2 ring-ring ring-offset-background"
		/>
		<OTPInput
			index={1}
			className="relative flex h-20 w-16 items-center justify-center border-y border-r border-input text-3xl transition-all first:rounded-l-md first:border-l last:rounded-r-md"
			focusClassName="z-10 ring-2 ring-ring ring-offset-background"
		/>
		<OTPInput
			index={2}
			className="relative flex h-20 w-16 items-center justify-center border-y border-r border-input text-3xl transition-all first:rounded-l-md first:border-l last:rounded-r-md"
			focusClassName="z-10 ring-2 ring-ring ring-offset-background"
		/>
	</div>
	<div class="mx-1">
		<Minus />
	</div>
	<div class="flex items-center">
		<OTPInput
			index={3}
			className="relative flex h-20 w-16 items-center justify-center border-y border-r border-input text-3xl transition-all first:rounded-l-md first:border-l last:rounded-r-md"
			focusClassName="z-10 ring-2 ring-ring ring-offset-background"
		/>
		<OTPInput
			index={4}
			className="relative flex h-20 w-16 items-center justify-center border-y border-r border-input text-3xl transition-all first:rounded-l-md first:border-l last:rounded-r-md"
			focusClassName="z-10 ring-2 ring-ring ring-offset-background"
		/>
		<OTPInput
			index={5}
			className="relative flex h-20 w-16 items-center justify-center border-y border-r border-input text-3xl transition-all first:rounded-l-md first:border-l last:rounded-r-md"
			focusClassName="z-10 ring-2 ring-ring ring-offset-background"
		/>
	</div>
</OTPRoot>
`;
