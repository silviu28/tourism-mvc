import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { EMPTY_PAGE, type BlogPagedQuery, type BlogPost } from "../../types";
import DynamicTable from "../DynamicTable";
import { useContext, useState, type SyntheticEvent } from "react";
import Pager from "../Pager";
import { Link } from "react-router";
import AlertContext from "../../AlertContext";
import Modal from "../Modal";

const BlogForm = ({ blogPost, onSubmit }: { blogPost: BlogPost, onSubmit: (post: BlogPost) => void }) => {
  const [post, setPost] = useState<BlogPost>(() => blogPost);

  const submit = (e: SyntheticEvent) => {
    e.preventDefault();
    onSubmit(post);
  };

  return (
    <form onSubmit={submit} className="flex-col">
      <label>Title</label>
      <input
        type="text"
        value={post.title}
        onChange={e => setPost({
          ...post,
          title: e.target.value
        })}
      />

      <label>Description</label>
      <input
        type="text"
        value={post.description}
        onChange={e => setPost({
          ...post,
          description: e.target.value
        })}
      />

      <label>Content</label>
      <textarea
        value={post.html as string}
        onChange={e => setPost({
          ...post,
          html: e.target.value
        })}
        rows={10}
      />

      <button type="submit">Save Post</button>
    </form>
  );
};

const ManageBlog = ( ) => {
  const queryClient = useQueryClient();
  const setAlert = useContext(AlertContext);
  const [selected, setSelected] = useState<BlogPost | null>(null);
  const [pageNo, setPageNo] = useState(1);
  const [updatingPost, setUpdatingPost] = useState(false);

  const { data: blogPage, isLoading: blogsLoading } = useQuery<BlogPagedQuery>({
    queryKey: ["blog-posts"],
    queryFn: async () => {
      try {
        const blogRes = await axios.get<BlogPagedQuery>(`http://localhost:4004/api/blog/all?page=${pageNo}`);
        return blogRes.data;
      } catch (_error) {
        return EMPTY_PAGE;
      }
    }
  });

  const blogMutation = useMutation({
    mutationFn: async ({ post }: { post : BlogPost }) => {
      try {
        await axios.put(`http://localhost:4004/api/blog/${post.id}`, post);
        queryClient.invalidateQueries({
          queryKey: ["blog-posts"]
        });
      } catch (_error) {
        setAlert("Unable to update blog post.", "", true);
      }
    }
  });
  
  return (
    <>
      <Modal isVisible={selected !== null && updatingPost} visibilitySetter={setUpdatingPost}>
        <BlogForm
          blogPost={selected!}
          onSubmit={(post) => blogMutation.mutate({ post })}
        />
      </Modal>
      <h1>Manage blog posts</h1>
      <div className="container">
        {blogsLoading && (
          <p>Please wait...</p>
        )}
        {blogPage && (
          <>
            <DynamicTable
              items={blogPage.blogPosts}
              onRowSelect={(item) => setSelected(item as BlogPost)}
            />
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
              <button disabled={!selected} onClick={() => setUpdatingPost(true)}>Update</button>
              <button
                disabled={!selected}
                onClick={() => blogMutation.mutate({ post: { ...selected!, archived: !selected!.archived } })}
              >
                {selected?.archived ? 'Unarchive' : 'Archive'}
              </button>
            </div>
            <Pager
              state={{ pageNo, ...blogPage }}
              onPageChange={(no) => setPageNo(no)}
            />
          </>
        )}
        
      </div>
      <h1>Write a new post</h1>
      <div className="container">
        <p>Write a new post <Link to="/blog">here</Link>.</p>
      </div>
    </>
  );
};

export default ManageBlog;