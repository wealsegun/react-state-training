import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import useFetchAll from "./useFetchAll";
import { useCart } from "./services/contexts/cartContext";



const Cart = () => {
    const { cart, dispatch } = useCart();
    const urls = cart.map((i: any) => `products/${i.id}`);
    const navigate = useNavigate();
    const { data, loading, error } = useFetchAll(urls);

    const products: any = data;

    function renderItem(itemInCart: any) {
        console.log(itemInCart)
        const { id, sku, quantity } = itemInCart;

        const { price, name, image, skus } = products.find(
            (p: any) => p.id === parseInt(id)
        );

        const { size } = skus.find((s: any) => s.sku === sku);

        console.log(size)

        return (
            <li key={sku} className="cart-item">
                <img src={`/images/${image}`} alt={name} />
                <div>
                    <h3>{name}</h3>
                    <p>${price}</p>
                    <p>Size: {size}</p>
                    <p>
                        <select
                            aria-label={`Select quantity for ${name} size ${size}`}
                            onChange={(e) => dispatch({ type: "updateQuantity", sku, quantity: parseInt(e.target.value) })}
                            value={quantity}
                        >
                            <option value="0">Remove</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </p>
                </div>
            </li>
        );
    }

    if (loading) return <Spinner />;
    if (error) throw error;
    const numItemsInCart = cart.reduce((total: any, item: any) => total + item.quantity, 0);

    return (
        <section id="cart">
            <h1>
                {numItemsInCart === 0
                    ? "Your cart is empty"
                    : `${numItemsInCart} Item${numItemsInCart > 1 ? "s" : ""} in My Cart`}
            </h1>
            <ul>{cart.map(renderItem)}</ul>
            {cart.length > 0 && (
                <button
                    className="btn btn-primary"
                    onClick={() => navigate("/checkout")}
                >
                    Checkout
                </button>
            )}
        </section>
    );
}

export default Cart;