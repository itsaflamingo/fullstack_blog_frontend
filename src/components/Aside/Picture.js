import { useContext } from "react"
import { BlogInfoContext } from "../Contexts"

export default function BlogPicture() {

    const info = useContext(BlogInfoContext);

    return (
        <div className="blog-picture">
            {info.blogInfo[0] !== undefined && <img src={info.blogInfo[0].picture} alt='blog'/>}
        </div>
    )
}