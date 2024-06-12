// src/otpStore.js
import { writable } from 'svelte/store';

export let otpArray = writable(['']);
export let focusedIndex = writable(-1);
