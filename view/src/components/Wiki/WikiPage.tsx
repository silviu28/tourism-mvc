import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router"
import type { WikiPost } from "../../types";
import axios from "axios";
import NotFound from "../NotFound";

interface ExpandedWikiPost {
  wikiPost: WikiPost;
  html: string
};

const WikiPage = () => {
  const id = useParams().id;

  const { data, isLoading } = useQuery<ExpandedWikiPost>({
    queryKey: ["wiki-post"],
    queryFn: async () => {
      try {
        const pageRes = await axios.get(`http://localhost:4004/api/wiki/${id}`);
        return pageRes.data;
      } catch (error) {
        console.error(error);
      }
    }
  });

  if (!isLoading && !data) return <NotFound />;

  return (
    <div className="container">
      {data && (
        <>
          <h2>{data.wikiPost.title}</h2>
          <p>Posted on {data.wikiPost.date}</p>
          <p>{data.wikiPost.user.username} | {data.wikiPost
              .coauthors
              .map((coauth) => coauth.username)
              .join(", ") 
              || "No co-authors"}</p>
          <div
            dangerouslySetInnerHTML={{
              __html: data.html
            }}
          />
        </>
      )}
    </div>
  );
};

export default WikiPage;