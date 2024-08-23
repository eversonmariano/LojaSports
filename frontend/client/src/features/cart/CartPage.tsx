import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch, useAppSelector } from "../../app/store/configureStores";
import agent from "../../app/api/agent";
import { Product } from "../../app/models/products";
import { Add, Remove } from "@mui/icons-material";

export default function CartPage(){
    const {cart} = useAppSelector(state => state.cart);
    const dispatch = useAppDispatch();
    const {Cart: CartActions} = agent;

    const removeItem = (productId: number)=>{
        CartActions.removeItem(productId, dispatch);
    };

    const decrementItem = (productId: number, quantity: number = 1)=>{
        CartActions.decrementItemQuantity(productId, quantity, dispatch);
    };
    const incrementItem = (productId: number, quantity: number = 1)=>{
        CartActions.incrementItemQuantity(productId, quantity, dispatch);
    };
    // Define the extractImageName function
    const extractImageName = (item: Product): string | null => {
        if (item && item.pictureUrl) {
            const parts = item.pictureUrl.split('/');
            if (parts.length > 0) {
                return parts[parts.length - 1];
            }
        }
        return null;
    };

    // Function to format the price with BRL currency symbol
    const formatPrice = (price: number): string =>{
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2
        }).format(price);
    };
    if(!cart || cart.items.length === 0 ) return <Typography variant="h3">Seu carrinho está vazio. Por favor adicione alguns itens!!!</Typography>
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Product Image</TableCell>
                        <TableCell>Product</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Subtotal</TableCell>
                        <TableCell>Remove</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cart.items.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>
                                {item.pictureUrl && (
                                    <img src={"/images/products/"+extractImageName(item)} alt="Product" width="50" height="50" />
                                )}
                            </TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{formatPrice(item.price)}</TableCell>
                            <TableCell>
                                <IconButton color='error' onClick={() => decrementItem(item.id)}>
                                    <Remove />
                                </IconButton>
                                {item.quantity}
                                <IconButton color='error' onClick={() => incrementItem(item.id)}>
                                    <Add />
                                </IconButton>
                            </TableCell>
                            <TableCell>{formatPrice(item.price * item.quantity)}</TableCell>
                            <TableCell>
                                <IconButton onClick={() => removeItem(item.id)} aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
    
}