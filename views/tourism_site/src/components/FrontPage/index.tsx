import type { FunctionComponent } from "react";
import ImageParallax from "../ImageParallax";
import TypeText from "../TypeText";
import ColumnSplit from "../ColumnSplit";
import CommentSection from "../CommentSection";

const FrontPage: FunctionComponent = () => {
  return (
    <div>
      <button className={["scroll-button", "button1"].join(" ")}
        onClick={() =>
          window.scrollTo({ top: 0, behavior: "smooth" })}>Go
      </button>

      <ImageParallax src="/images/bg.jpg" />

      <TypeText text={"You should.. now!"} />

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
        <ImageParallax src="/images/bg.jpg" />
        <ImageParallax src="/images/bg.jpg" />
      </ColumnSplit>

      <h1 style={{ textAlign: "center" }}>Why choose us?</h1>
      <ColumnSplit splitCount={4}>
        <div>
          <img src={"src/assets/icons/question_mark.png"} />
          <h2>Understanding</h2>
          <p>Lorem ipsum</p>
        </div>

        <div>
          <img src={"src/assets/icons/smile.png"} />
          <h2>Servicing</h2>
          <p>Lorem ipsum</p>
        </div>

        <div>
          <img src={"src/assets/icons/service.png"} />
          <h2>Servicing</h2>
          <p>Lorem ipsum</p>
        </div>

        <div>
          <img src={"src/assets/icons/service.png"} />
          <h2>Servicing</h2>
          <p>Lorem ipsum</p>
        </div>
      </ColumnSplit>

      <CommentSection />
      <p>(C) Copyright. All rights reserved.</p>
    </div>
  );
};

export default FrontPage;