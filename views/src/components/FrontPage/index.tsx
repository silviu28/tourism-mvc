import type { FunctionComponent } from "react";
import ImageParallax from "../ImageParallax";
import TypeText from "../TypeText";
import ColumnSplit from "../ColumnSplit";
import CommentSection from "../CommentSection";
import Badge from "../Badge";
import axios from "axios";
import "./style.css";
import content from "../../content.json";

const addComment = async (data: { id: number, username: string, comment: string }) => {
  const res = await axios.post('http://localhost:4004/comments', data);
  console.log(res.data);
};

const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

const FrontPage: FunctionComponent = () => {
  return (
    <div>
      <button className="scroll-btn" onClick={toTop}>
        ↑
      </button>

      <ImageParallax
        src={content.thumbnail1}
      />

      <TypeText text="Book the vacation of your life." />

      <section className="info-section, container">
        <p>Whether you're looking for a relaxing getaway, a thrilling adventure, or an authentic cultural experience, we're here to make it happen. Our team takes pride in crafting unique travel experiences that match your interests, schedule, and budget.</p>
        <p>From hidden gems off the beaten path to world-famous destinations, we'll guide you every step of the way. With our expertise and passion for exploration, all you have to do is pack your bags and let the journey begin.</p>
        <p>Because with us, traveling isn't just about reaching a destination; it's about discovering the world in your own way.</p>
      </section>

      <h1 style={{ textAlign: "center" }}>Why choose us?</h1>
      <div className="container">
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
      </div>

      <CommentSection onSubmit={addComment} />
      <p>(C) Copyright. All rights reserved.</p>
    </div>
  );
};

export default FrontPage;