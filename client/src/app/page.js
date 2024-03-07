import Image from "next/image";
import Nav from "./components/nav/nav.js";
import Footer from "./components/footer/footer.js";
import './home.css';
export default function Home() {
  return (
    <div>

      <Nav/>
      {/*TITLE SECTION*/}
      <section className="title">
        <div className="container">
          <div className="title-container">
            <h1 className="title-text-xxl">Queen's Dance Marathon</h1>
            <p className="title-text">Dancing for Miracles, Moving for a Cause!</p>
          </div>
        </div>
      </section>
      {/*END OF TITLE SECTION*/}

      {/*EVENT SECTION (blank space placeholder, remove it as needed Thomas)*/}
      <div style={{ height: '900px' }} />
      {/*END OF EVENT SECTION*/}

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
    <div style={{ height: '200px' }} />
    <Footer/>
    {/*FOOTER SECTION*/}
    </div>
  );
}
