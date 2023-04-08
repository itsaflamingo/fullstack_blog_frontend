import { useContext, useState } from "react";
import { BlogInfoContext } from "../Contexts";

export default function EditDescription() {

    const token = process.env.REACT_APP_BEARER_TOKEN;
    const data = useContext(BlogInfoContext);
    const [input, setInput] = useState({
        title:       data.blogInfo[0].name,
        picture:     data.blogInfo[0].picture,
        description: data.blogInfo[0].description
    })

    const titleOnChange = (e) => setInput({...input, title: e.target.value}); 
    const pictureOnChange = (e) => setInput({...input, picture: e.target.value});
    const descriptionOnChange = (e) => setInput({...input, description: e.target.value});

    const onSubmit = (e) => {
        e.preventDefault();

        // Create new URL search params, convert to string
        const formData = new URLSearchParams({
            title:       input.title,
            picture:     input.picture,
            description: input.description
        }).toString();

        fetch(`https://fs-blog-backend.fly.dev/blog-secure/description/${data.blogInfo[0]._id}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData
        })
            .catch(err => console.log(err));
    }

    return (
        <div className="bloginfo-form-container">
            <form className="edit-description-form">
                <div className="title-input-container">
                    <label htmlFor="blog-title">Title</label>
                    <input type='text'
                        id='blog-title'
                        value={input.title}
                        onChange={e => titleOnChange(e)} />
                </div>
                <div className="picture-input-container">
                    <label htmlFor="picture-url">Picture</label>
                    <input id="picture-url"
                        type="url"
                        value={input.picture}
                        onChange={e => pictureOnChange(e)} />
                </div>
                <div className="description-input-container">
                    <label htmlFor="description-url">Description
                    </label>
                    <textarea 
                        id="blog-description"
                        value={input.description}
                        onChange={e => descriptionOnChange(e)} />
                </div>
            </form>
            <div>
                <button type='submit' 
                className="submit-bloginfo"
                onClick={e => onSubmit(e)}>Submit</button>
            </div>
        </div>
    )
}