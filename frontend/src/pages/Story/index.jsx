import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getStoryByName } from '../../utils/apiFunctions'
import { Container, Row, Col } from 'react-bootstrap';
const Story = () => {
    const [story, setStory] = useState(null);
    const [error, setError] = useState('')
    const { name } = useParams();

    useEffect(() => {
        getStoryByName(name).then(story => {
            setStory(story)
        }).catch(error => {
            setError(error.message)
        })
    }, [name]);

    if (!story) return <div>Loading...</div>;

    return (
        <Container className="shadow mt-5 mb-5 py-5">
            <Row className="justify-content-center">
                {error && (<p>Error: {error}</p>)}
                <Col className="md-4">
                    <div>
                        <img
                            style={{ width: "100%", maxWidth: "400px", height: "auto" }}
                            src={story.image} 
                        />
                    </div>
                </Col>
                <Col className="md-4">
                    <div>
                        <h1>{story.name}</h1>
                        <p>Author: {story.author}</p>
                        <div>
                            <h2>Chapters</h2>
                            <ul>
                                {story.chapters.map(chapter => (
                                    <li key={chapter.number}>
                                        <Link to={`/stories${story.name}/${chapter.number}`}>
                                            {chapter.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Story;
