import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom";
import useFetch from "./useFetch";

export default function EditBlogPost() {

    // Get id from location
    const location = useLocation();
    const id = location.state._id;

    // Get token from environment
    const token = process.env.REACT_APP_BEARER_TOKEN;

    // GET post to be edit
    const {data, loading} = useFetch({ 
        api: `https://fs-blog-backend.fly.dev/blog-secure/post/${id}/update`, 
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        } 
    })

    // Set onChange input as state
    const [input, setInput] = useState({});
    
    const nav = useNavigate();

    useEffect(() => {
        if(loading === true) return;
        setInput(data);
    }, [loading])

    // on input change 
    const titleOnChange = e => setInput({...input, title: e.target.value});
    const bodyOnChange = e => setInput({...input, body: e.target.value});
    const checkBoxOnChange = () => setInput({...input, publish: !input.publish});
    // on input submit 
    const onSubmit = e => {
        e.preventDefault();

        // Create new URL search params, convert to string
        const formData = new URLSearchParams({
            title:     input.title,
            body:      input.body,
            published: input.publish
        }).toString();

        // Make POST request to backend server using specified headers, then convert response to json and catch error 
        fetch(`https://fs-blog-backend.fly.dev/blog-secure/post/${id}/update`, { 
            method: 'PATCH', 
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
              },
            body: formData
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err));
        nav('/blog-secure');
    }

    return (
        <div className="create-blog-post">
            <form>
                <label htmlFor='title'> Title
                    <input id="title"
                    type='text'
                    value={loading ? '' : input.title}
                    onChange={e => titleOnChange(e)}></input>
                </label>
                <label htmlFor='body'> Body
                    <input id="body"
                    type='textarea'
                    value={loading ? '' : input.body}
                    onChange={e => bodyOnChange(e)}></input>
                </label>    
                <label htmlFor='is-published'> Publish
                    <input id='is-published'
                    type='checkbox'
                    value={loading ? false : input.published}
                    onChange={() => checkBoxOnChange()}></input>
                </label>
                <button type='submit'
                onClick={e => onSubmit(e)}>Submit</button>
            </form>
        </div>
    )
}