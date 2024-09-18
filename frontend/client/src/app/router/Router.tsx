import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../layout/App";
import Catalog from "../../features/catalog/Catalog";
import ContactPage from "../../features/contact/ContactPage";
import ProductDetails from "../../features/catalog/ProductDetails";
import HomePage from "../../features/home/HomePage";
import NotFound from "../errors/NotFoundError";
import ServerError from "../errors/ServerError";
import CartPage from "../../features/cart/CartPage";
import SignInPage from "../../features/account/SigninPage";
import RegisterPage from "../../features/account/RegisterPage";



export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: '', element: <HomePage /> },
            { path: 'store', element: <Catalog /> },
            { path: 'store/:id', element: <ProductDetails /> },
            { path: 'contato', element: <ContactPage /> },
            { path: 'cart', element: <CartPage /> },
            { path: 'login', element: <SignInPage /> },
            { path: 'cadastrar', element: <RegisterPage /> },
            { path: 'not-found', element: <NotFound /> },
            { path: 'server-error', element: <ServerError /> },
            { path: '*', element: <Navigate replace to='/not-found' /> }
        ]
    }
])