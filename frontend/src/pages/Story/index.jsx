import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getStoryByName } from '../../utils/apiFunctions'
import { Container, Row, Col } from 'react-bootstrap';
import ErrorDialog from '../../components/Error/ErrorDialog'

const Story = () => {
    const [story, setStory] = useState(null);
    const [error, setError] = useState(null)
    const [readingSession, setReadingSession] = useState(null)
    const { domain, name } = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        const fetchStoryDetail = async () => {
            const result = await getStoryByName(domain, name)
            if (result && result.success) {
                // console.log("result in story page fetched", result);
                setStory(result?.data);
            } else if (result) {
                setError(result.message);
            } else {
                setError("No data returned from the API. Please try again later.");
            }
        }
        fetchStoryDetail()
    }, [name]);

    useEffect(() => {
        const loadReadingSession = () => {
            const storyHistory = JSON.parse(localStorage.getItem('history'))
            if (storyHistory && storyHistory[name]) {
                setReadingSession({
                    name,
                    id: storyHistory.id,
                })
            }
        }
        loadReadingSession()
    }, [])

    const handleCloseErrorDialog = () => {
        setError(null);
        navigate("/")
    };

    return (
        <>
            {!story ? (
                <div className="d-flex justify-content-center align-items-center vh-100">
                    <div className="component__spinner"></div>
                </div>
            ) : (
                <Container className="shadow mt-5 mb-5 py-5">
                    <Row className="justify-content-center">
                        <Col className="md-6">
                            <div className="d-flex justify-content-center">
                                <img
                                    style={{ width: "100%", maxWidth: "400px", height: "auto" }}
                                    src={story.image}
                                />
                            </div>
                            <hr />
                            <div className="story__chapter-list">
                                <h3>Chapters</h3>
                                <ul>
                                    {story.chapters.map((chapter, index) => (
                                        <li key={index}>
                                            <Link to={`/read/${name}/${index}`}>
                                                {chapter.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Col>
                        <Col className="md-6">
                            <div>
                                <div className="my-2">
                                    <h2>{story.title}</h2>
                                    <p className="py-0 my-0">Author: {story.author}</p>
                                    <p className="py-0 my-0 d-block">{story.numberOfChapters} chapters</p>

                                    {readingSession && (
                                        <Link
                                            to={`/read/${readingSession.name}/${readingSession.id}`}
                                            style={{"textDecoration": "none"}}
                                        >
                                            <p className="text-success p-0 mx-0 my-2">Continue reading</p>
                                        </Link>
                                    )}
                                </div>
                                <hr />
                                <div>
                                    <p><b>Introduction:</b></p>
                                    <div className="story_intro mt-2" dangerouslySetInnerHTML={{ __html: story.intro }}>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        </Col>
                    </Row>
                </Container>
            )}
            {!!error && (<ErrorDialog isOpen={!!error} btnTitle={"Go Home"} message={error} onClose={handleCloseErrorDialog} />)}
        </>
    )
};

export default Story;
