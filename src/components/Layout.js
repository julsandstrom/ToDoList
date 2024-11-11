import React, { useState, useEffect } from "react";

export default function Layout() {
  const [products, setProducts] = useState([]);
  const [wallet, setWallet] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  function addToCart(item) {
    setWallet(item.price + wallet);
    setCartItems([...cartItems, item]);
    const totalCost = item.price + wallet;
    console.log(
      `You are adding ${item.title} to the cart. Total cost: ${totalCost}`
    );
  }

  function removeItem(item) {
    const itemIndex = cartItems.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    const updatedArray = [
      ...cartItems.slice(0, itemIndex),
      ...cartItems.slice(itemIndex + 1),
    ];

    setCartItems(updatedArray);
  }

  useEffect(() => {
    async function requestProducts() {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      setProducts(data);
    }

    requestProducts();
  }, []);

  useEffect(() => {
    const totalCost = cartItems.reduce((sum, item) => sum + item.price, 0);
    setWallet(parseFloat(totalCost.toFixed(2)));
  }, [cartItems]);

  return (
    <div>
      <h2>{wallet}</h2>
      <DisplayPrices products={products} addToCart={addToCart} />
      <CartList cartItems={cartItems} removeItem={removeItem} />
    </div>
  );
}

function DisplayPrices({ products, addToCart }) {
  return (
    <div>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <p>{product.price} $</p>
            <img src={product.image} alt="prd" width="100px"></img>
            <button onClick={() => addToCart(product)}>Add to cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CartList({ cartItems, removeItem }) {
  return (
    <div>
      <ul>
        {cartItems.map((item) => (
          <li key={`${item.id}-${Math.random()}`}>
            {item.title} - {item.price}
            <button onClick={() => removeItem(item)}>Remove this item</button>
          </li>
        ))}
      </ul>
    </div>
  );
}


import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export default function App() {
  const [products, setProducts] = useState([]); //En samling produkter
  const [wallet, setWallet] = useState(0); // Totala kostnaden
  const [cart, setCart] = useState([]); // Tillagda produkter

  useEffect(() => {
    async function productList() {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();

      const generateId = data.map((product) => ({
        ...product,
        uniqueID: uuidv4(),
      }));
      setProducts(generateId);
    }
    productList();
  }, []);

  function handleAddProduct(item) {
    setCart([...cart, item]);
    setWallet((prevWallet) => parseFloat((prevWallet + item.price).toFixed(2)));
    console.log(`Added '${item.title}' to cart`);
  }
  function handleRemoveProduct(item) {
    const itemIndex = cart.findIndex((product) => product.title === item.title);

    if (itemIndex > -1) {
      const updatedArray = [
        ...cart.slice(0, itemIndex),
        cart.slice(itemIndex + 1),
      ];

      setCart(updatedArray);
    }
    setWallet((prevWallet) => parseFloat((prevWallet - item.price).toFixed(2)));
  }

  return (
    <div>
      <h2>Wallet: {wallet}</h2>
      <ul>
        {products.map((product) => (
          <li key={product.uniqueID}>
            {product.title} {product.price}
            <button onClick={() => handleAddProduct(product)}>BUY</button>
            <button onClick={() => handleRemoveProduct(product)}>DELETE</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
