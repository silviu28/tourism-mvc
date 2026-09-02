import { useNavigate, useParams } from "react-router";
import { type PagedQuery, type BlogPost, type CommentData, type UserData } from "../types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import CommentSection from "./CommentSection";
import { useContext, useState } from "react";
import UserContext from "../UserContext";

const ExpandedBlogPost = () => {
  const id = parseInt(useParams().id || "1", 10);
  const navigate = useNavigate();
  const [user] = useContext(UserContext);
  const [pageNo, setPageNo] = useState(1); 
  const queryClient = useQueryClient();

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

  const { data: commentPage, isLoading: commentsLoading } = useQuery<PagedQuery<CommentData>>({
    queryKey: ["post-comments"],
    queryFn: async () => {
      try {
        const commRes = await axios.get(`http://localhost:4004/api/blog/${id}/comments?page=${pageNo}`);
        return commRes.data;
      } catch (_error) {
        // ...
      }
    }
  });

  const postMutation = useMutation({
    mutationFn: async ({ user, comment }: { user: UserData, comment: string }) => {
      try {
        await axios.post(`http://localhost:4004/api/blog/${id}/comment`, { userId: user.id, comment });
        queryClient.invalidateQueries({ queryKey: ["post-comments"] });
      } catch (_error) {
        // ...
      }
    }
  })

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
          <h1>Comments</h1>
          {commentsLoading && <p>Please wait...</p>}
          <CommentSection
            comments={commentPage?.content ?? []} 
            user={user}
            onComment={(user, comment) => {
              postMutation.mutate({ user, comment });
              return postMutation.isError;
            }}
          />
          <button onClick={() => setPageNo(pageNo === 0 ? 0 : pageNo - 1)}>{'<'}</button>
          {pageNo} of {commentPage?.totalPages}
          <button onClick={() => setPageNo(pageNo + 1)}>{'>'}</button>
        </>
      )}
    </div>
  );
};

export default ExpandedBlogPost;