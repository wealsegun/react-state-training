import { useParams } from "react-router-dom";
import useFetch from "./services/useFetch";
import Spinner from "./Spinner";
import PageNotFound from "./PageNotFound";
// import { Product, Skus } from "./interfaces/product.interface";
// import { useRef } from "react";


const ProductDetails = ({ addToCart }: any) => {
    // return (<h1>Detail</h1>);
    // const navigate = useNavigate();
    const { id } = useParams();
    // const skuRef = useRef();
    const url = `products/${id}`;
    // const [sku, setSku] = useState("");
    const { data, error, loading } = useFetch(url);
    // const [skuSelected, setSkuSelected] = useState(true);
    const product: any = data;
    console.log(product);



    // if (error) throw error;
    if (loading) return <Spinner />;
    if (error) return <PageNotFound />
    return (
        <div id="detail">
            {/* <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p id="price">${product.price}</p>
            <section id="filters">
                <label htmlFor="size">Filter by Size:</label>{" "}
                <select id="size" ref={skuRef}>
                    <option value="">What size?</option>
                    {product.skus.map((s: any) => (<option key={s.sku} value={s.sku}>{s.size}</option>))}
                </select>
            </section>
            <p>
                <button className="btm btn-primary" onClick={() => {

                    const sku = skuRef.current.value;
                    if (!sku) return alert("select size.")
                    addToCart(product.id, sku)
                    navigate("/cart")
                }}>Add to Cart</button>
            </p>
            <img src={`/images/${product.image}`} alt={product.category} /> */}
        </div >
    );
}

export default ProductDetails;