export default function Comment({ comment }) {

    return (
        <div className="comment-wrapper">
            <h3>{comment.name}</h3>
            <p>{comment.body}</p>
            <p>{comment.date_formatted}</p>
        </div>
    )
}