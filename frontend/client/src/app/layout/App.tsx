import { CssBaseline, Box, createTheme, ThemeProvider } from "@mui/material";

import Header from "./Header";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCartFromLocalStorage } from "../util/util";
import { useAppDispatch } from "../store/configureStores";
import { fetchCurrentUser } from "../../features/account/accountSlice";
import agent from "../api/agent";
import { setCart } from "../../features/cart/cartSlice";
import Spinner from "./Spinner";


function App() {
  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? "dark" : "light";
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);


  useEffect(()=>{
    const cart = getCartFromLocalStorage();
    dispatch(fetchCurrentUser());
    if(cart){
      agent.Cart.get()
      .then(cart=>dispatch(setCart(cart)))
      .catch(error=>console.error(error))
      .finally(()=>setLoading(false))
    }else{
      setLoading(false)
    }

  })

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

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };
  if(loading)return <Spinner message="Pegando o Carrinho..."/>
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored"/>
      <CssBaseline />
      <Box
        display="flex"
        flexDirection="column"
        minHeight="100vh"
        minWidth="100vw"
        bgcolor={theme.palette.background.default}
      >
        <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
        <Outlet />
      </Box>
    </ThemeProvider>
  );
}

export default App;
