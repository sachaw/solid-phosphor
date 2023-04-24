import { unlinkSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { variants } from "./generate.js";

const iconSRCPath = "src/icons";

variants.map((variant) => {
	const files = readdirSync(join(process.cwd(), iconSRCPath, variant));
	files.map((file) => {
		if (file.endsWith(".tsx") || file.endsWith(".ts")) {
			unlinkSync(join(process.cwd(), join(iconSRCPath, variant, file)));
		}
	});
});
