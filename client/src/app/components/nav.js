import React, { useState, useEffect } from 'react';
import '../css/nav.css';

const Navbar = () => {
    return (
        <nav className='nav'>
            <div>
                <div className='logo'>
                    <a href="#">Logo</a>
                </div>
                <div>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/gallery">Gallery</a></li>
                        <li><a href="#">Donate</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
