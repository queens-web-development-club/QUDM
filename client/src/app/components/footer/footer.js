"use client"

import React, { useState, useEffect } from 'react';
import './footer.css';
const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <p>
                    2024 Queens University Dance Marathon. Visit our social media pages too! 
                </p>
                <a href="https://www.instagram.com/qudancemarathon/?hl=en" target="_blank" rel="noopener noreferrer">
                    <img src="/images/logo/logo_instagram.png" alt="Instagram Logo" className="logo-img" />
                </a>
                <a href="https://linktr.ee/qudancemarathon" target="_blank" rel="noopener noreferrer">
                    <img src="/images/logo/logo_linktree.png" alt="Linktree Logo" className="logo-img" />
                </a>
                
            </div>
            
        </footer>
    )
}
export default Footer;