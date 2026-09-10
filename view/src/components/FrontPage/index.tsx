import { useContext, type FunctionComponent } from "react";
import ImageParallax from "../ImageParallax";
import TypeText from "../TypeText";
import ColumnSplit from "../ColumnSplit";
import CommentSection from "../CommentSection";
import content from "../../content.json";
import Gallery from "../Gallery";
import PolaroidImage from "../PolaroidImage";
import ScrollButton from "../ScrollButton";
import axios from "axios";
import { type WikiPost, type BlogPagedQuery, type CommentData } from "../../types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AlertContext from "../../AlertContext";
import UserContext from "../../UserContext";
import { useNavigate } from "react-router";
import styled, { keyframes } from "styled-components";
import { PEACH } from "../../colors";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  text-align: left;
`;

const PostCard = styled.div<{ $delay: number }>`
  position: relative;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 24px 20px;
  cursor: pointer;
  overflow: hidden;
  opacity: 0;
  animation: ${fadeInUp} 0.5s ease forwards ${({ $delay }) => $delay}s;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;

  &:hover {
    border-color: #f97316;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
    transform: translateY(-4px);
  }
`;

const CardAccent = styled.div`
  width: 32px;
  height: 4px;
  border-radius: 2px;
  background-color: #f97316;
  margin-bottom: 16px;
`;

const PostTitle = styled.h3`
  font-size: 1.05rem;
  margin: 0 0 8px;
  color: #111827;
  line-height: 1.4;
`;

const PostMeta = styled.span`
  font-size: 0.8rem;
  color: #9ca3af;
`;

const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

const FrontPage: FunctionComponent = () => {
  const queryClient = useQueryClient();
  const [user] = useContext(UserContext);
  const showAlert = useContext(AlertContext);
  const navigate = useNavigate();

  const { data: comments = [], isLoading } = useQuery<CommentData[]>({
    queryKey: ["comments"],
    queryFn: async () => {
      try {
        const commentsRes = await axios.get("http://localhost:4004/api/comments");
        return commentsRes.data;
      } catch (_error) {
        showAlert("Cannot display comments", "", true);
      }
    }
  });

  const { data: blogPage, isLoading: blogPostsLoading } = useQuery<BlogPagedQuery>({
    queryKey: ["blog-posts"],
    queryFn: async () => {
      try {
        const blogRes = await axios.get("http://localhost:4004/api/blog");
        return blogRes.data;
      } catch (_error) {
        showAlert("Cannot display blog posts", "", true);
      }
    }
  });

  const { data: randomWikiPosts, isLoading: wikiPostsLoading } = useQuery<{ posts: WikiPost[] }>({
    queryKey: ["wiki-posts"],
    queryFn: async () => {
      try {
        const wikiRes = await axios.get("http://localhost:4004/api/wiki/random");
        return wikiRes.data;
      } catch (_error) {
        showAlert("Cannot display wiki posts", "", true);
      }
    }
  })

  const { mutate } = useMutation({
    mutationFn: async (newComment: {
      username: string,
      comment: string
    }) => {
      try {
        await axios.post("http://localhost:4004/api/comments", newComment, {
          withCredentials: true
        });
        queryClient.invalidateQueries({
          queryKey: ["comments"],
        });
      } catch (_error) {
        showAlert("Unable to add your comment", "", true);
      }
    }
  });

  return (
    <div>
      <ScrollButton toTop={toTop} />

      <ImageParallax
        src={content.thumbnail1}
      />

      <TypeText
         text="Book the vacation of your life." 
         actions={[
          {
            name: "Pricing",
            onClick: () => navigate("/prices")
          },
          {
            name: "Blog",
            onClick: () => navigate("/blog")
          },
          {
            name: "Contact us",
            onClick: () => navigate("/contact")
          },
         ]}
      />

      <div style={{ background: PEACH, padding: '40px', marginLeft: '40px', marginRight: '40px' }}>
        <section
          className="info-section"
          style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "5%" }}>
            <PolaroidImage
              src="https://ceoworld.biz/wp-content/uploads/2024/04/Adventure-Tourism.jpg"
              alt="Tourists going with kayaks"
              subtext="Image: ceoworld.biz"
            />
            <div className='shadow-container'>
              <p>Whether you're looking for a relaxing getaway, a thrilling adventure, or an authentic cultural experience, we're here to make it happen. Our team takes pride in crafting unique travel experiences that match your interests, schedule, and budget.</p>
              <p>From hidden gems off the beaten path to world-famous destinations, we'll guide you every step of the way. With our expertise and passion for exploration, all you have to do is pack your bags and let the journey begin.</p>
              <p>Because with us, traveling isn't just about reaching a destination; it's about discovering the world in your own way.</p>
            </div>
        </section>

        <hr style={{ margin: 100 }}></hr>

        <h1 style={{ textAlign: "center" }}>Why choose us?</h1>
        <ColumnSplit splitCount={4}>
          <div className="shadow-container">
            <p className='container-deco'>⛰️</p>
            <h2>Discover Breathtaking Places</h2>
            <p>From tropical beaches to snowy mountains, we help you find your dream destination. Personalized recommendations ensure every trip is unforgettable.</p>
          </div>

          <div className="shadow-container">
            <p className="container-deco">🤑</p>
            <h2>Curated Travel Packages</h2>
            <p>Enjoy specially curated travel packages with accommodations, activities, and guided tours included. Flexible options for solo travelers, couples, and families.</p>
          </div>

          <div className="shadow-container">
            <p className="container-deco">💚</p>
            <h2>Seamless Booking Experience</h2>
            <p>Book your flights, hotels, and experiences in a few clicks. Our easy-to-use platform ensures smooth planning from start to finish.</p>
          </div>

          <div className="shadow-container">
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
        {blogPostsLoading && <p>Please wait...</p>}
        {blogPage && (
          <CardGrid>
            {blogPage?.blogPosts.map((post, index) => (
              <PostCard
                key={post.id}
                $delay={index * 0.1}
                onClick={() => navigate(`/wiki/${post.id}`)}
              >
                <CardAccent />
                <PostTitle>{post.title}</PostTitle>
                <PostMeta>{new Date(post.date).toLocaleDateString()} | Posted by {post.adminId}</PostMeta>
              </PostCard>
            ))}
          </CardGrid>
        )}

        <hr style={{ margin: 100 }}></hr>
        <h1 style={{ textAlign: "center" }}>Check out the Wiki</h1>
        <p>Here's some posts done by people like you.</p>
        {wikiPostsLoading && <p>Please wait...</p>}
        {randomWikiPosts?.posts && (
          <CardGrid>
            {randomWikiPosts.posts.map((post, index) => (
              <PostCard
                key={post.id}
                $delay={index * 0.1}
                onClick={() => navigate(`/wiki/${post.id}`)}
              >
                <CardAccent />
                <PostTitle>{post.title}</PostTitle>
                <PostMeta>{new Date(post.date).toLocaleDateString()}</PostMeta>
              </PostCard>
            ))}
          </CardGrid>
        )}

        <hr style={{ margin: 100 }}></hr>

        <h1 style={{ textAlign: "center" }}>What do you think?</h1>
        {isLoading && <p>Please wait...</p>}
        <CommentSection
          user={user}
          comments={comments}
          onComment={({ username }, comment) => {
            try {
              mutate({ username: username!, comment})
              return true;
            } catch (_error) {
              return false;
            }
          }}
        />
      </div>
    </div>
  );
};

export default FrontPage;