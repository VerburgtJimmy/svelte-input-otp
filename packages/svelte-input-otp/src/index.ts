import Input from "./input-otp-input.svelte";
import Root from "./input-otp-root.svelte";
import Separator from "./input-otp-separator.svelte";

export { Input, Root, Separator };

export type InputType =
  | "numeric"
  | "text"
  | "decimal"
  | "tel"
  | "search"
  | "email"
  | "url";
