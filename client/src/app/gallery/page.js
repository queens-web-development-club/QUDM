"use client"

import './gallery.css';
import Nav from "../components/nav/nav.js"; 
import React, { useState, useEffect, useRef } from 'react';

const imageUrls = [
    { url: 'https://images.unsplash.com/photo-1581260466152-d2c0303e54f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=50' },
    { url: 'https://images.unsplash.com/photo-1581260466152-d2c0303e54f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=50' },
    { url: 'https://images.unsplash.com/photo-1581260466152-d2c0303e54f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=50' },
    { url: 'https://images.unsplash.com/photo-1581260466152-d2c0303e54f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=50' },
    { url: 'https://images.unsplash.com/photo-1581260466152-d2c0303e54f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=50' },
    { url: 'https://images.unsplash.com/photo-1581260466152-d2c0303e54f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=50' },
    { url: 'https://images.unsplash.com/photo-1581260466152-d2c0303e54f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=50' },
    { url: 'https://images.unsplash.com/photo-1581260466152-d2c0303e54f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=50' },
    { url: 'https://images.unsplash.com/photo-1581260466152-d2c0303e54f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=50' },
    { url: 'https://images.unsplash.com/photo-1581260466152-d2c0303e54f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=50' },
    { url: 'https://images.unsplash.com/photo-1581260466152-d2c0303e54f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=50' },
    { url: 'https://images.unsplash.com/photo-1581260466152-d2c0303e54f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=50' },
    { url: 'https://images.unsplash.com/photo-1581260466152-d2c0303e54f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=50' },
    { url: 'https://images.unsplash.com/photo-1581260466152-d2c0303e54f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=50' },
    { url: 'https://images.unsplash.com/photo-1581260466152-d2c0303e54f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=50' },
    { url: 'https://images.unsplash.com/photo-1581260466152-d2c0303e54f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=50' },
    { url: 'https://images.unsplash.com/photo-1581260466152-d2c0303e54f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=50' },
    { url: 'https://images.unsplash.com/photo-1581260466152-d2c0303e54f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=50' },
    { url: 'https://images.unsplash.com/photo-1581260466152-d2c0303e54f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=50' },
    { url: 'https://images.unsplash.com/photo-1581260466152-d2c0303e54f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=50' },
    { url: 'https://images.unsplash.com/photo-1581260466152-d2c0303e54f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=50' },
    { url: 'https://images.unsplash.com/photo-1581260466152-d2c0303e54f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=50' },
    { url: 'https://images.unsplash.com/photo-1581260466152-d2c0303e54f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=50' },
    { url: 'https://images.unsplash.com/photo-1581260466152-d2c0303e54f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=50' },
    { url: 'https://images.unsplash.com/photo-1581260466152-d2c0303e54f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=50' },
    { url: 'https://images.unsplash.com/photo-1581260466152-d2c0303e54f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=50' },
    { url: 'https://images.unsplash.com/photo-1581260466152-d2c0303e54f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=50' },

];

export default function Gallery() {

    const [visibleImages, setVisibleImages] = useState(8);

    const handleScroll = () => {
        const scrollPosition = window.scrollY;
        
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        

    
        const remainingScroll = documentHeight - (scrollPosition + windowHeight);
        const threshold = 100; 
        console.log(remainingScroll)
        console.log(threshold)
        if (remainingScroll < threshold) {
            setVisibleImages(prevVisibleImages => prevVisibleImages + 4);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div>
            <Nav/>
            <div className='main'>
                {imageUrls.slice(0, visibleImages).map((image, index) => (
                    <div className='figure fadein' key={index} style={{ animationDelay: `${index * 100}ms` }}>
                        <div className='figure-image' style={{ backgroundImage: `url(${image.url})` }} />
                    </div>
                ))}
            </div>
        </div>
    );
}

