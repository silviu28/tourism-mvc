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

      <ImageParallax src="bg.jpg" />

      <TypeText text="You should.. now!" />

      <section className="info-section"
        style={{ padding: "2%" }}>
        <p>We are a group of people experts in the art of traveling. Whether it's the culture, the food or just the nice places, we know everything there is to know about places around the Globe.</p>
        <p>Our job is to try to satisfy our customers' needs through the services we provide.</p>
        <p>After all, the world is so big, why stay in one place? </p>
        <p>Here's a list of some services we provide:</p>
        <ul>
          <li>Trip advising and trip planning</li>
          <li>Affordable prices</li>
          <li>Great platform with easy access to everything</li>
        </ul>
      </section>

      <ColumnSplit splitCount={2}>
        <ImageParallax src="/bg.jpg" />
        <ImageParallax src="/bg.jpg" />
      </ColumnSplit>

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
    </div >
  );
};

export default FrontPage;