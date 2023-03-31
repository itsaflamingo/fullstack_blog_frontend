import { useEffect, useState } from "react"

export default function useFetch({ api, method, headers }) {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {

            if(loading === false) return;

            const fetchOptions = {
                method,
                mode: 'cors'
            }
            if(headers) {
                fetchOptions.headers = headers;
            }
                fetch(api, fetchOptions)
                    .then(res => res.json())
                    .then(data => setData(data))
                    .catch(err => console.log(err))
                    .then(() => setLoading(false))
            }
        
        fetchData();

    }, [api, method, headers, loading])

    return { data, loading }
}