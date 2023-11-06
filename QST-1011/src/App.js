import './App.css';
import { useState, useEffect } from "react";
import Page from './components/Page';




export default function App() {

  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const resp = await fetch('https://fakestoreapi.com/products');
        const products = await resp.json();
        setProducts(products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();

  }, [])

  return(
    <Page products={products} />
  )
  
}