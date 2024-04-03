import Link from "next/link";

export default function PostCard(props){
    const { post } = props
    return(
        <Link className="unstyled" href={`/posts/${post.slug}`}>
            <div className="postCard">
                <h3>{post.title}</h3>
            </div>
        </Link>
    )
}