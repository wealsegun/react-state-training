import { useEffect, useState, useRef } from "react";
const baseUrl = "http://localhost:3000/";
const useFetchAll = (urls: any) => {
    const prevUrls = useRef([]);

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (areEqual(prevUrls.current, urls)) {
            setLoading(false);
            return;
        }
        // prevUrls.current = urls;

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
    }, [urls]);

    console.log(data, loading, error);
    return { data, loading, error };
}

const areEqual = (array1: any, array2: any) => {
    return (
        array1.length === array2.length &&
        array1.every((value: any, index: any) => value === array2[index])
    );
}

export default useFetchAll;