import axios from "axios";
import { Cartt, CartItem, CartTotals } from "../models/cart";
import { Product } from "../models/products";
import { Dispatch } from "redux";
import { setCart } from "../../features/cart/cartSlice";
import { createId } from "@paralleldrive/cuid2";



class CartService {
    apiUrl = "http://localhost:8081/api/carts";

    async getCartFromApi() {
        try {
            const response = await axios.get<Cartt>(`${this.apiUrl}`);
            return response.data;
        } catch (error) {
            throw new Error("Failed to retrieve the cart.")
        }
    }

    async getCart() {
        try {
            const cart = localStorage.getItem('cart');
            if (cart) {
                return JSON.parse(cart) as Cartt;
            } else {
                throw new Error("Cart not found in local storage");
            }
        } catch (error) {
            throw new Error("Failed to retrieve the cart: " + error);
        }
    }

    async addItemToCart(item: Product, quantity = 1, dispatch: Dispatch){
        try{    
            let basket = this.getCurrentCart();
            if(!basket){
                basket = await this.createCart();
            }
            const itemToAdd = this.mapProductToCart(item);
            basket.items = this.upsertItems(basket.items, itemToAdd, quantity);
            this.setCart(basket, dispatch);
            //calculate totals 
            const totals = this.calculateTotals(basket);
            return {basket, totals};
        }catch(error){
            throw new Error("Failed to add and intem to Basket.")
        }
    }

    async remove(itemId: number, dispatch: Dispatch) {
        const cart = this.getCurrentCart();
        if (cart) {
            const itemIndex = cart.items.findIndex((p) => p.id === itemId);
            if (itemIndex !== -1) {
                cart.items.splice(itemIndex, 1);
                this.setCart(cart, dispatch);
            }
            //check if cart is empty after removing the item
            if (cart.items.length === 0) {
                //clear the the cart from the local storage
                localStorage.removeItem('cart_id');
                localStorage.removeItem('cart');
            }
        }
    }

    async incrementItemQuantity(itemId: number, quantity: number = 1, dispatch: Dispatch) {
        const cart = this.getCurrentCart();
        if (cart) {
            const item = cart.items.find((p) => p.id === itemId);
            if (item) {
                item.quantity += quantity;
                if (item.quantity < 1) {
                    item.quantity = 1;
                }
                this.setCart(cart, dispatch);
            }
        }
    }

    async decrementItemQuantity(itemId: number, quantity: number = 1, dispatch: Dispatch) {
        const cart = this.getCurrentCart();
        if (cart) {
            const item = cart.items.find((p) => p.id === itemId);
            if (item && item.quantity > 1) {
                item.quantity -= quantity;
                this.setCart(cart, dispatch);
            }
        }
    }

    async deleteCart(cartId: string): Promise<void> {
        try {
            await axios.delete(`${this.apiUrl}/${cartId}`);
        } catch (error) {
            throw new Error("Failed to delete the cart.")
        }
    }

    async setCart(cart: Cartt, dispatch: Dispatch) {
        try {
            await axios.post<Cartt>(this.apiUrl, cart);
            localStorage.setItem('cart', JSON.stringify(cart));
            dispatch(setCart(cart));
        } catch (error) {
            throw new Error("Failed to update cart.")
        }
    }

    private getCurrentCart() {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) as Cartt : null;
    }

    private async createCart(): Promise<Cartt> {
        try {
            const newCart: Cartt = {
                id: createId(),
                items: []
            }
            localStorage.setItem('cart_id', newCart.id);
            return newCart;
        } catch (error) {
            throw new Error("Failed to create Cart.");
        }
    }
    private mapProductToCart(item: Product): CartItem {
        return {
            id: item.id,
            name: item.name,
            price: item.price,
            description: item.description,
            quantity: 0,
            pictureUrl: item.pictureUrl,
            productBrand: item.productBrand,
            productType: item.productType
        };
    }
    private upsertItems(items: CartItem[], itemTotAdd: CartItem, quantity: number): CartItem[] {
        const existingItem = items.find(x => x.id == itemTotAdd.id);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            itemTotAdd.quantity = quantity;
            items.push(itemTotAdd);
        }
        return items;
    }
    private calculateTotals(cart: Cartt): CartTotals {
        const shipping = 0;
        const subTotal = cart.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        const total = shipping + subTotal;
        return { shipping, subTotal, total };
    }
}



export default new CartService();