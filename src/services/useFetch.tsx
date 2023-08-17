import { useEffect, useState } from "react";
const baseUrl = "http://localhost:3000/";

const useFetch = (url: any) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const init = async () => {
            try {
                const response: any = await fetch(baseUrl + url);
                if (response.ok) {
                    const json = await response.json();
                    setData(json);
                } else {
                    throw response;
                }
            } catch (error: any) {
                setError(error);
            }
            finally {
                setLoading(false);
            }
        }
        init();
    }, [url]);
    return { data, error, loading };
}
export default useFetch;