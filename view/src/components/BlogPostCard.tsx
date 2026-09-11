import type { MouseEventHandler } from "react";
import type { BlogPost } from "../types";
import { PostCard, CardAccent, PostTitle, PostMeta } from "./atoms";

const BlogPostCard = ({ post, index, onClick, onArchive }: { post: BlogPost, index?: number, onClick: () => void, onArchive?: MouseEventHandler<HTMLButtonElement> }) => {
  return (
    <PostCard
      $delay={(index || 1) * 0.1}
      onClick={onClick}
    >
      <CardAccent />
      <PostTitle>{post.title}</PostTitle>
      <p>{post.description || "No description provided."}</p>
      <PostMeta>
        {new Date(post.date).toLocaleDateString()} | Posted by {post.adminId} 
        {onArchive && (
          <button onClick={onArchive} data-testid={`archive-btn${index ?? 0}`}>Archive</button>
        )}
      </PostMeta>
    </PostCard>
  );
};

export default BlogPostCard;