"use client"

import Image from "next/image";
import Nav from "./components/nav/nav.js";
import Footer from "./components/footer/footer.js";
import Contact from "./components/contact/contact.js";
import Popup from "./components/popup/popup.js";
import './home.css';
import React, { useRef, useState, useEffect } from 'react';





export default function Home() {

  const nextSectionRef = useRef(null);
  const [stats, setStats] = useState([]);

  const scrollToNextSection = () => {
    nextSectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
          const response = await fetch('http://localhost:3002/api/stats/get');
          const statsData = await response.json();
          console.log(statsData);
  
          const statsArray = Object.entries(statsData).map(([key, value]) => ({ id: key, data: value }));
  
          setStats(statsArray); // Set the state to the array
      } catch (error) {
          console.error('Error fetching statistics:', error);
      }
  };

    fetchStats();
}, []);
  
  return (
    <div className="grainy">

      <Nav/>
      
      {/* 
      <Popup/>
      */}
      

      {/*EVENT SECTION (blank space placeholder, remove it as needed Thomas)*/}

      <div className="main-frame">
        <div className="left-grid">

          <div className="left-title">
            <span className="our-events">Dancing for Miracles, Moving for a Cause!</span>
          </div>


          <div className="our-events-message">
            {stats.map((stat, index) => (
              <div className={`block-${index + 1}`} key={index}>
                <div className={`bubble-text-${index + 1}`}>{stat.data}</div>
                <div>
                  {stat.id === 'stat1' && "raised in total"}
                  {stat.id === 'stat2' && "club launched in"}
                  {stat.id === 'stat3' && "active programs across Canada"}
                </div>
              </div>
            ))}
          </div>

          <div className="events-button-container">
            
            <button onClick={scrollToNextSection} className="cssbuttons-io-button">
              Learn More
              <div className="icon">
                <svg
                  height="24"
                  width="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path
                    d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </button>
          </div>

        </div>
        <div className="right-grid">
          <div className="right-grid-image">
            <div className="image-container">
              <img src="images/gallery/5D86D980-FAA1-4C03-8B8C-A1155A8EC381.JPG" alt="Blank Image" width={0} height={500} />
            </div>
          </div>
        </div>
      </div>
      {/*END OF EVENT SECTION*/}
      <section ref={nextSectionRef} className="circles-main">
        <div className="wave"></div>
        <div className="icon-container">
            <div className="icon-text-container">
                <img src="images/icons/hospital.png" alt="Hospital Logo"/>
                <div className="icon-text">
                    <strong>Supporting the local children’s hospital</strong>
                    <p>100% of the funds raised by QUDM is directly donated to our university's local children’s hospital, CHEO in Ottawa.</p>
                </div>
            </div>
            <div className="icon-text-container">
                <img src="images/icons/star.png" alt="Star Logo"/>
                <div className="icon-text">
                    <strong>Advancing care for sick children</strong>
                    <p>Your donations fund critical treatments and healthcare services for children, bringing them a brighter future.</p>
                </div>
            </div>
            <div className="icon-text-container">
                <img src="images/icons/tie.png" alt="Tie Logo"/>
                <div className="icon-text">
                    <strong>Helping students gain leadership and non-profit business experience</strong>
                    <p>The students who organize our dance marathon and fundraise for our club spend a year gaining valuable skills for their future.</p>
                </div>
            </div>
        </div>
      </section>
      
      {/*ABOUT SECTION*/}
      <section className="about-section">
      <div className="about-container">
        <div className="left">
        </div>
        <div className="right">
          <div className="top-right">
            <div className="text-container">
              <h2>About QUDM</h2>
              <p>
                Queen's University Dance Marathon is a student-run club aiming to raise funds and awareness for the Children's Miracle Network! 
                100% of QUDM's efforts provide hope & care for the kids at the Children's Hospital of Eastern Ontario (CHEO)! 
                The funds raised by our events help cover the cost of medical equipment, charitable care, medical research, and patient services.
              </p>
            </div>
          </div>
        </div>
      </div>
    
    </section>
    
    {/*END OF ABOUT SECTION*/}
    <section>
        <Contact/>
    </section>

    {/*FOOTER SECTION*/}
    <Footer/>
    {/*FOOTER SECTION*/}
    </div>
  );
}
