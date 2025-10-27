import type { FunctionComponent } from "react";
import ImageParallax from "../ImageParallax";
import TypeText from "../TypeText";
import ColumnSplit from "../ColumnSplit";
import CommentSection from "../CommentSection";
import Badge from "../Badge";
import axios from "axios";

const addComment = async (data: { id: number, username: string, comment: string }) => {
  const res = await axios.post('http://localhost:4004/comments', data);
  console.log(res.data);
};

const FrontPage: FunctionComponent = () => {
  return (
    <div>
      <button
        style={{ position: 'fixed', left: '100%', top: '100%', transform: 'translate(-10vw, -10vh)' }}
        onClick={() =>
          window.scrollTo({ top: 0, behavior: "smooth" })}>
        ↑
      </button>

      <ImageParallax src="https://flyingmag1.b-cdn.net/wp-content/uploads/sites/2/2022/06/AdobeStock_249454423-scaled-1.jpeg" />

      <TypeText text="Book the vacation of your life." />

      <section className="info-section"
        style={{ padding: "2%" }}>
        <p>Whether you're looking for a relaxing getaway, a thrilling adventure, or an authentic cultural experience, we're here to make it happen. Our team takes pride in crafting unique travel experiences that match your interests, schedule, and budget.</p>
        <p>From hidden gems off the beaten path to world-famous destinations, we'll guide you every step of the way. With our expertise and passion for exploration, all you have to do is pack your bags and let the journey begin.</p>
        <p>Because with us, traveling isn't just about reaching a destination; it's about discovering the world in your own way.</p>
      </section>

      <h1 style={{ textAlign: "center" }}>Why choose us?</h1>
      <ColumnSplit splitCount={4}>
        <div>
          <Badge src='question_mark.png' />
          <h2>Understanding</h2>
          <p>Lorem ipsum</p>
        </div>

        <div>
          <Badge src='smile.png' />
          <h2>Servicing</h2>
          <p>Lorem ipsum</p>
        </div>

        <div>
          <Badge src='service.png' />
          <h2>Servicing</h2>
          <p>Lorem ipsum</p>
        </div>

        <div>
          <Badge src='service.png' />
          <h2>Servicing</h2>
          <p>Lorem ipsum</p>
        </div>
      </ColumnSplit>

      <CommentSection onSubmit={addComment} />
      <p>(C) Copyright. All rights reserved.</p>
    </div>
  );
};

export default FrontPage;