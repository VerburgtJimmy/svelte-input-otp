<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { focusedIndex, otpArray } from './input-otp-store.js';
	import {
		REGEXP_ONLY_CHARS,
		REGEXP_ONLY_DIGITS,
		REGEXP_ONLY_DIGITS_AND_CHARS,
		type rootProps
	} from './types.js';

	// Get types
	type $$Props = rootProps;

	// Root element options
	export let maxLength: $$Props['maxLength'] = 6;
	export let value: $$Props['value'] = '';
	export let inputName: $$Props['inputName'] = 'otp';
	export let onComplete: $$Props['onComplete'] = () => {};
	export let inputMode: $$Props['inputMode'] = 'numeric';
	export let pattern: $$Props['pattern'] = 'digits';
	export let className: $$Props['className'] = '';
	export let disabled: $$Props['disabled'] = false;
	export let autoFocus: $$Props['autoFocus'] = false;
	export let ariaLabel: $$Props['ariaLabel'] = '';

	// Local variables
	let ref: HTMLInputElement;
	const dispatch = createEventDispatcher();

	// Get the regex pattern
	function getPattern() {
		switch (pattern) {
			case 'digits':
				return REGEXP_ONLY_DIGITS;
			case 'chars':
				return REGEXP_ONLY_CHARS;
			case 'digitsAndChars':
				return REGEXP_ONLY_DIGITS_AND_CHARS;
			default:
				return REGEXP_ONLY_DIGITS;
		}
	}
	// Function to update the store
	function updateOtpArray(otp: string) {
		value = otp;
		otpArray.set(otp.split('').concat(new Array(maxLength! - otp.length).fill('')));
		dispatch('change', otp);

		// Update focusedIndex to the next empty input
		const nextIndex = otp.length < maxLength! ? otp.length : maxLength! - 1;
		focusedIndex.set(nextIndex);

		// Call the onComplete callback when OTP input is fully filled
		if (otp.length === maxLength) {
			onComplete!(otp);
		}
	}

	// Function to handle the input events
	function handleInput(event: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		if (disabled) return;
		const input = (event.target as HTMLInputElement).value;
		const regex = getPattern();

		// Filter out invalid characters based on the regex
		const filteredInput = Array.from(input)
			.filter((char) => regex.test(char))
			.join('');
		const otp = filteredInput.slice(0, maxLength);
		updateOtpArray(otp);

		(event.target as HTMLInputElement).value = otp;
	}

	// Handle paste event
	function handlePaste(event: ClipboardEvent) {
		if (disabled) return;
		const pasteData = event.clipboardData?.getData('text') || '';
		const otp = pasteData.slice(0, maxLength);
		const regex = getPattern();
		if (regex.test(otp)) {
			updateOtpArray(otp);
		}

		event.preventDefault(); // Prevent the default paste behavior
	}

	// Handle unfocus
	function handleBlur() {
		focusedIndex.set(-1);
	}

	// Watch for changes in the value prop from the parent component
	$: if (value !== $otpArray.join('')) {
		const regex = new RegExp(getPattern());

		if (regex.test(value!)) {
			updateOtpArray(value!);
		}
	}

	// Handle keydown event
	function handleKeyDown(event: KeyboardEvent) {
		if (disabled) return;
		if (event.key === 'Backspace') {
			event.preventDefault();
			const otp = (event.target as HTMLInputElement).value.slice(0, -1);
			updateOtpArray(otp);
		}
	}

	// Focus the invisible input
	function focusInvisibleInput() {
		if (disabled) return;

		// Set focusedIndex to the first empty input or to the end of the filled inputs
		otpArray.update((currentOtpArray: string[]) => {
			const nextIndex = currentOtpArray.findIndex((value: string) => value === '');
			focusedIndex.set(nextIndex === -1 ? maxLength! - 1 : nextIndex);
			return currentOtpArray;
		});
	}

	// If disabled or autoFocus is off set the index to -1 to not give the input a focus style
	onMount(() => {
		if (disabled || !autoFocus) {
			focusedIndex.set(-1);
		} else {
			ref!.focus();
			focusInvisibleInput();
		}
	});
</script>

<div class={`otp-root ${className} ${disabled ? 'disabled-input' : ''}`}>
	<slot />
	<!-- svelte-ignore a11y-autocomplete-valid -->
	<input
		name={inputName}
		class="invisible-input"
		bind:this={ref}
		inputmode={inputMode}
		autocomplete="one-time-code"
		{value}
		on:focus={focusInvisibleInput}
		on:blur={handleBlur}
		on:paste={handlePaste}
		on:input={handleInput}
		on:keydown={handleKeyDown}
		maxlength={maxLength}
		aria-label={ariaLabel}
		{disabled}
	/>
</div>

<style>
	.otp-root {
		position: relative;
		cursor: text;
		user-select: none;
		pointer-events: none;
	}

	.invisible-input {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		opacity: 1; /* Mandatory for iOS hold-paste */
		color: transparent;
		pointer-events: all;
		background: transparent;
		caret-color: transparent;
		border: 0 solid transparent;
		outline: 0 solid transparent;
		box-shadow: none;
		letter-spacing: -0.5em;
		font-size: 80px;
		font-family: monospace;
		font-variant-numeric: tabular-nums;
		user-select: none; /* OTP Input selection is not supported */
	}

	.disabled-input {
		opacity: 50%;
	}
</style>
