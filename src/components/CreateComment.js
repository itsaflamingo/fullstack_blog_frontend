export default function CreateComment() {

    const nameOnChange = (e) => {
        console.log(e.target.value);
    }

    const bodyOnChange = (e) => {
        console.log(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
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
                onClick={e => onSubmit(e)}></button>
            </form>
        </div>
    )
}