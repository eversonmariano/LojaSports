import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Product } from "../../app/models/products";

interface Props {
    product: Product;
}
export default function ProductCard({ product }: Props) {
    const extractImageName = (item: Product): string | null => {
        if (item && item.pictureUrl) {
            const parts = item.pictureUrl.split('/');
            if (parts.length > 0) {
                return parts[parts.length - 1];
            }
        }
        return null;
    }
    const formatPrice = (price: number): string => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2
        }).format(price);
    }
    return (
        <Card>

            <CardHeader avatar={
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                    {product.name.charAt(0).toUpperCase()}
                </Avatar>
            }
                title={product.name}
                titleTypographyProps={{ sx: { fontWeight: 'bold', color: 'primary.main' } }}
            />
            <CardMedia
                sx={{ height: 140, backgroundSize: 'contain' }}
                image={"/images/products/" + extractImageName(product)}
                title={product.name}
                
            />
            <CardContent>
                <Typography gutterBottom sx={{ color: 'primary.main' }} variant="h5">
                    {formatPrice(product.price)}
                </Typography>
                <Typography variant="body2" color="text.primary">
                    {product.productBrand} / {product.productType}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Adicionar ao Carrinho</Button>
                <Button size="small">Conferir</Button>
            </CardActions>
        </Card>
    )
}