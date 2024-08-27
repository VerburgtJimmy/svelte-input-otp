// src/otpStore.js
import { writable } from 'svelte/store';

export const otpArray = writable(['']);
export const focusedIndex = writable(-1);
