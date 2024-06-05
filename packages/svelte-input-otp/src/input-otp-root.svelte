<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import type { InputType } from "./index";
  import { focusedIndex, otpArray } from "./input-otp-store";

  export let length = 6;
  export let autoFocus = false;
  export let value = "";
  export let onComplete = () => {};
  export let inputType: InputType = "numeric";
  export let className: string = "";
  export let disabled: boolean = false;

  let invisibleInput;
  const dispatch = createEventDispatcher();

  function updateOtpArray(otp) {
    otpArray.set(otp.split("").concat(new Array(length - otp.length).fill("")));
    dispatch("change", otp);

    // Update focusedIndex to the next empty input
    const nextIndex = otp.length < length ? otp.length : length - 1;
    focusedIndex.set(nextIndex);

    // Call the onComplete callback when OTP input is fully filled
    if (otp.length === length) {
      onComplete();
    }
  }

  function handleInput(event) {
    if (disabled) return;
    const input = event.target.value;
    const otp = input.slice(0, length);
    updateOtpArray(otp);

    if (input.length >= length) {
      event.target.value = otp;
    }
  }

  function handleFocus(index) {
    if (disabled) return;
    invisibleInput.focus();
    focusedIndex.set(index);
  }

  function handleBlur() {
    focusedIndex.set(-1);
  }

  function handleKeyDown(event) {
    if (disabled) return;
    if (event.key === "Backspace") {
      const otp = event.target.value.slice(0, -1);
      updateOtpArray(otp);
    }
  }

  function focusInvisibleInput() {
    if (disabled) return;

    invisibleInput.focus();
    // Set focusedIndex to the first empty input or to the end of the filled inputs
    otpArray.update((currentOtpArray) => {
      const nextIndex = currentOtpArray.findIndex((value) => value === "");
      focusedIndex.set(nextIndex === -1 ? length - 1 : nextIndex);
      return currentOtpArray;
    });
  }

  onMount(() => {
    updateOtpArray(value);
    if (autoFocus && !disabled) {
      focusedIndex.set(0);
    } else {
      focusedIndex.set(-1);
    }
  });
</script>

<div
  class={`${className} ${disabled ? "disabled-input" : ""}`}
  on:click={focusInvisibleInput}
>
  <slot />
  <input
    autofocus={disabled ? false : autoFocus}
    class="invisible-input"
    bind:this={invisibleInput}
    type={inputType}
    on:blur={handleBlur}
    on:input={handleInput}
    on:keydown={handleKeyDown}
    maxlength={length}
    {disabled}
  />
</div>

<style>
  .otp-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .invisible-input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }

  .disabled-input {
    opacity: 50%;
  }
</style>
