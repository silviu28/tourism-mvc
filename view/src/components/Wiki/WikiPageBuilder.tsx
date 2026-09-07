/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface PreviewState {
  title: string;
  html: string;
};

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

const LOCAL_STORAGE_KEY = "wiki_draft";

const WikiPageBuilder = () => {
  const [title, setTitle] = useState("");
  const [html, setHtml] = useState("");
  const [preview, setPreview] = useState<PreviewState | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      const { title: savedTitle, html: savedHtml } = JSON.parse(stored) as { title: string, html: string };
      setTitle(savedTitle);
      setHtml(savedHtml);
    }
  }, []);

  function handlePreview(event: any) {
    event.preventDefault();
    setPreview({ title, html });
  }

  async function handlePublish(event: any) {
    event.preventDefault();

    if (!title.trim() || !html.trim()) {
      setSaveError("Title and content can't be empty.");
      return;
    }

    setSaving(true);
    setSaveError(null);

    try {
      await axios.post(
        "/api/wiki",
        { title, html },
        { withCredentials: true }
      );

      setTitle("");
      setHtml("");
      setPreview(null);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (err) {
      console.error("Failed to publish wiki page:", err);
      setSaveError("Failed to publish. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  function handleLocalSave(event: any) {
    event.preventDefault();

    try {
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({ title, html, savedAt: new Date().toISOString() })
      );
    } catch (err) {
      console.error("Failed to save draft locally:", err);
      setSaveError("Failed to save draft locally.");
    }
  }

  return (
    <div className="container">
      <h1>Wiki</h1>
      <p>Write a new page</p>

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
    </div>
  );
};

export default WikiPageBuilder;