import resolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
//import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";

export default {
  inlineDynamicImports: true,
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
    },
    {
      file: pkg.module,
      format: 'es',
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
