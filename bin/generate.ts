import { existsSync, readFileSync, writeFile } from "node:fs";
import { join } from "node:path";
import { icons } from "@phosphor-icons/core";

export const variants = ["bold", "duotone", "fill", "light", "regular", "thin"];

const iconSrcPath = "src/icons";

variants.map((variant) => {
  icons.map((icon) => {
    const iconPath =
      `node_modules/@phosphor-icons/core/assets/${variant}/${icon.name}${variant !== "regular" ? `-${variant}` : ""
      }.svg`;

    const exists = existsSync(join(process.cwd(), iconPath));

    if (!exists) {
      return console.log(
        `Could not find icon ${icon.name} of variant ${variant}.`,
      );
    }

    const data = readFileSync(join(process.cwd(), iconPath), "utf8");

    const svg = data.substring(
      data.indexOf("><") + 1,
      data.lastIndexOf("><") + 1,
    );

    const template = `
import { Component } from "solid-js";
import { PhosphorIconProps } from "../../index.js";

export const ${icon.pascal_name}Icon: Component<PhosphorIconProps> = (props) => {
	return (
		<svg
			viewBox="0 0 256 256"
			fill="currentColor"
			height="16px"
			width="16px"
			{...props}
		>
			${svg}
		</svg>
	);
};`;

    writeFile(
      join(process.cwd(), `${iconSrcPath}/${variant}/${icon.pascal_name}.tsx`),
      template,
      (err) => {
        if (err) {
          return console.log(
            `Could not write icon ${icon.name} of variant ${variant}.`,
          );
        }
      },
    );
  });

  const indexTemplate = icons.map((icon) => {
    return `export { ${icon.pascal_name}Icon } from './${icon.pascal_name}.jsx';`;
  }).join('\n');

  writeFile(
    join(process.cwd(), `${iconSrcPath}/${variant}/index.ts`),
    indexTemplate,
    (err) => {
      if (err) {
        return console.log(`Could not write index file for ${variant}.`);
      }
    },
  );
});
