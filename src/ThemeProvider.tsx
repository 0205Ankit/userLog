import { PropsWithChildren, createContext, useState } from "react";
import { ThemeProvider } from "styled-components";

export enum COLOR_TYPES {
  // Theme based colors
  PRIMARY_BACKGROUND = "PRIMARY_BACKGROUND",
  SECONDARY_BACKGROUND = "SECONDARY_BACKGROUND",
  SECONDARY_TEXT = "SECONDARY_TEXT",
  PRIMARY_TEXT = "PRIMARY_TEXT",
}

export  type Theme = Record<COLOR_TYPES, string>;

const darkTheme: Theme = {
  [COLOR_TYPES.PRIMARY_BACKGROUND]: "#212121",
  [COLOR_TYPES.SECONDARY_BACKGROUND]: "#111111",
  [COLOR_TYPES.SECONDARY_TEXT]: "#D2E9E9",
  [COLOR_TYPES.PRIMARY_TEXT]: "#E3F4F4",
};

const lightTheme: Theme = {
  [COLOR_TYPES.PRIMARY_BACKGROUND]: "#E3F4F4",
  [COLOR_TYPES.SECONDARY_BACKGROUND]: "#D2E9E9",
  [COLOR_TYPES.SECONDARY_TEXT]: "#212121",
  [COLOR_TYPES.PRIMARY_TEXT]: "#111111",
};

const theme = {
  dark: darkTheme,
  light: lightTheme,
};

type contextType = {
  mode: string;
  setMode: React.Dispatch<React.SetStateAction<string>>;
};

export const ThemeContext = createContext<contextType>({
  mode: "light",
  setMode() {},
});

export const ThemeBuilder = (props: PropsWithChildren) => {
  const [mode, setMode] = useState<string>("light");
  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      <ThemeProvider theme={mode === "dark" ? theme.dark : theme.light}>
        {props.children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
