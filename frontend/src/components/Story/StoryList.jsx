// src/components/StoryList.js
import React from 'react';
import StoryCard from './StoryCard';
// import ErrorDialog from '../Error/ErrorDialog';

const StoryList = ({ stories }) => {

  return (
    <>
      {!stories && (<p>No story found :(</p>)}
      {stories?.length > 0 && (
        <div className="mx-0">
          <div>
            <h3>Story list</h3>
            <p>{stories.length} results</p>
          </div>
          <ul className="px-4">
            {stories?.map((story, index) => (
              <StoryCard key={index} story={story} />
            ))}
          </ul>
        </div>
      )}
    </>
  );
}


export default StoryList;
