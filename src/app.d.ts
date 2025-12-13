// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};

import type { ClassValue as ClsxClassValue } from 'clsx';

declare module 'tailwind-merge' {
	// Make ClassNameValue compatible with clsx's ClassValue
	export type ClassNameValue = ClsxClassValue;
}
