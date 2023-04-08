import { useState } from "react"
import { useNavigate } from "react-router-dom";
import useFetch from "./useFetch";

export default function NewBlogPost() {

    const [input, setInput] = useState({
        title: '',
        body: '',
        publish: false
    });
    
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
        fetch(`https://fs-blog-backend.fly.dev/blog-secure/post/create`, { 
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
            <form className="create-post-form">
                <label htmlFor='title'>Title</label>
                <input id="title"
                    type='text'
                    onChange={e => titleOnChange(e)}/>
                <label htmlFor='body'>Body</label>    
                <textarea id="body"
                    onChange={e => bodyOnChange(e)}/>
                <div className="is-published-container">
                    <label htmlFor='is-published'>Publish</label>
                    <input id='is-published'
                        type='checkbox'
                        value={input.publish}
                        onChange={checkBoxOnChange}/>
                </div>
                <div className="new-post-submit-container">
                    <button type='submit' className="new-post-submit"
                    onClick={e => onSubmit(e)}>Submit</button>
                </div>
            </form>
        </div>
    )
}