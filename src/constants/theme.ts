import {
  black,
  blackPearl,
  burntSienna,
  charcoal,
  culturedGrey,
  gray4,
  orangeYellowCrayola,
  persianGreen,
  sandyBrown,
  white,
} from "constants/colors";
import theme from "styled-theming";

export type Theme = {
  mode: "light" | "dark";
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
};

export const initialTheme = {
  mode: "light",
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

export const bodyBackground = theme("mode", {
  light: culturedGrey,
  dark: blackPearl,
});
