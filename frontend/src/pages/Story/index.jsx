import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getStoryByName } from '../../utils/apiFunctions'
import { Container, Row, Col } from 'react-bootstrap';
const Story = () => {
    const [story, setStory] = useState(null);
    const [error, setError] = useState('')
    const [readingSession, setReadingSession] = useState(null)
    const { domain, name } = useParams();

    useEffect(() => {
        getStoryByName(domain, name).then(result => {
            if (result?.success) {
                console.log("story fetched", result.data)
                setStory(result?.data)
            } else {
                setError(result?.message)
            }
        })
    }, [name]);

    useEffect(() => {
        const loadReadingSession = () => {
            const storyHistory = localStorage.getItem('history')
            if (!!storyHistory && storyHistory.hasOwnProperty(name)) {
                setReadingSession({
                    name,
                    id: storyHistory.id,
                })
            }
        }
        loadReadingSession()
    }, [])

    if (!story) return <div>Loading...</div>;
    return (
        <Container className="shadow mt-5 mb-5 py-5">
            <Row className="justify-content-center">
                {error && (<p>Error: {error}</p>)}
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
                            <p className="py-0 my-0">{story.numberOfChapters} chapters</p>

                            {readingSession && (
                                <Link
                                    to={`/read/${readingSession.name}/${readingSession.id}`}
                                >Continue reading</Link>
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
            <Row>

            </Row>
        </Container>
    );
};

export default Story;
