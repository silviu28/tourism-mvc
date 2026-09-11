import type { BlogPost } from "../types";
import { PostCard, CardAccent, PostTitle, PostMeta } from "./atoms";

const BlogPostCard = ({ post, index, onClick }: { post: BlogPost, index?: number, onClick: () => void }) => {
  return (
    <PostCard
      $delay={(index || 1) * 0.1}
      onClick={onClick}
    >
      <CardAccent />
      <PostTitle>{post.title}</PostTitle>
      <p>{post.description || "No description provided."}</p>
      <PostMeta>{new Date(post.date).toLocaleDateString()} | Posted by {post.adminId}</PostMeta>
    </PostCard>
  );
};

export default BlogPostCard;