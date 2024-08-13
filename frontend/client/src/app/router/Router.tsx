import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import Catalog from "../../features/catalog/Catalog";
import ContactPage from "../../features/contact/ContactPage";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {path:'', element:<Catalog/>},
            {path:'store', element:<Catalog/>},
            //{path:'store/:id', element:<ProductDetails/>},
            {path:'contact', element:<ContactPage/>},

    }
])