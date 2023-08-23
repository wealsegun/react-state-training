import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import ErrorBoundary from './ErrorBoundary.tsx';
import { BrowserRouter } from "react-router-dom"
import { CartProvider } from './services/contexts/cartContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(

  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <CartProvider>
          <App />
        </CartProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
)
