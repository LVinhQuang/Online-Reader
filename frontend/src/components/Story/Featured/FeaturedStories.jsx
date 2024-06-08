import React from 'react'
import './Featured.css'
import { Container } from 'react-bootstrap'

const FeaturedStories = ({ stories }) => {
  return (
    <Container>
      <h3>Featured Stories</h3>
      {stories?.length > 0 && (
        <div className="index-intro">
          {stories.map((story, index) => (
            <div className="item" key={index}>
              <img className="item-img" src={story.image} alt="featured story image"/>
              <div className="title">{story.title}</div>
            </div>
          ))}
        </div>
      )}
      {(stories?.length == 0) && (<p>No story</p>)}
    </Container>
  )
}

export default FeaturedStories
