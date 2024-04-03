"use client"

import Image from "next/image";
import './blog.css';
import React from 'react';
import Nav from "../components/nav/nav.js"; 
import Footer from "../components/footer/footer.js";

export default function blog(){
    return(
        <div>
            <Nav/>
            <main>
                <section className="blog-post">
                    <h2>Title of the First Blog Post</h2>
                    <div className="test-img">  
                        <Image src="https://images.unsplash.com/photo-1581260466152-d2c0303e54f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=50" alt="Blank Image" width={500} height={500} />
                    </div>
                    <p>This is the content of the first blog post. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <p className="post-info">
                    <span className="author"> By: Jane Doe </span>
                    <span className="date">Posted on: 2024-03-04</span>
                    </p>
                </section>

                <section className="blog-post">
                    <h2>Title of the Second Blog Post</h2>
                    <p>This is the content of the Second blog post. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <p className="post-info">
                    <span className="author"> By: Jane Doe </span>
                    <span className="date">Posted on: 2024-03-04</span>
                    </p>
                </section>
            </main>
            <Footer/>
        </div>
    );
};