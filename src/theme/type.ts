import { BaseType } from "./base";
import { ColorType } from "./colors";
import { LayoutType } from "./layout";
import { VisibilityType } from "./visibility";

export interface AppTheme {
    colors: ColorType
    layout: LayoutType
    visibility: VisibilityType
    base: BaseType
  }
  