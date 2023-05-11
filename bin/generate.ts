import { readFileSync, writeFile, existsSync } from "node:fs";
import { join } from "node:path";
import { icons } from "@phosphor-icons/core";

export const variants = ["bold", "duotone", "fill", "light", "regular", "thin"];

const iconSRCPath = "src/icons";

variants.map((variant) => {
  icons.map((icon) => {
    const iconPath = `node_modules/@phosphor-icons/core/assets/${variant}/${
      icon.name
    }${variant !== "regular" ? `-${variant}` : ""}.svg`;

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

    const template = `//Generated file, do not edit
import { Component } from "solid-js";
import { PhosphorIcon } from "../../index.js";

export const ${icon.pascal_name}: Component<PhosphorIcon> = (props) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 256 256"
			fill="currentColor"
			height="24px"
			width="24px"
			{...props}
		>
      <title>${icon.name}</title>
			${svg}
		</svg>
	);
};`;

    writeFile(
      join(process.cwd(), `${iconSRCPath}/${variant}/${icon.pascal_name}.tsx`),
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
});

variants.forEach((variant) => {
  const variantIndexFile = `// Generated file, do not edit
${icons
  .map((icon) => {
    const iconPath = join(
      process.cwd(),
      `src/icons/${variant}/${icon.pascal_name}.tsx`,
    );
    const exists = existsSync(iconPath);
    return exists
      ? `export { ${icon.pascal_name} as ${icon.pascal_name}Icon, ${icon.pascal_name} } from "./${icon.pascal_name}.jsx";`
      : "";
  })
  .join("\n")}
`;

  writeFile(
    join(process.cwd(), `src/icons/${variant}/index.ts`),
    variantIndexFile,
    (err) => {
      if (err) {
        return console.log(`Could not write index.ts for ${variant}`);
      }
      console.log(`index.ts file for ${variant} created successfully.`);
    },
  );
});
