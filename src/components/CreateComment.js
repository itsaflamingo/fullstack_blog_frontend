import { useEffect, useState } from "react";
import hasProfanity from './hasProfanity'

export default function CreateComment({ post }) {

    const [isClickable, setIsClickable] = useState('no-click');
    const [comment, setComment] = useState({ name: '', comment: ''});

    const [errors, setErrors] = useState({
        name: '',
        comment: ''
    });

    useEffect(() => {
        validateForm();
    }, [errors]);

    const nameOnChange = (e) => {
        const input = e.target.value;

        if(hasProfanity(input) === true) {
            setErrors({
                ...errors,
                name: 'Please enter a valid name'
            })
        }
        setComment({ ...comment, name: input });
        return;
    }

    const bodyOnChange = (e) => {
        const input = e.target.value;

        if(hasProfanity(input) === true) {
            setErrors({
                ...errors,
                comment: 'Please enter a valid comment'
            })
        }
        setComment({ ...comment, comment: input });
        return;    
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const formData = new URLSearchParams({
            name: comment.name,
            body: comment.comment
        }).toString();

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

    const validateForm = () => {
        if(errors.name.length    === 0 || 
           errors.comment.length === 0) {
            setIsClickable('can-click');
        }
    }

    return (
        <div className="create-comment">
            <form>
                <div className="add-name">
                    <span className="error"></span>
                    <label htmlFor="name">Name</label>
                    <input
                    type='text'
                    id='name'
                    onChange={e => nameOnChange(e)}></input>
                </div>
                <div className="add-text">
                    <span className='error'></span>
                    <label htmlFor="body">Comment</label>
                    <input 
                    type='textarea' 
                    id='body' 
                    onChange={e => bodyOnChange(e)}></input>
                </div>
                <button 
                type='submit'
                onClick={e => onSubmit(e)}
                className={isClickable}>Submit</button>
            </form>
        </div>
    )
}