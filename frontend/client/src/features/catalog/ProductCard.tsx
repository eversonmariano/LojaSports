import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Product } from "../../app/models/products";
import { Link } from "react-router-dom";

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
                <Avatar sx={{ bgcolor: 'primary.dark' }}>
                    {product.name.charAt(0).toUpperCase()}
                </Avatar>
            }
            title={product.name}
                titleTypographyProps={{ sx: { fontWeight: 'bold', color: 'primary.dark' } }}
            />
            
            <CardMedia
                sx={{ height: 140, backgroundSize: 'contain' }}
                image={"/images/products/" + extractImageName(product)}
                title={product.name}

            />
            <CardContent>
                <Typography gutterBottom variant="h5">
                    {formatPrice(product.price)}
                </Typography>
                <Typography variant="body2" >
                    {product.productBrand} / {product.productType}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small"  sx={{ bgcolor: '#ffffc7' }}>Adicionar ao Carrinho</Button>
                <Button component={Link} to={`/produto/${product.id}`} size="small" sx={{ bgcolor: '#ffffc7' }}>Descrição</Button>
            </CardActions>
        </Card >
    )
}