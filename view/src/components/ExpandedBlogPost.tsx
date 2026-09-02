import { useNavigate, useParams } from "react-router";
import type { BlogPost } from "../types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ExpandedBlogPost = () => {
  const id = parseInt(useParams().id || "1", 10);
  const navigate = useNavigate();

  const { data, isLoading } = useQuery<BlogPost>({
    queryKey: ["blog-post"],
    queryFn: async () => {
      try {
      const postRes = await axios.get(`http://localhost:4004/api/blog/${id}`);
      return postRes.data;
      } catch (_error) {
        navigate(-1);
      }
    }
  });

  return (
    <div className="container" style={{ width: "95%", margin: '20px' }}>
      {isLoading && <p>Please wait...</p>}
      {data && (
        <>
          <h1 style={{ textAlign: "center" }}>{data.title}</h1>
          <sub style={{ color: "black" }}>{data.description}</sub>
          <sub style={{ color: "black", textAlign: "center" }}>Posted on {data.date}</sub>
          <div dangerouslySetInnerHTML={{
            __html: data.html
          }}
          />
          <p>{data.likes} Likes</p>
        </>
      )}
    </div>
  );
};

export default ExpandedBlogPost;