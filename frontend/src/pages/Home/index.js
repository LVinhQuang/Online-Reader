import { useState, useEffect } from 'react';
import { getDomains, searchStory, getFeaturedStories } from '../../utils/apiFunctions'
import StoryList from '../../components/Story/StoryList';
import FeaturedStories from '../../components/Story/Featured/FeaturedStories';
import SearchBar from '../../components/Search/SearchBar';
import { Container, Row } from 'react-bootstrap'
import ErrorDialog from '../../components/Error/ErrorDialog';
import SearchResult from '../../components/Search/SearchResult';
import "../../index.css"

const Home = () => {
  const [stories, setStories] = useState([]);
  const [featuredStories, setFeaturedStories] = useState([]);
  const [query, setQuery] = useState('');
  const [source, setSource] = useState('');
  const [sources, setSources] = useState([]);
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const fetchDomains = async () => {
      const result = await getDomains()
      if (result.success) {
        setSources(result?.data)
      } else {
        setError(result?.message)
      }
    }
    fetchDomains();
  }, []);

  useEffect(() => {
    getFeaturedStories(source).then(result => {
      if (result?.success) {
        setFeaturedStories(result?.data)
      } else {
        setError(result?.message)
      }
    })
  }, [source])

  const handleSearch = async () => {
    const searchResult = await searchStory(source, query);
    if (searchResult.success) {
      setPage(1)
      setStories(searchResult.data)
      setTotalPages(searchResult.totalPages)
    } else {
      setError(searchResult.message)
    }
  };

  const handleCloseErrorDialog = () => {
    setError(null);
  };

  const handlePageChange = async (event, value) => {
    setPage(value);
    // Here you can also fetch data for the new page if you're loading data from an API
    const searchResult = await searchStory(source, query, value);
    if (searchResult && searchResult.success) {
      console.log("fetched search result when user click pagination")
      setStories(searchResult.data)
      setTotalPages(searchResult.totalPages)
    } else if (searchResult) {
      setError(searchResult.message)
    } else {
      setError("No Data received from API. Try again later.")
    }
  };

  return (
    <Container className="shadow mt-5 mb-5 py-5">
      <h2 className="slogan text-center">Embark on Infinite Adventures: Your Gateway to Endless Stories</h2>
      <hr />
      <Row className="justify-content-center align-items-center gap-2">
        <SearchBar
          query={query}
          setQuery={setQuery}
          sources={sources}
          setSource={setSource}
          onSearch={handleSearch}
        />
        <SearchResult stories={stories} page={page} totalPages={totalPages} onPageChange={handlePageChange} />
        {/* <StoryList stories={stories} /> */}
      </Row>
      <hr />
      <Row className="justify-content-center align-items-center gap-2 mt-2">
        <FeaturedStories stories={featuredStories} source={source} />
      </Row>
      <ErrorDialog isOpen={!!error} message={error} onClose={handleCloseErrorDialog} />
    </Container>
  );
};

export default Home;
