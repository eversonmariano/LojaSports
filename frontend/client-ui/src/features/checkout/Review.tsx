import { Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { Product } from "../../app/models/products";
import { useAppSelector } from "../../app/store/configureStores"
import BasketSummary from "../cart/CartSummary";

export default function Review(){
    const {cart} = useAppSelector(state=>state.cart);
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

    // Function to format the price with INR currency symbol
    const formatPrice = (price: number): string =>{
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2
        }).format(price);
    };
    return (
        <>
      <Typography variant="h6" gutterBottom>
        Resumo do Pedido
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Imagem do Pedido</TableCell>
              <TableCell>Item</TableCell>
              <TableCell>Preço</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart?.items.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  {product.pictureUrl && (
                    <img src={"/images/products/"+extractImageName(product)} alt="Product" width="50" height="50" />
                  )}
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{formatPrice(product.price)}</TableCell>
              </TableRow>
            ))}            
          </TableBody>
        </Table>
      </TableContainer>
      <BasketSummary />
    </>
    )
}