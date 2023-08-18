import { useEffect, useState } from "react";
const baseUrl = "http://localhost:3000/";
const useFetchAll = (urls: any) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const promises = urls.map((url: any) =>
            fetch(baseUrl + url).then((response) => {
                if (response.ok) return response.json();
                throw response;
            })
        );

        Promise.all(promises)
            .then((json: any) => setData(json))
            .catch((e) => {
                console.error(e);
                setError(e);
            })
            .finally(() => setLoading(false));
        // eslint-disable-next-line
    }, []);

    return { data, loading, error };

}

export default useFetchAll;