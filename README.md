# Svelte-Input-Otp

A unstyled & accessible OTP component for svelte

> [!IMPORTANT]  
> This is still a beta version, so use the package at your own risk in a production environment!

## Installation

```bash
npm install @jimmyverburgt/svelte-input-otp@next
```

## Implementation

An example of the code used to create the OTP component you can see on the website.
This is using tailwind css and using the theme system from shadcn/ui

```svelte
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
	inputName: string;

	/**
	 * The max length which is set to the hidden input. Make sure this is the same as the number of input slots.
	 */
	maxLength: number;

	/**
	 * Set if the entire input otp component needs to be disabled
	 *
	 * @default false
	 */
	disabled: boolean;

	/**
	 * Whether you want to focus the input on mount
	 *
	 * @default false
	 */
	autoFocus: boolean;

	/**
	 * Holds the children with their data
	 */
	children: Snippet<[inputSnippetProps]>;

	/**
	 * Virtual keyboard appearance on mobile
	 *
	 * @default numeric
	 */
	inputMode: 'numeric' | 'text' | 'decimal' | 'tel' | 'search' | 'email' | 'url';

	/**
	 *  Set the regexpattern for allowing only digits, only chars, or both
	 *
	 * @default digits
	 */
	pattern: 'digits' | 'chars' | 'digitsAndChars';

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

	/**
	 * Add support for screen reader to this control
	 */
	ariaLabel?: string;
};
```

### OTPInput

The input container. Define settings for the individual inputs via props.

```ts
export type inputProps = {
	/**
	 * Holds the values for the individual input fields
	 */
	field: {
		char: string | null;
		isActive: boolean;
	};

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

### Snippet

The snippet data.

```ts
export type inputSnippetProps = {
	/**
	 * Holds all the fields and their data
	 */
	fields: inputProps['field'][];
};
```

This is still a work in progress but input is welcome. Thanks
