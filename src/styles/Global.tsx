import { AppTheme } from "theme/type";

declare module 'styled-components' {
    export interface DefaultTheme extends AppTheme {}
  }