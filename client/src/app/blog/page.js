import PostCard from "../components/PostCard"
import getPostMetadata from "../utils/getPostMetadata"
import Nav from "../components/nav/nav.js"; 
import Footer from "../components/footer/footer.js";
import './blog.css';


export default function blog(){
    const postMetadata = getPostMetadata('posts')
    return(
        <main>
            <div className="nav">
                <Nav/>
            </div>
            <div className="blogHeader">
                <h2>Blog</h2>
                <p>Keep up to date with QUDM!</p>
            </div>
            <div className="elements">
            <div className="postContainer">
                {postMetadata.map((post, postIndex) => {
                    return(
                        <PostCard key={postIndex} post={post}/>
                    )
                })}
            </div>
            </div>
            <div className="Footer">
                <Footer/>
            </div>
        </main>
    )
}