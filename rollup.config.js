import resolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";

export default {
  inlineDynamicImports: true,
  input: "src/index.ts",
  output: [
    {
      format: "esm",
      dir: "dist",
      sourcemap: false,
    },
    {
      format: "cjs",
      dir: "dist",
      sourcemap: false,
    },
    {
      name: pkg["umd:name"] || pkg.name,
      format: "umd",
      dir: "dist",
      sourcemap: false,
      plugins: [terser()],
    },
  ],
  external: [
    ...require("module").builtinModules,
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [
    resolve(),
    typescript({
      useTsconfigDeclarationDir: true,
    }),
  ],
};
