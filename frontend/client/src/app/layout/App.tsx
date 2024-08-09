import { useEffect, useState } from "react";
import { Product } from "../models/products";

function App() {
  // Define a state variable products, usando useState
  const [products, setProducts] = useState<Product[]>([]);
  // useEffect(()=>{
  //   //Function to fetch the data
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('http://localhost:8081/api/products');
  //       if(!response.ok){
  //         throw new Error('Falha para buscar os dados')
  //       }
  //       const data = await response.json();
  //       setProducts(data.content);
  // } catch (error) {
  //   console.error('Falha buscando dados', error);
  //     }
  //   };
  //   fetchData();
  // }, []);
  useEffect(() => {
    fetch('http://localhost:8081/api/products')
    .then(response => response.json())
    .then(data => setProducts(data.content));
    }, []);
  return (
    <div>
      <h1>SportWay</h1>
      {products.map((product) => (
        <div key={product.id}>
          <p>Nome: {product.name}</p>
          <p>Descrição: {product.description}</p>
          <p>Preço: R${product.price}</p>
          <p>Marca: {product.productBrand}</p>
          <p>Tipo: {product.productType}</p>
        </div>
      ))}
    </div>
  )
}

export default App;
