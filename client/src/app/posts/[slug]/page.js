import Markdown from "markdown-to-jsx"
import getPostMetadata from "@/app/utils/getPostMetadata"
import React from "react"
import fs from 'fs'
import matter from "gray-matter"
import Nav from "../../components/nav/nav.js"; 
import Footer from '../../components/footer/footer';
import PostCard from "../../components/PostCard.js"
import './page.css';

function getPostContent(slug){
    const folder = 'posts/'
    const file = folder + `${slug}.md`
    const content = fs.readFileSync(file, 'utf8')

    const matterResult = matter(content)
    return matterResult
}

function miniMetadata(slug){
    const folder = 'posts/'
    const file = folder + `${slug}.md`
    const content = fs.readFileSync(file, 'utf8')

    const matterResult = matter(content)
    return {
        title: matterResult.data.title,
        author: matterResult.data.author,
        date: matterResult.data.date
    }
}

export const generateStaticParams = async () => {
    const posts = getPostMetadata('posts')
    return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({params, searchParams}){
    const id = params?.slug ? ' ⋅ ' + params?.slug : ''
    return {
        title: `QUDM ${id.replaceAll('_', ' ')}`
    }
}

export default function BlogPage(props) {
    const slug = props.params.slug
    const post = getPostContent(slug)
    const data = miniMetadata(slug)
    const postMetadata = getPostMetadata('posts')
    console.log(post)
    return (
        <main>
            <div className="nav">
                <Nav/>
            </div>
            <div className="flex-container">
                <div>
                    <div className="postInfo">
                        <h1>{data.title}</h1>
                        <p>Written by: {data.author} | Published: {data.date}</p>
                    </div>
                    <article>
                        <div className="postContent">
                            <Markdown>{post.content}</Markdown>
                        </div>
                    </article>
                </div>
                <div className="morePosts">
                    {postMetadata.map((post, postIndex) => {
                        return(
                            <PostCard key={postIndex} post={post}/>
                        )
                    })}
                </div>
            </div>
            <Footer/>
        </main>
    )
}