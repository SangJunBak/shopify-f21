import {
  black,
  burntSienna,
  charcoal,
  gray4,
  orangeYellowCrayola,
  persianGreen,
  sandyBrown,
  white,
} from "constants/colors";
import { baseSpacingRem } from "constants/variables";
import theme from "styled-theming";

export type Theme = {
  mode: "light" | "dark";
  spacing: (scale?: number) => string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
};

export const initialTheme = {
  mode: "light",
  spacing: (scale = 1) => `${scale * baseSpacingRem}rem`,
};

export const primaryColor = theme("mode", {
  dark: charcoal,
  light: burntSienna,
});

export const secondaryColor = theme("mode", {
  dark: persianGreen,
  light: orangeYellowCrayola,
});

export const accentColor = theme("mode", {
  dark: sandyBrown,
  light: sandyBrown,
});
