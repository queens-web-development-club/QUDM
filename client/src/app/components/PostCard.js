import Link from "next/link";

export default function PostCard(props){
    const { post } = props
    return(
        <Link className="unstyled" href={`/posts/${post.slug}`}>
            <div className="postCard">
                <h3>{post.title}</h3>
                <p>By: {post.author} | Posted on {post.date}</p>
            </div>
        </Link>
    )
}