<script lang="ts">
  import { onMount } from "svelte";
  import { derived } from "svelte/store";
  import { focusedIndex, otpArray } from "./input-otp-store";

  export let index;
  export let className: string = "";
  export let focusClassName: string = "";

  let value = "";
  let isFocused = false;

  otpArray.subscribe((array) => {
    value = array[index] || "";
  });

  focusedIndex.subscribe((focusIndex) => {
    isFocused = focusIndex === index;
  });

  onMount(() => {
    if (index === 0) {
      focusedIndex.set(0);
    }
  });
</script>

<div class={`${className} ${isFocused ? focusClassName : ""}`} tabindex="0">
  {value}
</div>

<style>
  .otp-input {
    width: 2rem;
    padding: 0.5rem;
    margin: 0.25rem;
    text-align: center;
    font-size: 1.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .otp-input.focused {
    border-color: blue;
    background-color: #e0f7fa;
  }
</style>
