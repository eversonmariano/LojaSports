import { useEffect, useState } from "react";

function App() {
  // Define a state variable products, usando useState
  const [products, setProducts] = useState([]);
  useEffect(()=>{
    //Function to fetch the data
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/products');
        if(!response.ok){
          throw new Error('Falha para buscar os dados')
        }
        const data = await response.json();
        setProducts(data.content);
  } catch (error) {
    console.error('Falha buscando dados', error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1>SportWay</h1>
      {products.map((product) => (
        <div key={product.id}>
          <p>Nome: {product.name}</p>
          <p>Descrição: {product.description}</p>
          <p>Preço: R${product.price}</p>
          <p>Marca: {product.brand}</p>
          <p>Tipo: {product.type}</p>
        </div>
      ))}
    </div>
  )
}

export default App;
