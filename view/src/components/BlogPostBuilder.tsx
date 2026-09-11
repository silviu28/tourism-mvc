import { useEffect, useState } from "react";
import styled from "styled-components";
import useAdminAuth from "../hooks/useAdminAuth";
import NotFound from "./NotFound";

interface PreviewState {
  title: string;
  html: string;
};

const BuilderLayout = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const BuilderPane = styled.div`
  flex: 1;
  min-width: 0;
  height: 75vh;
  width: 40vw;
`;

const PreviewPane = styled.div`
  flex: 1;
  min-width: 0;
  position: sticky;
  top: 2rem;
  height: 75vh;
  width: 40vw;
  overflow: scroll;
`;

const EmptyPreview = styled.div`
  border: 1px dashed #d1d5db;
  border-radius: 8px;
  padding: 3rem 1.5rem;
  text-align: center;
  color: #9ca3af;
  font-size: 0.9rem;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 1.25rem;

  label {
    font-size: 0.85rem;
    font-weight: 600;
    color: #374151;
  }
`;

const TitleInput = styled.input`
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
`;

const ContentTextarea = styled.textarea`
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-family: monospace;
  font-size: 0.9rem;
  resize: vertical;
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 1.5rem;
`;

const ErrorText = styled.p`
  color: #dc2626;
  font-size: 0.85rem;
`;

const PreviewPanel = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.5rem;
  background-color: #f9fafb;
`;

const PreviewTitle = styled.h2`
  margin: 0.25rem 0 1rem;
`;

const PreviewContent = styled.div`
  line-height: 1.6;
`;


const BlogPostBuilder = () => {
  const [title, setTitle] = useState("");
  const [html, setHtml] = useState("");
  const [preview, setPreview] = useState<PreviewState | null>(null);
  const [saving, _setSaving] = useState(false);
  const [saveError, _setSaveError] = useState<string | null>(null);
  const auth = useAdminAuth();

  useEffect(() => {
    const last = localStorage.getItem("lastBlog");
    if (last) {
      const { title, blogHtml } = JSON.parse(last)
      setTitle(title);
      setHtml(blogHtml);
    }
  }, []);

  const handlePreview = () => {
    setPreview({ title, html });
  };

  const handlePublish = async () => {
    localStorage.removeItem("lastBlog")
  };

  const handleLocalSave = async () => {
    localStorage.setItem("lastBlog", JSON.stringify({ title, html }))
  };

  if (!auth) return <NotFound />;

  return (
    <BuilderLayout>
      <BuilderPane className="container">
        <h1>Blog</h1>
        <p>Write a new Blog post</p>

        <Field>
          <label>Title</label>
          <TitleInput
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post Title"
          />
        </Field>

        <Field>
          <label>Content (HTML)</label>
          <ContentTextarea
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            placeholder="<p>Write your content here...</p>"
            rows={12}
          />
        </Field>

        <Actions>
          <button onClick={handlePreview}>Preview</button>
          <button onClick={handlePublish} disabled={saving}>
            {saving ? "Publishing..." : "Publish"}
          </button>
          <button onClick={handleLocalSave} disabled={saving}>
            Save Locally
          </button>
        </Actions>

        {saveError && <ErrorText>{saveError}</ErrorText>}
      </BuilderPane>

      <PreviewPane className="container">
        {preview ? (
          <PreviewPanel>
            <PreviewTitle>{preview.title || "Untitled post"}</PreviewTitle>
            <PreviewContent
              dangerouslySetInnerHTML={{
                __html: preview.html,
              }}
            />
          </PreviewPanel>
        ) : (
          <EmptyPreview>Click "Preview" to see how your post will look.</EmptyPreview>
        )}
      </PreviewPane>
    </BuilderLayout>
  );
};

export default BlogPostBuilder;