import { useState, useEffect } from "react";
import { Product } from "../../app/models/products";
import ProductList from "./ProductList";
import agent from "../../app/api/agent";
import Spinner from "../../app/layout/Spinner";
import { Grid, Paper, TextField } from "@mui/material";

export default function Catalog() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        agent.Store.list()
            .then((products) => setProducts(products.content))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }, []);
    if (!products) return <h3>Unable to load Products</h3>
    if (loading) return <Spinner message='Loading Products...' />
    return (
        <Grid container spacing={4}>
            <Grid item xs={3}>
                <Paper sx={{ mb: 2 }}>
                    <TextField
                        label="Search products"
                        variant="outlined"
                        fullWidth
                        // value={searchTerm}
                        // onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                // Trigger search action
                                // loadProducts{ selectedSort, searchTerm } //Pass  the search term to loadProducts

                            }
                        }}
                    />
                </Paper>
            </Grid>
            <Grid item xs={9}>
                <ProductList products={products} />
            </Grid>
            
        </Grid>
    )
}