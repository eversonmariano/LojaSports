import { Cartt } from "../models/cart";

export function getCartFromLocalStorage():Cartt | null{
    const storedCart = localStorage.getItem('cart');
    if (storedCart){
        try{
            const parsedCart: Cartt = JSON.parse(storedCart);
            return parsedCart;
        }
        catch(error){
            console.error('Error Parsing cart from local storage: ', error);
            return null;
        }
    }
    return null;
}