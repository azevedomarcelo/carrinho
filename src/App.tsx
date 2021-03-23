import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

interface ProductsProps {
  uniqueId: string;
  id: string;
  productId: string;
  name: string;
  skuName: string;
  price: number;
  sellingPrice: number;
  imageUrl: string;
}

function App() {
  const [products, setProducts] = useState<ProductsProps[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    // acima de 10
    axios.get('https://s3.us-west-2.amazonaws.com/secure.notion-static.com/11b895d0-bc64-4f3a-bfa9-7c652be8d415/acima-10-reais.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210323T110629Z&X-Amz-Expires=86400&X-Amz-Signature=67cd7feeac48187f6bbd414a4fda89f5f587c2f20ad6818bdf67ff9165049e17&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22acima-10-reais.json%22').then((response) => {
      setProducts(response.data.items);
      setTotalProducts(response.data.value);
    });

    // abaixo de 10
    // axios.get('https://s3.us-west-2.amazonaws.com/secure.notion-static.com/5bbd6fdd-abae-411d-96cc-1a5d76d3803b/abaixo-10-reais.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210323T110324Z&X-Amz-Expires=86400&X-Amz-Signature=9eb6edc75f4aafff52a349339a339a77a8e9a463c9f32f211f96efc22b76004d&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22abaixo-10-reais.json%22').then((response) => {
    //   setProducts(response.data.items);
    //   setTotalProducts(response.data.value);
    // });
  } ,[])

  return (
    <div className="App">
      <h1>Meu carrinho</h1>
      <hr className="divisor"/>
      { products.map((product) => 
        <div key={product.uniqueId} className="product-item">
          <img src={product.imageUrl} alt="imagem"/>
          <div className="product-description">
            <strong>{product.name}</strong>
            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price / 100)}</p>
            <strong>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.sellingPrice / 100)}</strong>
          </div>
        </div>
      ) }

      <hr className="divisor"/>

      <div className="price">
        <div>
          <strong>Total</strong>
          <strong>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalProducts / 100)}</strong>
        </div>
        { totalProducts > 1000 && (
          <p className="shipping">Parabéns, sua compra tem frete grátis!</p>
        ) }
      </div>

      <hr className="divisor"/>

      <button className="finish-button">Finalizar compra</button>

    </div>
  );
}

export default App;
