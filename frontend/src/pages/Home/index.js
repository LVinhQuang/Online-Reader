import { useState, useEffect } from 'react';
import { getDomains, searchStory } from '../../utils/apiFunctions'
import StoryList from '../../components/Story/StoryList';
import SearchBar from '../../components/Search/SearchBar';
import { Container, Row, Col } from 'react-bootstrap'

const Home = () => {
  const [stories, setStories] = useState([]);
  const [query, setQuery] = useState('');
  const [source, setSource] = useState('');
  const [sources, setSources] = useState([]);

  useEffect(() => {
    // Fetch sources from the backend
    getDomains().then(domains => {
      setSources(domains)
    })
  }, []);

  const handleSearch = async () => {
    const searchResult = await searchStory(source, query);
    setStories(searchResult)
  };

  return (
    <Container className="shadow mt-5 mb-5 py-5">
      <Row className="justify-content-center align-items-center gap-2">
          <h1>Online Story Reader</h1>
          <SearchBar query={query} setQuery={setQuery} sources={sources} setSource={setSource} onSearch={handleSearch} />
          <StoryList stories={stories} />
      </Row>
    </Container>
  );
};

export default Home;
