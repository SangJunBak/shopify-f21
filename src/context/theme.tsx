import { createMuiTheme, useMediaQuery } from "@material-ui/core";
import { ThemeProvider as MaterialThemeProvider } from "@material-ui/styles";
import { darkModePrimary, persianGreen } from "constants/colors";
import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { ThemeProvider as SCThemeProvider } from "styled-components";
import { useStateTuple } from "types/useStateTuple";

const ThemeContext = createContext<useStateTuple<boolean> | null>(null);

export const ThemeProvider: FC = ({ children }) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const isDarkThemeTuple = useState(prefersDarkMode);
  const theme = useMemo(() => {
    const mode = isDarkThemeTuple[0] ? "dark" : "light";
    const materialTheme = createMuiTheme({
      typography: {
        fontFamily: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          '"Roboto"',
          '"Oxygen"',
          '"Ubuntu"',
          '"Cantarell"',
          '"Fira Sans"',
          '"Droid Sans"',
          '"Helvetica Neue"',
          "sans-serif",
        ].join(","),
      },
      palette: {
        type: mode,
        primary: {
          main: isDarkThemeTuple[0] ? darkModePrimary : persianGreen,
        },
      },
    });

    return {
      ...materialTheme,
      mode,
    };
  }, [isDarkThemeTuple]);

  return (
    <ThemeContext.Provider value={isDarkThemeTuple}>
      <MaterialThemeProvider theme={theme}>
        <SCThemeProvider theme={theme}>{children}</SCThemeProvider>
      </MaterialThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const isDarkModeTuple = useContext(ThemeContext);
  if (isDarkModeTuple === null) {
    throw new Error("Need to wrap useTheme within ThemeProvider");
  }

  const toggleDarkMode = useCallback(
    () => isDarkModeTuple[1]((prev) => !prev),
    [isDarkModeTuple]
  );

  return {
    isDarkMode: isDarkModeTuple[0],
    toggleDarkMode,
  };
};
