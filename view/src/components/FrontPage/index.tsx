import type { FunctionComponent } from "react";
import ImageParallax from "../ImageParallax";
import TypeText from "../TypeText";
import ColumnSplit from "../ColumnSplit";
import CommentSection from "../CommentSection";
import Badge from "../Badge";
import "./style.css";
import content from "../../content.json";
import Gallery from "../Gallery";

const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

const FrontPage: FunctionComponent = () => {
  return (
    <div style={{ backgroundColor: "white" }}>
      <button className="scroll-btn" onClick={toTop}>
        ↑
      </button>

      <ImageParallax
        src={content.thumbnail1}
      />

      <TypeText text="Book the vacation of your life." />

      <section
        className="info-section, container"
        style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "5%" }}>
        <img
          style={{ width: "50%", height: "50%" }}
          src="https://ceoworld.biz/wp-content/uploads/2024/04/Adventure-Tourism.jpg" />
        <div>
          <p>Whether you're looking for a relaxing getaway, a thrilling adventure, or an authentic cultural experience, we're here to make it happen. Our team takes pride in crafting unique travel experiences that match your interests, schedule, and budget.</p>
          <p>From hidden gems off the beaten path to world-famous destinations, we'll guide you every step of the way. With our expertise and passion for exploration, all you have to do is pack your bags and let the journey begin.</p>
          <p>Because with us, traveling isn't just about reaching a destination; it's about discovering the world in your own way.</p>
        </div>
      </section>

      <h1 style={{ textAlign: "center" }}>Why choose us?</h1>
      <ColumnSplit splitCount={4}>
        <div className="container">
          <p>⛰️</p>
          <h2>Discover Breathtaking Places</h2>
          <p>From tropical beaches to snowy mountains, we help you find your dream destination. Personalized recommendations ensure every trip is unforgettable.</p>
        </div>

        <div className="container">
          <p>🤑</p>
          <h2>Curated Travel Packages</h2>
          <p>Enjoy specially curated travel packages with accommodations, activities, and guided tours included. Flexible options for solo travelers, couples, and families.</p>
        </div>

        <div className="container">
          <p>💚</p>
          <h2>Seamless Booking Experience</h2>
          <p>Book your flights, hotels, and experiences in a few clicks. Our easy-to-use platform ensures smooth planning from start to finish.</p>
        </div>

        <div className="container">
          <p>👋​</p>
          <h2>Travel Like a Local</h2>
          <p>Our team of local guides and experts provide insider tips and authentic experiences, helping you explore off-the-beaten-path gems.</p>
        </div>
      </ColumnSplit>

      <h1 style={{ textAlign: "center" }}>Check out some pics of our offers</h1>
      <Gallery />

      <CommentSection />
      <p style={{ textAlign: "center" }}>(C) Copyright. All rights reserved.</p>
    </div>
  );
};

export default FrontPage;