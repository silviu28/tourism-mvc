import { useEffect, useState } from "react";
import styled from "styled-components";

interface PreviewState {
  title: string;
  html: string;
};

const Wrapper = styled.div`
  padding: 2rem;
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

const BlogPosts = () => {
  const [title, setTitle] = useState("");
  const [blogHtml, setBlogHtml] = useState("");
  const [preview, setPreview] = useState<PreviewState | null>(null);
  const [saving, _setSaving] = useState(false);
  const [saveError, _setSaveError] = useState<string | null>(null);

  useEffect(() => {
    const last = localStorage.getItem("lastBlog");
    if (last) {
      const { title, blogHtml } = JSON.parse(last)
      setTitle(title);
      setBlogHtml(blogHtml);
    }
  }, [])

   const handlePreview = () => {
    setPreview({ title, html: blogHtml });
  };

  const handlePublish = async () => {
    localStorage.removeItem("lastBlog")
  };

  const handleLocalSave = async () => {
    localStorage.setItem("lastBlog", JSON.stringify({ title, blogHtml }))
  };

  return (
    <Wrapper>
      <h1>Blog</h1>
      <p>Write a new post</p>

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
          value={blogHtml}
          onChange={(e) => setBlogHtml(e.target.value)}
          placeholder="<html>Write your content here...</html>"
          rows={12}
        />
      </Field>

      <button onClick={handlePreview}>Preview</button>
      <button onClick={handlePublish} disabled={saving}>
        Publish
      </button>
      <button onClick={handleLocalSave} disabled={saving}>
        Save Locally
      </button>

      {saveError && <ErrorText>{saveError}</ErrorText>}

      {preview && (
        <PreviewPanel>
          <PreviewTitle>{preview.title || "Untitled post"}</PreviewTitle>
          <PreviewContent
            dangerouslySetInnerHTML={{
              __html: preview.html,
            }}
          />
        </PreviewPanel>
      )}
    </Wrapper>
  );
};

export default BlogPosts;