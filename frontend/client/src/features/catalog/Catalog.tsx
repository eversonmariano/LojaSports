import { useState, useEffect } from "react";
import { Product } from "../../app/models/products";
import ProductList from "./ProductList";
import agent from "../../app/api/agent";
import Spinner from "../../app/Spinner";

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
        <>
            <ProductList products={products} />
        </>
    )
}