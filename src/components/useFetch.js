import { useEffect, useState } from "react"

export default function useFetch({ api, method, headers, body }) {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            // only continue if request type is included and request has not been fulfilled
            if(method.trim() === '') return;
            if(loading === false) return;

            // Add fetch options to variable
            const fetchOptions = {
                method,
                mode: 'cors'
            }
            // If hook is caled with headers or body, add to fetch options
            if(headers) {
                fetchOptions.headers = headers;
            }
            if(body) {
                fetchOptions.body = body;
            }
            // Call fetch with api and fetch options
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