import { Box, Typography, TableContainer, Paper, Table, TableBody, TableRow, TableCell } from "@mui/material";
import { useAppSelector } from "../../app/store/configureStores";


export default function CartSummary(){
    const {cart} = useAppSelector(state=>state.cart);
    const subTotal = cart?.items.reduce((sum, item)=> sum + (item.price * item.quantity), 0) ?? 0;
    const shipping = 200;

    // Function to format the price with INR currency symbol
    const formatPrice = (price: number): string =>{
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2
        }).format(price);
    };
    return (
        <Box mt={4} p={2} bgcolor="background.default" borderRadius={8} boxShadow={3}>
            <Typography variant="h5" gutterBottom>
                Resumo do(s) Pedido(s)
            </Typography>
            <TableContainer component={Paper} variant="outlined">
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>Subtotal</TableCell>
                            <TableCell align="right">{formatPrice(subTotal)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Envio</TableCell>
                            <TableCell align="right">{formatPrice(shipping)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><strong>Total</strong></TableCell>
                            <TableCell align="right"><strong>{formatPrice(subTotal + shipping)}</strong></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}