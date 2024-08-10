import { CssBaseline, Box } from "@mui/material";
import Catalog from "../../features/catalog/Catalog";
import Header from "./Header";

function App() {

  return (
    <Box display="flex" flexDirection="column" height="100vh" width="100%">
      <CssBaseline />
      <Header />
      <Catalog />
    </Box>
  )
}

export default App;
