import * as BoldIcons from "./icons/bold/index.js";
import * as DuotoneIcons from "./icons/duotone/index.js";
import * as FillIcons from "./icons/fill/index.js";
import * as LightIcons from "./icons/light/index.js";
import * as RegularIcons from "./icons/regular/index.js";
import * as ThinIcons from "./icons/thin/index.js";
import type { Component, JSX } from "solid-js";

type PhosphorIconProps = JSX.SvgSVGAttributes<SVGSVGElement>;
type PhosphorIcon = Component<PhosphorIconProps>;

export {
  BoldIcons,
  DuotoneIcons,
  FillIcons,
  LightIcons,
  RegularIcons,
  ThinIcons,
};

export type {
  PhosphorIconProps,
  PhosphorIcon,
}