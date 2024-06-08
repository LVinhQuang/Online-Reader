import { Col, Card, CardBody } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const StoryCard = ({ story }) => {
    return (
        <Col className="mb-4" xs={12}>
            <Card>
                <CardBody className="d-flex align-items-center item">
                    <div className="flex-shrink-0 mx-0 mb-3 mb-md-0">
                        <Card.Img
                            variant="top"
                            src={story.image}
                            alt="Story's photo"
                            style={{ width: "100%", maxWidth: "200px", height: "auto" }}
                        />
                    </div>
                    <div className="flex-grow-1 ml-3 px-5">
                        <Card.Title className="story-color">{story.name}</Card.Title>
                        <Card.Title>{story.title}</Card.Title>
                        <Card.Text>Author: {story.author}</Card.Text>
                        <Card.Text>{story.totalChapters} chapters</Card.Text>
                    </div>
                    <div className="flex-shrink-0 mt-3">
                        <Link to={`/stories/${story.name}`} className="btn btn-story btn-sm">
                            View
                        </Link>
                    </div>
                </CardBody>
            </Card>
        </Col>
    )
}

export default StoryCard
