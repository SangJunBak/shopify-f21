import {
  blackPearl,
  darkModePrimary,
  gray1,
  gray2,
  gray4,
  initial,
  persianGreen,
  white,
} from "constants/colors";
import theme from "styled-theming";

export const primaryColor = theme("mode", {
  light: persianGreen,
  dark: darkModePrimary,
});

export const background = theme("mode", {
  light: gray1,
  dark: blackPearl,
});

export const surface = theme("mode", {
  light: white,
  dark: gray4,
});

export const higherSurface = theme("mode", {
  light: "#ebedf0",
  dark: "rgba(255, 255, 255, 0.15)",
});

export const textColor = theme("mode", {
  dark: white,
  light: initial,
});

export const placeholderTextColor = theme("mode", {
  dark: "rgba(255, 255, 255, 0.3)",
  light: "rgba(0, 0, 0, 0.26)",
});

export const divider = theme("mode", {
  dark: gray4,
  light: gray2,
});

export const href = theme("mode", {
  dark: white,
  light: "#2196f3",
});
