import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { data } from "./data";

// Bileşenler
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";

import { ProductContext } from "./contexts/ProductContext";
import { CartContext } from "./contexts/CartContext";

function App() {
  const [products, setProducts] = useState(data);
  const [cart, setCart] = useState([]);

  const addItem = (item) => {
    if (cart.find((cartItem) => cartItem.id === cart.id)) return;

    const newCart = [...cart, item];
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const removeItem = (id) => {
    const newCart = cart.filter((cartItem) => cartItem.id !== id);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  useEffect(() => {
    const cartUpdate = JSON.parse(localStorage.getItem("cart"));
    setCart(cartUpdate);
  }, []);

  return (
    <div className="App">
      <CartContext.Provider value={{ cart }}>
        <Navigation />{" "}
      </CartContext.Provider>

      {/* Routelar */}
      <main className="content">
        <Route exact path="/">
          <ProductContext.Provider value={{ products, addItem }}>
            {" "}
            <Products />{" "}
          </ProductContext.Provider>
        </Route>

        <Route path="/cart">
          <CartContext.Provider value={{ cart, removeItem }}>
            <ShoppingCart />
          </CartContext.Provider>
        </Route>
      </main>
    </div>
  );
}

export default App;
