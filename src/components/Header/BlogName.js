import { useContext } from "react";
import { BlogInfoContext } from "../Contexts";

export default function BlogName() {
    const info = useContext(BlogInfoContext);

    return (
        <div className="blog-name">
            {info.blogInfo[0] !== undefined && <h1>{info.blogInfo[0].name}</h1>}
        </div>
    )
}