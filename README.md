# input-otp-svelte

One time passcode Input. Accessible &amp; unstyled.

## Implementation

For now since the package is not yet published you need to just copy the files to your project or use npm link to use it locally.

If that is done than you can use the component this way with styles from the react shadcn/ui Input otp component:

```
<script lang="ts">
	// Imports
	import { Input, Root, Separator } from '../../../../../node_modules/svelte-input-otp/src';

    // Callback function for when the component is filled
    function handleOtpComplete(value: string) {
		console.log('OTP Complete:', value);
	}

    // Full otp string
	let otp = '';

    // Called on every input
	function handleOtpChange(event: { detail: string }) {
		otp = event.detail;
		console.log('OTP changed:', otp);
	}
</script>

// Make sure to for now group your otp inputs that are together in a div like you see below.
<Root
	length={6}
	autoFocus={true}
	on:change={handleOtpChange}
	value={otp}
	disabled={false}
	className="flex items-center gap-2"
>
	<div class="flex items-center">
		<Input
			index={0}
			className="relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md"
			focusClassName="z-10 ring-2 ring-ring ring-offset-background"
		/>
		<Input
			index={1}
			className="relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md"
			focusClassName="z-10 ring-2 ring-ring ring-offset-background"
		/>
	</div>

	<Separator separator="-" />
	<div class="flex items-center">
		<Input
			index={2}
			className="relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md"
			focusClassName="z-10 ring-2 ring-ring ring-offset-background"
		/>
		<Input
			index={3}
			className="relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md"
			focusClassName="z-10 ring-2 ring-ring ring-offset-background"
		/>
	</div>
	<Separator separator=" " />
	<div class="flex items-center">
		<Input
			index={4}
			className="relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md"
			focusClassName="z-10 ring-2 ring-ring ring-offset-background"
		/>
		<Input
			index={5}
			className="relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md"
			focusClassName="z-10 ring-2 ring-ring ring-offset-background"
		/>
	</div>
</Root>

```

This is still a work in progress but input is welcome. Thanks
