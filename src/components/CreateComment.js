import { useEffect, useState } from "react";
import hasProfanity from './hasProfanity'

export default function CreateComment({ post }) {

    // Prevent click when input is empty
    const [isClickable, setIsClickable] = useState('no-click');
    const [comment, setComment] = useState({ name: '', comment: ''});
    const [errors, setErrors] = useState({
        name: '',
        comment: ''
    });

    useEffect(() => {
        validateForm();
    }, [errors, comment]);

    const inputOnChange = (e, inputName) => {
        const input = e.target.value;

        // If input has profanity, set errors && prevent clicking submit, else remove errors and set input
        if(hasProfanity(input) === true) {
            setErrors({
                ...errors,
                [inputName]: 'Please enter a valid name'
            })
            setIsClickable('no-click');
        }
        else {
            setErrors({...errors, [inputName]: ''});
            setComment({ ...comment, [inputName]: input });
            return;
        }
    }

    // Send event with appropriate input name to inputOnChange 
    const onChangeHandler = e => inputOnChange(e, e.target.id);
    
    const onSubmit = (e) => {
        e.preventDefault();

        // Create new URL search params, convert to string
        const formData = new URLSearchParams({
            name: comment.name,
            body: comment.comment
        }).toString();

        // Make POST request to backend server using specified headers, then convert response to json and catch error 
        fetch(`https://fs-blog-backend.fly.dev/blog/post/${post._id}/comments/create-comment`, { 
            method: 'POST', 
            mode: 'cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
            body: formData
        })
            .then(res => res.json())
            .catch(err => console.log(err))
    }

    // Validate form on error change
    const validateForm = () => {
        if(errors.name.length    === 0 && 
           errors.comment.length === 0) {
            setIsClickable('can-click');
        }
    }

    return (
        <div className="create-comment">
            <form>
                <div className="add-name">
                    <span className="error">{errors.name}</span>
                    <label htmlFor="name">Name</label>
                    <input
                    type='text'
                    id='name'
                    onChange={e => onChangeHandler(e)}></input>
                </div>
                <div className="add-text">
                    <span className='error'>{errors.comment}</span>
                    <label htmlFor="comment">Comment</label>
                    <input 
                    type='textarea' 
                    id='comment' 
                    onChange={e => onChangeHandler(e)}></input>
                </div>
                <button 
                type='submit'
                onClick={e => onSubmit(e)}
                className={isClickable}>Submit</button>
            </form>
        </div>
    )
}