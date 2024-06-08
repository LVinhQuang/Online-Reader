import { useState, useEffect } from 'react';
import { getDomains, searchStory, getFeaturedStories } from '../../utils/apiFunctions'
import StoryList from '../../components/Story/StoryList';
import FeaturedStories from '../../components/Story/Featured/FeaturedStories';
import SearchBar from '../../components/Search/SearchBar';
import { Container, Row, Col } from 'react-bootstrap'
import ErrorDialog from '../../components/Error/ErrorDialog';

const Home = () => {
  const [stories, setStories] = useState([]);
  const [featuredStories, setFeaturedStories] = useState([]);
  const [query, setQuery] = useState('');
  const [source, setSource] = useState('');
  const [sources, setSources] = useState([]);
  const [error, setError] = useState(null)

  useEffect(() => {
    // Fetch sources from the backend
    getDomains().then(result => {
      if (result.success) {
        setSources(result.data)
      } else {
        setError(result.message)
      }
    })
  }, []);

  useEffect(() => {
    getFeaturedStories(source).then(result => {
      if (result?.success) {
        setFeaturedStories(result?.data)
      } else {
        setError(result.message)
      }
    })
  }, [source])

  const handleSearch = async () => {
    const searchResult = await searchStory(source, query);
    if (searchResult.success) {
      setStories(searchResult.data.matchedNovels)
    } else {
      setError(searchResult.message)
    }
  };
  const handleCloseErrorDialog = () => {
    setError(null);
  };

  return (
    <Container className="shadow mt-5 mb-5 py-5">
      <h1>Online Story Reader</h1>
      <hr />
      <Row className="justify-content-center align-items-center gap-2">
        <SearchBar query={query} setQuery={setQuery} sources={sources} setSource={setSource} onSearch={handleSearch} />
        <StoryList stories={stories} />
      </Row>
      <hr />
      <Row className="justify-content-center align-items-center gap-2 mt-2">
        <FeaturedStories stories={featuredStories} />
      </Row>
      <ErrorDialog isOpen={!!error} message={error} onClose={handleCloseErrorDialog} />
    </Container>
  );
};

export default Home;
