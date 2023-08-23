import { useParams, useNavigate } from "react-router-dom";
import useFetch from "./services/useFetch";
import Spinner from "./Spinner";
import PageNotFound from "./PageNotFound";
import { useState } from "react";
import { useCart } from "./services/contexts/cartContext";

const ProductDetails = () => {
    const { dispatch } = useCart();
    const { id } = useParams();
    const navigate = useNavigate();
    const [sku, setSku] = useState("");
    const { data, loading, error } = useFetch(`products/${id}`);
    const product: any = data;

    if (error) throw error;
    if (loading) return <Spinner />;
    if (error) return <PageNotFound />
    return (
        <div id="detail">
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p id="price">${product.price}</p>
            <section id="filters">
                <label htmlFor="size">Filter by Size:</label>{" "}
                <select id="size" value={sku} onChange={(e) => {
                    console.log(e.target.value)
                    setSku(e.target.value)
                }
                }>
                    <option value="">What size?</option>
                    {product.skus.map((s: any) => (<option key={s.sku} value={s.sku}>{s.size}</option>))}
                </select>
            </section>
            <p>
                <button className="btm btn-primary" disabled={!sku} onClick={() => {
                    dispatch({ type: "add", id, sku })
                    navigate("/cart")
                }}>Add to Cart</button>
            </p>
            <img src={`/images/${product.image}`} alt={product.category} />
        </div >
    );
}

export default ProductDetails;