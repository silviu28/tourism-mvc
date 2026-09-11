import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import useAdminAuth from "../hooks/useAdminAuth";
import type { BlogPagedQuery, BlogPost } from "../types";
import { useNavigate } from "react-router";
import BlogPostCard from "../components/BlogPostCard";
import Pager from "../components/Pager";

const Wrapper = styled.div`
  padding: 2rem;
`;

const EMPTY_PAGE: BlogPagedQuery = {
  blogPosts: [],
  totalCount: 0,
  totalPages: 0,
  currentPage: 0,
}

const BlogPosts = () => {
  
  const [pageNo, setPageNo] = useState(1);
  const isAdmin = useAdminAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: blogPage, isLoading: blogsLoading } = useQuery<BlogPagedQuery>({
    queryKey: ["blog-posts"],
    queryFn: async () => {
      try {
        const blogRes = await axios.get<BlogPagedQuery>(`http://localhost:4004/api/blog?page=${pageNo}`);
        return blogRes.data;
      } catch (_error) {
        return EMPTY_PAGE;
      }
    }
  });

  const archiveMutation = useMutation({
    mutationFn: async ({ blogPost }: { blogPost: BlogPost }) => {
      try {
        await axios.put(`http://localhost:4004/api/blog/${blogPost.id}`, {
          ...blogPost,
          archived: true
        });
        queryClient.invalidateQueries({ queryKey: ["blog-posts"] });
      } catch (_error) {
        // ...
      }
    }
  });

  return (
    <Wrapper>
      <h1>Blog</h1>
      {isAdmin && (
        <button onClick={() => navigate("/blog/new")}>+ Write a new post...</button>
      )}
      
      {blogsLoading && <p>Please wait...</p>}

      {blogPage && (
        <>
          {blogPage.blogPosts.map((post, idx) =>
            <BlogPostCard
              onClick={() => navigate(`/blog/${post.id}`)}
              index={idx}
              post={post}
              onArchive={
                isAdmin
                  ? (e) => {
                      e.stopPropagation();
                      archiveMutation.mutate({ blogPost: post });
                    }
                  : undefined
              }
            />
          )}
          <Pager
            state={{ pageNo, totalPages: blogPage?.totalPages }}
            onPageChange={(no) => setPageNo(no)}
          />
        </>
      )}
    </Wrapper>
  );
};

export default BlogPosts;