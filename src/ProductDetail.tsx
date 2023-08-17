import { useParams } from "react-router-dom";
import useFetch from "./services/useFetch";
import Spinner from "./Spinner";
import PageNotFound from "./PageNotFound";


const ProductDetails = () => {
    // return (<h1>Detail</h1>);
    const { id } = useParams();
    const url = `products/${id}`;
    const { data, error, loading } = useFetch(url);
    let product: any = data;


    if (error) throw error;
    if (loading) return <Spinner />;
    if (!product) return <PageNotFound />
    return (
        <div id="detail">
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p id="price">${product.price}</p>
            <img src={`/images/${product.image}`} alt={product.category} />
        </div>
    );
}

export default ProductDetails;