import { readdirSync, unlinkSync } from "node:fs";
import { join } from "node:path";
import { variants } from "./generate.js";

const iconSrcPath = "src/icons";

variants.map((variant) => {
  const files = readdirSync(join(process.cwd(), iconSrcPath, variant));
  files.map((file) => {
    if (file.endsWith(".tsx") || file.endsWith(".ts")) {
      unlinkSync(join(process.cwd(), join(iconSrcPath, variant, file)));
    }
  });
});
