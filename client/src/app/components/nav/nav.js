"use client"

import React, { useState, useEffect } from 'react';

import './nav.css';


const Navbar = () => {
    return (
        <nav className="navbar">
          <div className="container">
            <div className="logo">
              <a href="/">
              {/* <img src={`/api/images/iconImages/${encodeURIComponent("QUDM-logo.png")}`} alt="logo" /> */}
              <img src="/images/logo/QUDM-logo.png" alt="logo"/>
              {/* <div className = 'overlay-image'/> This is the glowy logo */} 
              </a>
            </div>

            <h1><span className="highlight-container"><span className="highlight">Queen's Dance Marathon</span></span></h1>

            <div className="main-menu">
              <ul>
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/team">Meet the Team</a>
                </li>
                <li>
                  <a href="/gallery">Gallery</a>
                </li>
                <li>
                  <a href="/blog">Blog</a>
                </li>
                <li>
                  <a className="btn" href="https://cheofoundation.donordrive.com/index.cfm?fuseaction=donorDrive.personalCampaign&participantID=44111" target="_blank" rel="noopener noreferrer">
                    <i className="fas fa-user"></i> Donate
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      );
};

export default Navbar;
