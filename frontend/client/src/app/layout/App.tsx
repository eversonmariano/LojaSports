import { CssBaseline, Box, createTheme, ThemeProvider } from "@mui/material";
import Catalog from "../../features/catalog/Catalog";
import Header from "./Header";
import { useState } from "react";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? "dark" : "light";
  const theme = createTheme({
    palette: {
      mode: paletteType,
      primary: {
        main: '#FF0000',
        light: '#000',
        
        contrastText: '#fff',
      },
      secondary: {
        main: '#4a148c',
        light: '#4a148c',
        dark: '#4a148c',
        contrastText: '#4a148c',
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
        <Catalog />
      </Box>
    </ThemeProvider>
  );
}

export default App;
