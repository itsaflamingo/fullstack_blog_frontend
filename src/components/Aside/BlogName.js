import { useContext } from "react";
import { BlogInfoContext } from "../Contexts";

export default function BlogName() {
    const info = useContext(BlogInfoContext);

    return (
        <div className="blog-name">
            {info.blogInfo[0] !== undefined && <h3>{info.blogInfo[0].name}</h3>}
        </div>
    )
}