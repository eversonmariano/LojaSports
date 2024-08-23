import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../layout/App";
import Catalog from "../../features/catalog/Catalog";
import ContactPage from "../../features/contact/ContactPage";
import ProductDetails from "../../features/catalog/ProductDetails";
import HomePage from "../../features/home/HomePage";
import NotFound from "../errors/NotFoundError";
import ServerError from "../errors/ServerError";
import CartPage from "../../features/cart/CartPage";



export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: '', element: <HomePage/> },
            { path: 'store', element: <Catalog/> },
            { path: 'store/:id', element: <ProductDetails/> },
            { path: 'contato', element: <ContactPage /> },
            { path: 'cart', element: <CartPage/> },
            { path: 'not-found', element: <NotFound/> },
            { path: 'server-error', element: <ServerError/> },
            { path: '*', element: <Navigate replace to='/not-found'/> }
        ]
    }
])