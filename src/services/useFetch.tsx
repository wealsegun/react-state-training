import { useEffect, useRef, useState } from "react";
const baseUrl = "http://localhost:3000/";

const useFetch = (url: any) => {
    const isMounted = useRef(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        isMounted.current = true;
        const init = async () => {
            try {
                const response: any = await fetch(baseUrl + url);
                if (response.ok) {
                    const json = await response.json();
                    if (isMounted.current) setData(json);
                } else {
                    console.log(response)
                    throw response;
                }
            } catch (error: any) {
                if (isMounted.current) setError(error);
            }
            finally {
                if (isMounted.current) setLoading(false);
            }
        }
        init();
        return () => {
            isMounted.current = false;
        }
    }, [url]);
    return { data, error, loading };
}
export default useFetch;