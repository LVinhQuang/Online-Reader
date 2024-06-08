import React from 'react'
import './Featured.css'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const FeaturedStories = ({ stories, source }) => {
  return (
    <Container>
      <h3>Featured Stories</h3>
      {stories?.length > 0 && (
        <div className="index-intro">
          {stories.map((story, index) => (
            <Link to={`/stories/${source}/${story.nameUrl}`} key={index}>
              <div className="item">
                <img className="item-img" src={story.image} alt="featured story image" />
                <div className="title">{story.title}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
      {(stories?.length == 0) && (<p>No story</p>)}
    </Container>
  )
}

export default FeaturedStories
