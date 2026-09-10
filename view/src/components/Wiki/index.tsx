import { useState, type FunctionComponent } from "react";
import Collapsible from "../Collapsible";

import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { type PagedQuery, type WikiPost } from "../../types";
import axios from "axios";
import Pager from "../Pager";
import { useNavigate } from "react-router";

const QuoteWrapper = styled.blockquote`
  position: relative;
  margin: 3rem auto;
  padding: 1rem 2.5rem;

  &::before {
    content: "“";
    position: absolute;
    top: -3rem;
    left: -1rem;
    font-family: Georgia, "Times New Roman", serif;
    font-size: 10rem;
    line-height: 1;
    color: #111827;
    opacity: 0.08;
    z-index: 0;
  }

  &::after {
    content: "”";
    position: absolute;
    bottom: -6.5rem;
    right: -1rem;
    font-family: Georgia, "Times New Roman", serif;
    font-size: 10rem;
    line-height: 1;
    color: #111827;
    opacity: 0.08;
    z-index: 0;
  }
`;

const Wrapper = styled.div`
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
  background-color: white;
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

const PostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const PostCard = styled.div`
  padding: 16px 18px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease;
  background-color: white;

  &:hover {
    border-color: orange;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    transform: translateX(2px);
  }
`;

const PostTitle = styled.h3`
  margin: 0 0 4px;
  font-size: 1.05rem;
  color: #111827;
`;

const PostMeta = styled.span`
  font-size: 0.8rem;
  color: #9ca3af;
