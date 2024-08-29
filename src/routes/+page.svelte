<script lang="ts">
	import { OTPInput, OTPRoot } from '$lib/index.js';
	import Minus from 'lucide-svelte/icons/minus';
	import Confetti from 'svelte-confetti';
	import CodeBlock from '../components/code-block/code-block.svelte';
	import CopyButton from '../components/copy-button/copy-button.svelte';
	import Button from '../components/ui/button/button.svelte';
	import { code } from './code.js';

	let correct: boolean = false;

	let value = '12';

	function handleOtpComplete(code: string) {
		console.log('OTP Complete:', code);
		if (code == '123456') {
			correct = true;
		}
	}

	function handleOtpChange(event: { detail: string }) {
		console.log('OTP changed:', event.detail);
	}
</script>

{#if correct}
	<div
		style="
 position: fixed;
 top: -50px;
 left: 0;
 height: 100vh;
 width: 100vw;
 display: flex;
 justify-content: center;
 overflow: hidden;
 pointer-events: none;"
	>
		<Confetti
			x={[-5, 5]}
			y={[0, 0.1]}
			delay={[500, 2000]}
			duration={5000}
			amount={200}
			fallDistance="100vh"
		/>
	</div>
{/if}
<div class="container relative flex flex-col justify-center items-center">
	<div class="mx-auto max-w-2xl pt-64 text-center">
		<div class="relative flex flex-col">
			<h1 class="relative mb-4 text-7xl font-semibold">Svelte-Input-Otp</h1>
			<p class="text-xl text-gray-600">A unstyled & accessible OTP component for svelte</p>
		</div>
	</div>
	<div class="my-10">
		<OTPRoot
			ariaLabel='Svelte OTP Code'
			inputMode="numeric"
			maxLength={6}
			on:change={handleOtpChange}
			bind:value
			autoFocus={true}
			onComplete={handleOtpComplete}
			pattern="digits"
			className="flex items-center gap-2"
		>
			<div class="flex items-center">
				<OTPInput
					index={0}
					className="relative flex w-10 md:w-16 h-14 md:h-20 items-center justify-center border-y border-r border-input text-3xl transition-all first:rounded-l-md first:border-l last:rounded-r-md"
					focusClassName="z-10 ring-2 ring-ring ring-offset-background"
				/>
				<OTPInput
					index={1}
					className="relative flex w-10 md:w-16 h-14 md:h-20 items-center justify-center border-y border-r border-input text-3xl transition-all first:rounded-l-md first:border-l last:rounded-r-md"
					focusClassName="z-10 ring-2 ring-ring ring-offset-background"
				/>
				<OTPInput
					index={2}
					className="relative flex w-10 md:w-16 h-14 md:h-20 items-center justify-center border-y border-r border-input text-3xl transition-all first:rounded-l-md first:border-l last:rounded-r-md"
					focusClassName="z-10 ring-2 ring-ring ring-offset-background"
				/>
			</div>
			<div class="mx-1">
				<Minus />
			</div>
			<div class="flex items-center">
				<OTPInput
					index={3}
					className="relative flex w-10 md:w-16 h-14 md:h-20 items-center justify-center border-y border-r border-input text-3xl transition-all first:rounded-l-md first:border-l last:rounded-r-md"
					focusClassName="z-10 ring-2 ring-ring ring-offset-background"
				/>
				<OTPInput
					index={4}
					className="relative flex w-10 md:w-16 h-14 md:h-20 items-center justify-center border-y border-r border-input text-3xl transition-all first:rounded-l-md first:border-l last:rounded-r-md"
					focusClassName="z-10 ring-2 ring-ring ring-offset-background"
				/>
				<OTPInput
					index={5}
					className="relative flex w-10 md:w-16 h-14 md:h-20 items-center justify-center border-y border-r border-input text-3xl transition-all first:rounded-l-md first:border-l last:rounded-r-md"
					focusClassName="z-10 ring-2 ring-ring ring-offset-background"
				/>
			</div>
		</OTPRoot>
	</div>
	<div class="mt-5">
		<CopyButton />
		or
		<Button href="https://github.com/VerburgtJimmy/svelte-input-otp" target="_blank" variant="link"
			>See GitHub <span aria-hidden="true">→</span></Button
		>
	</div>

	<div class="w-full mt-36 relative">
		<h2 class="relative mb-4 text-3xl font-semibold text-center">Implementation</h2>
		<p class="text-lg text-gray-600 text-center mb-5">
			An example of the code used to create the OTP component you see above. <br />This is using
			tailwind css and using the theme system from shadcn/ui
		</p>
		<CodeBlock {code} />
	</div>
</div>
