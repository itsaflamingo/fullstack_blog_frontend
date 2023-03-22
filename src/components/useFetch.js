import { useEffect, useState } from "react"

export default function UseFetch({ api, method }) {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
                fetch(api, { method, mode: 'cors' })
                .then(res => res.json())
                .then(data => setData(data))
                .catch(err => console.log(err))
                .then(() => setLoading(false))
            }
        
        fetchData();

    }, [api, method])

    return { data, loading }
}