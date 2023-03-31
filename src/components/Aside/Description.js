import { useContext } from "react";
import { BlogInfoContext } from "../Contexts";

export default function Description() {

    const info = useContext(BlogInfoContext);

    return (
        <div className="blog-description">
            {info.blogInfo[0] !== undefined && <p>{info.blogInfo[0].description}</p>}
        </div>
    )
}