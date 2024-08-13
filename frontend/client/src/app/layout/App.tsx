import { CssBaseline, Box, createTheme, ThemeProvider } from "@mui/material";

import Header from "./Header";
import { useState } from "react";
import { Outlet } from "react-router-dom";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? "dark" : "light";
  const theme = createTheme({
    palette: {
      mode: paletteType,
      primary: {
        main: '#3a0040',
        light: '#E9DB5D',
        dark: '#A29415',

        contrastText: '#E9DB5D',
      },
      secondary: {
        main: '#f30a0a',
        light: '#f30a0a',
        dark: '#f30a0a',
        contrastText: 'f30a0a',
      },
      background: {
        default: darkMode ? '#000' : '#fff',
        paper: darkMode ? '#000' : '#fff',
      },
    },
  });

  const handlerThemeChange = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        display="flex"
        flexDirection="column"
        minHeight="100vh"
        minWidth="100vw"
        bgcolor={theme.palette.background.default}
      >
        <Header darkMode={darkMode} handlerThemeChange={handlerThemeChange} />
        <Outlet />
      </Box>
    </ThemeProvider>
  );
}

export default App;