`;

interface VotableCollapsibleProps {
  title: string,
  thumbnailSrc: string,
  alt?: string,
  children: React.ReactNode
}

const VotableCollapsible = ({ title, thumbnailSrc, alt, children }: VotableCollapsibleProps) => (
  <Collapsible
      title={title}
      thumbnailSrc={thumbnailSrc}
      alt={alt}
    >
      {children}
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <button>+1</button>
        <p>0</p>
        <button>-1</button> 
      </div>
    </Collapsible>
);

const Wiki: FunctionComponent = () => {
  const [query, setQuery] = useState("");
  const [pageNo, setPageNo] = useState(1);
  const navigate = useNavigate();

  const { data: wikiPage, isLoading: wikiLoading, ...q } = useQuery<PagedQuery<WikiPost>>({
    queryKey: ["wiki-page"],
    queryFn: async () => {
      try {
        const wikiRes = await axios.get(`http://localhost:4004/api/wiki?page=${pageNo}&search=${query}`);
        return wikiRes.data;
      } catch (error) {
        console.error(error);
      }
    }
  });

  const search = () => q.refetch();

  return (
    <div style={{ margin: 60 }}>
      <Wrapper>
        <Header>
          <h1>Wiki</h1>
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

        {wikiPage && (
          <>
            {wikiPage.content.length === 0 ? (
              <EmptyState>No wiki posts found.</EmptyState>
            ) : (
              <PostList>
                {wikiPage.content.map((post) => (
                  <PostCard key={post.id} onClick={() => navigate(`/wiki/${post.id}`)}>
                    <PostTitle>{post.title}</PostTitle>
                    <PostMeta>{new Date(post.date).toLocaleDateString()}</PostMeta>
                  </PostCard>
                ))}
              </PostList>
            )}

            <Pager state={{ pageNo, ...wikiPage }} onPageChange={(no) => setPageNo(no)} />
          </>
        )}
      </Wrapper>

      <div className="slight-margin">
        <h1>Featured</h1>
        <VotableCollapsible
          title="Frankfurt"
          thumbnailSrc="frankfurt-skyline-cbd-hochhaeuser-skyscrapers.jpg"
          alt="Image of Frankfurt Skyline from Skyline Atlas"
        >
          <h2>Frankfurt</h2>
          <QuoteWrapper>
            <p>Frankfurt was a city state, the Free City of Frankfurt, for nearly five centuries, and was one of the most important cities of the Holy Roman Empire, as a site of Imperial coronations; it lost its sovereignty upon the collapse of the empire in 1806, regained it in 1815 and then lost it again in 1866, when it was annexed (though neutral) by the Kingdom of Prussia. It has been part of the state of Hesse since 1945. Frankfurt is culturally, ethnically and religiously diverse, with half of its population, and a majority of its young people, having a migrant background. A quarter of the population consists of foreign nationals, including many expatriates. In 2015, Frankfurt was home to 1,909 ultra high-net-worth individuals, the sixth-highest number of any city. As of 2023, Frankfurt is the 13th-wealthiest city in the world and the third-wealthiest city in Europe (after London and Paris).</p>
          </QuoteWrapper>
          <a href="https://en.wikipedia.org/wiki/Frankfurt">Wikipedia</a>
        </VotableCollapsible>

        <VotableCollapsible
          title="Tokyo"
          thumbnailSrc="https://www.japan-guide.com/thumb/destination_tokyo.jpg"
          alt="Image of Tokyo from Japan Guide"
        >
          <h2>Tokyo</h2>
          <QuoteWrapper>
            <p>Tokyo (東京, Tōkyō) is Japan's capital and the world's most populous metropolis. It is also one of Japan's 47 prefectures, consisting of 23 central city wards and multiple cities, towns and villages west of the city center. The Izu and Ogasawara Islands are also part of Tokyo.

              Prior to 1868, Tokyo was known as Edo. Previously a small castle town, Edo became Japan's political center in 1603 when Tokugawa Ieyasu established his feudal government there. A few decades later, Edo had grown into one of the world's largest cities. With the Meiji Restoration of 1868, the emperor and capital moved from Kyoto to Edo, which was renamed Tokyo ("Eastern Capital"). Large parts of Tokyo were destroyed in the Great Kanto Earthquake of 1923 and the air raids of 1945.</p>
          </QuoteWrapper>
          <a href="https://www.japan-guide.com/e/e2164.html">Japan Guide</a>
        </VotableCollapsible>

        <VotableCollapsible
          title="Transylvania"
          thumbnailSrc="https://chasingthedonkey.b-cdn.net/wp-content/uploads/2018/04/Draculas-castle_Transylvania_shutterstock_153673181.jpg"
          alt="Image of Transylvania from Chasing The Donkey"
        >
          <h2>Transylvania</h2>
          <QuoteWrapper>
            <p>Transylvania is home to some of Europe's best-preserved medieval towns and outstanding rural landscapes. Brasov - home to the largest Gothic church in Eastern Europe, Sibiu - with its cobblestone streets and Transylvanian Baroque architecture, and Sighisoara hilltop citadel with secret passageways and a 14th century clock tower are some of Transylvania most popular destinations. Tiny shops that offer antiques and handicrafts made by local artisans line the narrow streets flanked by pastel-colored houses of the historic sections of many other towns in Transylvania.</p>
          </QuoteWrapper>
          <a href="https://romaniatourism.com/transylvania.html">Romania Tourism</a>
        </VotableCollapsible>

        <VotableCollapsible
          title="Grand Canyon"
          thumbnailSrc="https://upload.wikimedia.org/wikipedia/commons/a/aa/Dawn_on_the_S_rim_of_the_Grand_Canyon_%288645178272%29.jpg"
          alt="Image of the Grand Canyon's rim from Wikipedia"
        >
          <h2>Grand Canyon</h2>
          <QuoteWrapper>
            <p>The Grand Canyon is a river valley in the Colorado Plateau that exposes uplifted Proterozoic and Paleozoic strata, and it is also one of the six distinct physiographic sections of the Colorado Plateau province. Even though it is not the deepest canyon on land in the world (Kali Gandaki Gorge in Nepal is much deeper), the Grand Canyon is known for its visually overwhelming size and its intricate and colorful landscape. Geologically, it is significant because of the thick sequence of ancient rocks that are well preserved and exposed in the walls of the canyon. These rock layers record much of the early geologic history of the North American continent.</p>
          </QuoteWrapper>
          <a href="https://en.wikipedia.org/wiki/Grand_Canyon">Wikipedia</a>
        </VotableCollapsible>

        <div style={{ height: 100 }}></div>
      </div>
    </div>
  );
};

export default Wiki;