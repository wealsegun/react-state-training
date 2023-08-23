import { createContext, useContext, useEffect, useReducer } from "react";
import cartReducer from "../../cartReducer";

let initialCart: any;
try {
    initialCart = JSON.parse(localStorage.getItem("cart") as string) ?? [];
} catch {
    console.error("The cart could not be parsed into JSON.");
    initialCart = [];
}
const CartContext = createContext(null);

export function CartProvider({ children }: any) {
    const [cart, dispatch] = useReducer(cartReducer, initialCart);
    useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)), [cart]);
    const contextValue = {
        cart,
        dispatch,
    };
    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error(
            "useCart must be used within a CartProvider. Wrap a parent component in <CartProvider> to fix this error."
        );
    }
    return context;
}