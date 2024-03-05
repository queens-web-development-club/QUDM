import Image from "next/image";
import Nav from "./components/nav/nav.js"; 

export default function Home() {
  return (
    <div>

      <Nav/>
      <section className="title">
        <div className="container">
          <div className="title-container">
            <h1 className="title-text-xxl">Queen's Dance Marathon</h1>
            <p className="title-text">Dancing for Miracles, Moving for a Cause!</p>
          </div>
        </div>
      </section>
    </div>
  );
}
