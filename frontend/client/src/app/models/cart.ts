export interface Cart {
    id: string;
    items: CartItem[];
}
export interface CartItem {
    id: number;
    name: string;
    description: string;
    price: number;
    pictureURL: string;
    productBrand: string;
    productType: string;
    quantity: number;
}
export interface CartTotals {
    shipping: number;
    subTotal: number;
    total: number;
}