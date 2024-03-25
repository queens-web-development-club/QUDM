import Image from "next/image";
import Nav from "./components/nav/nav.js";
import Footer from "./components/footer/footer.js";
import Contact from "./components/contact/contact.js";
import './home.css';



export default function Home() {
  return (
    <div>

      <Nav/>
      {/*TITLE SECTION*/}
      <section className="title">
        <div className="title-container">
            <div className="header">Queen's Dance Marathon</div>
            <div className="subheader">Dancing for Miracles, Moving for a Cause!</div>
        </div>
      </section>
      {/*END OF TITLE SECTION*/}

      {/*EVENT SECTION (blank space placeholder, remove it as needed Thomas)*/}

      <div className="main-frame">
        <div className="left-grid">

          <div className="left-title">
            <span className="our-events">OUR EVENTS</span>
          </div>


          <div className="our-events-message">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </div>
          <div className="events-button-container">
            
            <button className="cssbuttons-io-button">
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
              <Image src="https://images.unsplash.com/photo-1581260466152-d2c0303e54f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=50" alt="Blank Image" width={500} height={250} />
            </div>
          </div>
        </div>
      </div>
      {/*END OF EVENT SECTION*/}
      <section>
        <Contact/>
      </section>
      {/*ABOUT SECTION*/}
      <section className="about-section">
      <div className="about-container">
        <div className="left">
          <div className="image-container">
            {/* Using online sample for now. can use local files as well */}
            <Image src="https://images.unsplash.com/photo-1581260466152-d2c0303e54f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=50" alt="Blank Image" width={500} height={250} />
          </div>
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
          <div className="bottom-right">
            {/* Add content for the bottom-right section here if needed */}
            {/* Subsection with 5 images... i should probably make these an array at some point */}
            <div className="image-gallery">
                <Image src="https://images.unsplash.com/photo-1581260466152-d2c0303e54f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=50" alt="Image 1" width={100} height={100} />
                <Image src="https://images.unsplash.com/photo-1581260466152-d2c0303e54f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=50" alt="Image 2" width={100} height={100} />
                <Image src="https://images.unsplash.com/photo-1581260466152-d2c0303e54f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=50" alt="Image 3" width={100} height={100} />
                <Image src="https://images.unsplash.com/photo-1581260466152-d2c0303e54f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=50" alt="Image 4" width={100} height={100} />
                <Image src="https://images.unsplash.com/photo-1581260466152-d2c0303e54f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=50" alt="Image 5" width={100} height={100} />
            </div>
          </div>
        </div>
      </div>
    </section>
    {/*END OF ABOUT SECTION*/}

    {/*FOOTER SECTION*/}
    <Footer/>
    {/*FOOTER SECTION*/}
    </div>
  );
}
