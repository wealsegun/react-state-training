
import './App.css'
import Footer from './Footer'
import Header from './Header'
import Products from './Product'
import { Routes, Route } from "react-router-dom";
import ProductDetails from './ProductDetail';
import Cart from './Cart';

function App() {


  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path='/' element={<><h1>Welcome to Carved Rock Fitness</h1></>} />
            <Route path='/:category' element={<Products />} />
            <Route path='/:category/:id' element={<ProductDetails />} />
            <Route path='/cart' element={<Cart />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  )
}

export default App
