import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import type { PagedQuery, WikiPost } from "../../types";
import Pager from "../Pager";
import DynamicTable from "../DynamicTable";
import AlertContext from "../../AlertContext";

const Wrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;

  h2 {
    margin: 0;
  }
`;

const NewPostButton = styled.button`
  background-color: #111827;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #1f2937;
  }
`;

const SearchBar = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 1.5rem;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 10px 14px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.95rem;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

const SearchButton = styled.button`
  padding: 10px 18px;
  border: 1px solid #d1d5db;
  background-color: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const LoadingText = styled.p`
  color: #6b7280;
  text-align: center;
  padding: 2rem 0;
`;

const EmptyState = styled.p`
  color: #9ca3af;
  text-align: center;
  padding: 3rem 0;
`;

interface ControllableWikiPost extends WikiPost {
  pendingApproval: boolean
}

const ManageWiki = () => {
  const [query, setQuery] = useState("");
  const [pageNo, setPageNo] = useState(1);
  const [selected, setSelected] = useState<ControllableWikiPost | null>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const showAlert = useContext(AlertContext);

  const { data: wikiPage, isLoading: wikiLoading, ...q } = useQuery<PagedQuery<ControllableWikiPost>>({
    queryKey: ["wiki-page"],
    queryFn: async () => {
      try {
        const wikiRes = await axios.get(`http://localhost:4004/api/wiki/admin?page=${pageNo}&search=${query}`);
        return wikiRes.data;
      } catch (error) {
        console.error(error);
      }
    }
  });

  const postMutation = useMutation({
    mutationFn: async ({ wikiPost }: { wikiPost: ControllableWikiPost }) => {
      try {
        await axios.put(`http://localhost:4004/api/wiki/${wikiPost.id}`, wikiPost);
        queryClient.invalidateQueries({ queryKey: ["wiki-page"] });
        showAlert(`Post ${wikiPost.pendingApproval ? "unapproved" : "approved"}.`, "", false);
      } catch (error) {
        console.error(error);
      }
    }
  })

  const search = () => q.refetch();

  return (
    <>
      <Wrapper>
        <Header>
          <h2>Wiki</h2>
          <NewPostButton onClick={() => navigate("/wiki/new")}>
            + New Post
          </NewPostButton>
        </Header>

        <SearchBar>
          <SearchInput
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search wiki posts..."
            onKeyDown={(e) => e.key === "Enter" && search()}
          />
          <SearchButton onClick={search}>Search</SearchButton>
        </SearchBar>

        {wikiLoading && <LoadingText>Please wait...</LoadingText>}

        <div className="container" style={{ display: "inline-block" }}>
          {wikiPage && (
            <>
              {wikiPage.content.length === 0 ? (
                <EmptyState>No wiki posts found.</EmptyState>
              ) : (
                <DynamicTable
                  items={wikiPage.content}
                  onRowSelect={(post) => setSelected(post as ControllableWikiPost)}
                />
              )}
              <button
                disabled={!selected}
                onClick={() => postMutation.mutate({ wikiPost: { ...selected!, pendingApproval: !selected!.pendingApproval } })}>
                  {selected?.pendingApproval ? "Approve" : "Unapprove"}
              </button>

              <Pager state={{ pageNo, ...wikiPage }} onPageChange={(no) => setPageNo(no)} />
            </>
          )}
        </div>
      </Wrapper>
    </>
  );
};

export default ManageWiki;