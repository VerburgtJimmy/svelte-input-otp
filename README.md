# Svelte-Input-Otp

A unstyled & accessible OTP component for svelte

## Installation

```bash
npm install @jimmyverburgt/svelte-input-otp
```

## Implementation

An example of the code used to create the OTP component you can see on the website.
This is using tailwind css and using the theme system from shadcn/ui

```svelte
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
	inputMode="numeric"
	ariaLabel="Svelte OTP Code"
	bind:this={otpref}
	maxLength={6}
	on:change={handleOtpChange}
	bind:value
	autoFocus={true}
	onComplete={handleOtpComplete}
	className="flex items-center gap-2"
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
```

## API Reference

### OTPRoot

The root container. Define settings for the input via props.

```ts
export type rootProps = {
	/**
	 * The input otp value from the hidden input
	 */
	value?: string;

	/**
	 * The input name value. If the OTP component is placed inside a form element. The value can be retrieved using this name
	 *
	 * @default otp
	 */
	inputName?: string;

	/**
	 * The max lenght which is set to the hidden input. Make sure this is the same as the number of input slots.
	 */
	maxLength?: number;

	/**
	 * Set if the entire input otp component needs to be disabled
	 *
	 * @default false
	 */
	disabled?: boolean;

	/**
	 * Whether you want to focus the input on mount
	 *
	 * @default false
	 */
	autoFocus?: boolean;

	/**
	 * Virtual keyboard appearance on mobile
	 *
	 * @default numeric
	 */
	inputNumeric?: 'numeric' | 'text' | 'decimal' | 'tel' | 'search' | 'email' | 'url';

	/**
	 *  aria-label for the input
	 *
	 * @default left
	 */
	ariaLabel: string;

	/**
	 *  Set the regexpattern for allowing only digits, only chars, or both
	 *
	 * @default digits
	 */
	pattern?: 'digits' | 'chars' | 'digitsAndChars';

	/**
	 * The function that is called when the input otp is correctly filled in.
	 * @param code
	 * @returns
	 */
	onComplete?: (code: string) => unknown;

	/**
	 * @todo Add this functionality
	 */
	// pushPasswordManagerStrategy?: "increase-width" | "none";

	/**
	 * Insert your classes for the component here.
	 */
	className?: string;
};
```

### OTPInput

The input container. Define settings for the individual inputs via props.

```ts
export type inputProps = {
	/**
	 * Indicates the index of the input slot
	 */
	index: number;

	/**
	 * Insert your classes for the component here.
	 */
	className?: string;

	/**
	 * Insert your classes for the component here when the component is focussed.
	 */
	focusClassName?: string;
};
```

This is still a work in progress but input is welcome. Thanks
