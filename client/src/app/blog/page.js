import PostCard from "../components/PostCard"
import getPostMetadata from "../utils/getPostMetadata"
import Nav from "../components/nav/nav.js"; 
import Footer from "../components/footer/footer.js";


export default function mdblog(){
    const postMetadata = getPostMetadata('posts')
    return(
        <main>
            <Nav/>
            <div className="postContainer">
                {postMetadata.map((post, postIndex) => {
                    return(
                        <PostCard key={postIndex} post={post}/>
                    )
                })}
            </div>
            <Footer/>
        </main>
    )
}