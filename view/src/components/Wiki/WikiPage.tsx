import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router"
import type { WikiPost } from "../../types";
import axios from "axios";
import NotFound from "../NotFound";

interface ExpandedWikiPost extends WikiPost {
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
      {isLoading && <p>Please wait...</p>}
      {data && (
        <>
          <h2>{data.title}</h2>
          <p>Posted on {data.date}</p>
          <p>{data.author} | {data.coauthors.join(", ")}</p>
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