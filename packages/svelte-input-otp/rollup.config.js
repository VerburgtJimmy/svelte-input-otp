
import nodeResolve from "@rollup/plugin-node-resolve";
import svelte from "rollup-plugin-svelte";
const pkg = require("./package.json");
export default {
    input: "src/index.js",
    output: [
        { file: pkg.module, format: "es" },
        { file: pkg.main, format: "umd", name: "svelte-input-otp" },
    ],
    plugins: [svelte(), nodeResolve()],
};