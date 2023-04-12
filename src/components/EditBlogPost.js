import { useEffect, useRef, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom";
import useFetch from "./useFetch";
import { Editor } from '@tinymce/tinymce-react';

export default function EditBlogPost() {

    const editorRef = useRef(null);

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
    });

    // Set onChange input as state
    const [input, setInput] = useState({});
    
    const nav = useNavigate();

    useEffect(() => {
        if(loading === true) return;
        setInput(data);
        console.log(input.published);
    }, [loading])

    // on input change 
    const titleOnChange = e => setInput({...input, title: e.target.value});
    const bodyOnChange = content => setInput({...input, body: content});
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
            .catch(err => console.log(err));
        nav('/blog-secure');
    }

    return (
        <div className="create-blog-post">
            <form className="create-blog-post-form">
                <label htmlFor='title'className="title-container"> Title
                    <input id="title" 
                    type='text'
                    value={loading ? '' : input.title}
                    onChange={e => titleOnChange(e)}></input>
                </label>
                        <>
                <Editor
                  apiKey={process.env.REACT_APP_TINY_API_KEY}
                  onInit={(evt, editor) => editorRef.current = editor}
                  value={loading ? '' : input.body}
                  className="body"
                  onEditorChange={bodyOnChange}
                  init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                      'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                      'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                      'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | blocks | ' +
                      'bold italic forecolor | alignleft aligncenter ' +
                      'alignright alignjustify | bullist numlist outdent indent | ' +
                      'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                  }}
                />
                </>    
                <label htmlFor='is-published' className="checkbox-container"> Publish
                    <input id='is-published'
                    type='checkbox'
                    checked={loading ? false : input.published}
                    onChange={() => checkBoxOnChange()}></input>
                </label>
                <div className="edit-submit-container">
                    <button type='submit' className="edit-submit-btn"
                    onClick={e => onSubmit(e)}>Submit</button>
                </div>
            </form>
        </div>
    )
}