
import { useParams } from 'react-router-dom';
import Spinner from './Spinner';
import useFetch from './services/useFetch';
import PageNotFound from './PageNotFound';
import { Link } from "react-router-dom";

function Products() {
    const { category } = useParams();
    const url = `products?category=${category}`;
    const { data: products, error, loading } = useFetch(url);

    if (error) throw error;
    if (loading) return <Spinner />;
    if (products.length === 0) return <PageNotFound />
    const renderProduct = (p: any) => {
        return (
            <div key={p.id} className="product">
                <Link to={`/${category}/${p.id}`}>
                    <img src={`/images/${p.image}`} alt={p?.name} />
                    <h3>{p.name}</h3>
                    <p>${p.price}</p>
                </Link>
            </div>
        );
    };

    return (
        <>
            <section id="product">
                {products.map((product) => renderProduct(product))}
            </section>
        </>
    )
}

export default Products
