import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import external from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import terser from "@rollup/plugin-terser";
import dts from "rollup-plugin-dts";
import { readFileSync } from "fs";
const packageJson = JSON.parse(readFileSync("./package.json"));

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
        name: "react-lib",
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      external(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      postcss({
        config: {
          path: "./postcss.config.cjs",
        },
        extract: true,
        extensions: [".css"],
        minimize: true,
        inject: {
          insertAt: "top",
        },
      }),
      terser(),
    ],
  },
  {
    input: "dist/esm/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    external: [/\.css$/],
    plugins: [dts()],
  },
];
