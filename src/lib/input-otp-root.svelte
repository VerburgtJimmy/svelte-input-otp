<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import {
		REGEXP_ONLY_CHARS,
		REGEXP_ONLY_DIGITS,
		REGEXP_ONLY_DIGITS_AND_CHARS,
		type rootProps
	} from './types.js';

	// Get types
	type $$Props = rootProps;

	interface Props {
		// Root element options
		maxLength?: $$Props['maxLength'];
		value?: $$Props['value'];
		inputName?: $$Props['inputName'];
		onComplete?: $$Props['onComplete'];
		inputMode?: $$Props['inputMode'];
		pattern?: $$Props['pattern'];
		className?: $$Props['className'];
		disabled?: $$Props['disabled'];
		autoFocus?: $$Props['autoFocus'];
		ariaLabel?: $$Props['ariaLabel'];
		children?: $$Props['children'];
	}

	let {
		maxLength = 6,
		value = $bindable(''),
		inputName = 'otp',
		onComplete = () => {},
		inputMode = 'numeric',
		pattern = 'digits',
		className = '',
		disabled = false,
		autoFocus = false,
		ariaLabel = '',
		children
	}: Props = $props();

	// Saves the focused index state
	let focusedIndex = $state(-1);

	// Updates the cells individual value and active state when the value changes
	const fields = $derived.by(() =>
		Array.from({ length: maxLength }).map((_, idx) => {
			const isActive = focusedIndex == idx;
			const char = value[idx] !== undefined ? value[idx] : null;
			return {
				char,
				isActive
			};
		})
	);

	// Sets the snippetProps if the cells change
	const snippetProps = $derived.by(() => ({
		fields: fields
	}));

	// Local variables
	let ref: HTMLInputElement = $state()!;
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
	function updateOtp(otp: string) {
		value = otp;
		dispatch('change', otp);

		// Update focusedIndex to the next empty input
		updateFocus(otp);

		// Call the onComplete callback when OTP input is fully filled
		if (otp.length === maxLength) {
			onComplete!(otp);
		}
	}

	// Function to update focusedIndex to the next empty input or the last input if the max length has been reached
	function updateFocus(otp: string) {
		focusedIndex = otp.length < maxLength! ? otp.length : maxLength! - 1;
	}

	// Function to handle the input events
	function handleInput(event: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		if (disabled) return;

		const inputElement = event.currentTarget;
		const input = inputElement.value;
		const regex = getPattern();

		// Filter and construct the input string directly
		let filteredInput = '';
		for (const char of input) {
			if (regex.test(char)) {
				filteredInput += char;
			}
		}

		// Limit the input to maxLength and update OTP
		const otp = filteredInput.slice(0, maxLength);
		updateOtp(otp);
	}

	// Handle paste event
	function handlePaste(event: ClipboardEvent) {
		if (disabled) return;
		const pasteData = event.clipboardData?.getData('text') || '';
		const otp = pasteData.slice(0, maxLength);
		const regex = getPattern();

		// Filter and construct the input string directly
		let filteredInput = '';
		for (const char of otp) {
			if (regex.test(char)) {
				filteredInput += char;
			}
		}

		// Update otp value
		updateOtp(filteredInput);

		event.preventDefault(); // Prevent the default paste behavior
	}

	// Handle unfocus
	function handleBlur() {
		focusedIndex = -1;
	}

	// Handle keydown event
	function handleKeyDown(event: KeyboardEvent) {
		if (disabled) return;
		if (event.key === 'Backspace') {
			console.log('backspace');
			event.preventDefault();
			const otp = (event.target as HTMLInputElement).value.slice(0, -1);
			updateOtp(otp);
		}
	}

	// Focus the invisible input
	function focusInvisibleInput() {
		if (disabled) return;

		// Set focusedIndex to the first empty input or to the end of the filled inputs
		updateFocus(value);
	}

	// If disabled or autoFocus is off set the index to -1 to not give the input a focus style
	onMount(() => {
		if (disabled || !autoFocus) {
			focusedIndex = -1;
		} else {
			ref!.focus();
			focusInvisibleInput();
		}
	});
</script>

<div class={`otp-root ${className} ${disabled ? 'disabled-input' : ''}`}>
	{@render children?.(snippetProps)}

	<input
		name={inputName}
		class="invisible-input"
		bind:this={ref}
		inputmode={inputMode}
		autocomplete="one-time-code"
		{value}
		onfocus={focusInvisibleInput}
		onblur={handleBlur}
		onpaste={handlePaste}
		oninput={handleInput}
		onkeydown={handleKeyDown}
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
