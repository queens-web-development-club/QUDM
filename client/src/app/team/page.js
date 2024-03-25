import Image from "next/image";
import './team.css';
import Nav from "../components/nav/nav.js"; 
import React from "react";
import Footer from '../components/footer/footer';

const PagesTeam = () => {




  return (
    <div class="main">
      <Nav />
      <section class="main-container">
        
        <div class="title-team">
          <div class="title-text">
            Meet The Team!
          </div>
        </div>
        <div class="grid">
          
          <div class="image-container">
            <Image src="https://images.unsplash.com/photo-1581260466152-d2c0303e54f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=50" alt="Blank Image" width={500} height={600} />
          
          </div>

          <div class="image-container">
            <Image src="https://images.unsplash.com/photo-1581260466152-d2c0303e54f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=50" alt="Blank Image" width={500} height={600} />
          </div>

          <div class="image-container">
            <Image src="https://images.unsplash.com/photo-1581260466152-d2c0303e54f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=50" alt="Blank Image" width={500} height={600} />
          </div>

          <div class="image-container">
            <Image src="https://images.unsplash.com/photo-1581260466152-d2c0303e54f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=50" alt="Blank Image" width={500} height={600} />
          </div>

          
          
          
        </div>
        <div class="club-container"> 
          <div class="club-team">
            <div class="club-text">
              The Club!
            </div>
          </div>
          

          <div class="club">
          
            <div class="club-container-photo">
              <Image src="https://images.unsplash.com/photo-1581260466152-d2c0303e54f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=50" alt="Blank Image" width={500} height={600} />
            </div>
            <div class="club-container-photo">
              <Image src="https://images.unsplash.com/photo-1581260466152-d2c0303e54f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=50" alt="Blank Image" width={500} height={600} />
            </div>

        
          </div>

        </div>
      </section>

      <Footer />
    </div>
    
  )
}

export default PagesTeam;
