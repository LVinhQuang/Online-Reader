// src/components/StoryList.js
import React from 'react';
import StoryCard from './StoryCard';

const StoryList = ({ stories }) => {

  return (
    <>
      {stories.length > 0 && (<h3>Story list</h3>)}
      <ul>
        {stories.map(story => (
          <StoryCard key={story.name} story={story} />
        ))}
      </ul>
    </>
  );
}


export default StoryList;
