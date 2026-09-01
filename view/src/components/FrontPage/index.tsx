import type { FunctionComponent } from "react";
import ImageParallax from "../ImageParallax";
import TypeText from "../TypeText";
import ColumnSplit from "../ColumnSplit";
import CommentSection from "../CommentSection";
import content from "../../content.json";
import Gallery from "../Gallery";
import PolaroidImage from "../PolaroidImage";
import ScrollButton from "../ScrollButton";
import RecentBlogPosts from "../RecentBlogPosts";

const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

const FrontPage: FunctionComponent = () => {
  return (
    <div style={{ color: 'white', height: '100%' }}>
      <ScrollButton toTop={toTop} />

      <ImageParallax
        src={content.thumbnail1}
      />

      <TypeText text="Book the vacation of your life." />


      <div style={{ padding: '80px', background: " linear-gradient(0deg,rgba(153, 153, 153, 1) 0%, rgba(250, 238, 232, 1) 47%, rgba(255, 250, 250, 1) 79%, rgba(255, 255, 255, 1) 100%)" }}>
        <div style={{ background: 'white', padding: '40px' }}>
          <hr style={{ marginBottom: 100 }}></hr>
          <section
            className="info-section"
            style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "5%" }}>
              <PolaroidImage
                src="https://ceoworld.biz/wp-content/uploads/2024/04/Adventure-Tourism.jpg"
                alt="Tourists going with kayaks"
                subtext="Image: ceoworld.biz"
              />
              <div className='container'>
                <p>Whether you're looking for a relaxing getaway, a thrilling adventure, or an authentic cultural experience, we're here to make it happen. Our team takes pride in crafting unique travel experiences that match your interests, schedule, and budget.</p>
                <p>From hidden gems off the beaten path to world-famous destinations, we'll guide you every step of the way. With our expertise and passion for exploration, all you have to do is pack your bags and let the journey begin.</p>
                <p>Because with us, traveling isn't just about reaching a destination; it's about discovering the world in your own way.</p>
              </div>
          </section>

          <hr style={{ margin: 100 }}></hr>

          <h1 style={{ textAlign: "center" }}>Why choose us?</h1>
          <ColumnSplit splitCount={4}>
            <div className="container">
              <p className='container-deco'>⛰️</p>
              <h2>Discover Breathtaking Places</h2>
              <p>From tropical beaches to snowy mountains, we help you find your dream destination. Personalized recommendations ensure every trip is unforgettable.</p>
            </div>

            <div className="container">
              <p className="container-deco">🤑</p>
              <h2>Curated Travel Packages</h2>
              <p>Enjoy specially curated travel packages with accommodations, activities, and guided tours included. Flexible options for solo travelers, couples, and families.</p>
            </div>

            <div className="container">
              <p className="container-deco">💚</p>
              <h2>Seamless Booking Experience</h2>
              <p>Book your flights, hotels, and experiences in a few clicks. Our easy-to-use platform ensures smooth planning from start to finish.</p>
            </div>

            <div className="container">
              <p className="container-deco">👋</p>
              <h2>Travel Like a Local</h2>
              <p>Our team of local guides and experts provide insider tips and authentic experiences, helping you explore off-the-beaten-path gems.</p>
            </div>
          </ColumnSplit>

          <hr style={{ margin: 100 }}></hr>

          <h1 style={{ textAlign: "center" }}>Check out some pics of our offers</h1>
          <Gallery />

          <hr style={{ margin: 100 }}></hr>
          <h1 style={{ textAlign: "center" }}>Recent blog posts</h1>
          <RecentBlogPosts />

          <hr style={{ margin: 100 }}></hr>

          <h1 style={{ textAlign: "center" }}>Leave a rating for everyone to see!</h1>
          <CommentSection />
        </div>
      </div>
    </div>
  );
};

export default FrontPage;