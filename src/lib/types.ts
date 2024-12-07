import type { Snippet } from 'svelte';

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

export type inputSnippetProps = {
	/**
	 * Holds all the fields and their data
	 */
	fields: inputProps['field'][];
};

export const REGEXP_ONLY_DIGITS = /^[0-9]*$/;
export const REGEXP_ONLY_CHARS = /[a-zA-Z]/;
export const REGEXP_ONLY_DIGITS_AND_CHARS = /[a-zA-Z0-9]/;
