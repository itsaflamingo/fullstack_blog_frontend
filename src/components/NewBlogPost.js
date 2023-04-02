import { useState } from "react"
import { useNavigate } from "react-router-dom";
import useFetch from "./useFetch";

export default function NewBlogPost() {

    const [input, setInput] = useState({
        title: '',
        body: '',
        publish: false
    });
    const [options, setOptions] = useState({api: '', method: ''});
    useFetch(options);

    const nav = useNavigate();

    // on input change 
    const titleOnChange = e => setInput({...input, title: e.target.value});
    const bodyOnChange = e => setInput({...input, body: e.target.value});
    const checkBoxOnChange = () => setInput({...input, publish: !input.publish});
    // on input submit 

    const onSubmit = e => {
        e.preventDefault();

        // Get token from environment
        const token = process.env.REACT_APP_BEARER_TOKEN;

        // Create new URL search params, convert to string
        const formData = new URLSearchParams({
            title:     input.title,
            body:      input.body,
            published: input.publish
        }).toString();

        // Make POST request to backend server using specified headers, then convert response to json and catch error 
        setOptions({
            api: `https://fs-blog-backend.fly.dev/blog-secure/post/create`, 
            method: 'POST', 
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
              },
            body: formData
        })

        nav('/blog-secure');
    }

    return (
        <div className="create-blog-post">
            <form>
                <label htmlFor='title'> Title
                    <input id="title"
                    type='text'
                    onChange={e => titleOnChange(e)}></input>
                </label>
                <label htmlFor='body'> Body
                    <input id="body"
                    type='textarea'
                    onChange={e => bodyOnChange(e)}></input>
                </label>    
                <label htmlFor='is-published'> Publish
                    <input id='is-published'
                    type='checkbox'
                    value={input.publish}
                    onChange={() => checkBoxOnChange()}></input>
                </label>
                <button type='submit'
                onClick={e => onSubmit(e)}>Submit</button>
            </form>
        </div>
    )
}