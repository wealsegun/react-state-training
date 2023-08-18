
import './App.css'
import Footer from './Footer'
import Header from './Header'
import Products from './Product'
import { Routes, Route } from "react-router-dom";
import ProductDetails from './ProductDetail';
import Cart from './Cart';
import { useState } from 'react';
import Checkout from './Checkout';

function App() {

  const [cart, setCart] = useState(() => {
    try {
      const ca: any = "cart";
      const _cb: any = "";
      return JSON.parse(localStorage.getItem(ca) ? localStorage.getItem(ca) : _cb) ?? [];
    } catch {
      console.error("The cart could not be parsed into JSON.");
      return [];
    }
  });

  const addToCart = (id: any, sku: any) => {
    console.log("item added to cart", id, sku)
    setCart((items: any) => {
      const itemInCat = items.find((i: any) => i.sku === sku);
      if (itemInCat) {
        // Return new array with the matching item replaced.
        return items.map((i: any) => i.sku === sku ? { ...i, quantity: i.quantity + 1 } : i);
      }
      else {
        // Return new array with the new item append
        return [...items, { id, sku, quantity: 1 }];
      }

    });

  }

  const updateQuantity = (sku: any, quantity: any) => {
    setCart((items: any) => {
      return quantity === 0 ?
        items.filter((i: any) => i.sku !== sku) :
        items.map((i: any) => i.sku === sku ? { ...i, quantity } : i)
    })
  }

  const emptyCart = () => {
    setCart([]);
  }
  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path='/' element={<><h1>Welcome to Carved Rock Fitness</h1></>} />
            <Route path='/:category' element={<Products />} />
            <Route path='/:category/:id' element={<ProductDetails addToCart={addToCart} />} />
            <Route path='/cart' element={<Cart cart={cart} updateQuantity={updateQuantity} />} />
            <Route path='/checkout' element={<Checkout cart={cart} emptyCart={emptyCart} />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  )
}

export default App
