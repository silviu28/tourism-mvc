import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router"
import type { WikiPost } from "../../types";
import axios from "axios";
import NotFound from "../NotFound";
import { useContext } from "react";
import UserContext from "../../UserContext";

interface ExpandedWikiPost {
  wikiPost: WikiPost;
  html: string
};

const WikiPage = () => {
  const id = useParams().id;
  const queryClient = useQueryClient();
  const [user] = useContext(UserContext);

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

  const { mutate: like } = useMutation({
    mutationFn: async () => {
      try {
        await axios.put(`http://localhost:4004/api/wiki/${id}/like`, { user });
        queryClient.invalidateQueries({ queryKey: ["wiki-post"] });
      } catch (error) {
        console.error(error);
      }
    }
  })

  if (!isLoading && !data) return <NotFound />;

  return (
    <div className="container" style={{ width: "80%", height: "100%" }}>
      {data && (
        <>
          <h1>{data.wikiPost.title}</h1>
          <p>Posted on {data.wikiPost.date}</p>
          <p>{data.wikiPost.user.username} | {data.wikiPost
              .coauthors
              .map(({ username }) => username)
              .join() 
              || "No co-authors"}</p>
          <div
            dangerouslySetInnerHTML={{
              __html: data.html
            }}
          />
          <button onClick={() => like()}>Like</button>
          <p>{data.wikiPost.likes ? `${data.wikiPost.likes} people like this.` : "Be the first person to appreciate this post!"}</p>
        </>
      )}
    </div>
  );
};

export default WikiPage;