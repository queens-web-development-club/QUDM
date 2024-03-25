"use client"

import React, { useState } from 'react';
import './popup.css';

const Popup = () => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    return (
        <nav className={`popbar ${collapsed ? 'collapsed' : ''}`}>
            <div className="container">
                <div className="logo">
                    <a href="/">
                        <img src="images/logo/QUDM-logo.png" alt="donation popup" />
                    </a>
                </div>
                <button className="collapse-button" onClick={toggleCollapse}>
                    {collapsed ? 'Expand' : 'Collapse'}
                </button>
            </div>
        </nav>
    );
};

export default Popup;
