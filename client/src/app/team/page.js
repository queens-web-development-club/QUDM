"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";
import './team.css';
import Nav from "../components/nav/nav.js";
import Footer from "../components/footer/footer";

const PagesTeam = () => {
  const [team, setTeam] = useState([]);

  const fetchTeam = async () => {
    try {
      const response = await fetch("/api/get-team");
      if (!response.ok) {
        throw new Error("Failed to fetch team");
      }
      const teamData = await response.json();
      setTeam(teamData);
    } catch (error) {
      console.error("Error fetching team:", error);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  return (
    <div className="team-page">
      <Nav />
      <div className="team-container">
        <h1 className="team-title">Meet Our Team</h1>
        
        <div className="team-grid">
          {team.map((member, index) => (
            <div key={index} className="team-member-card">
              <div className="team-member-image-wrapper">
                <Image
                  src={member.imageUrl}
                  alt={member.name}
                  layout="fill"
                  objectFit="cover"
                  className="team-member-image"
                />
              </div>
              <div className="team-member-info">
                <h3 className="team-member-name">{member.name}</h3>
                <p className="team-member-title">{member.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PagesTeam;