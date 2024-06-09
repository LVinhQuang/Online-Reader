import React from 'react'
import StoryList from '../Story/StoryList'
import Pagination from '@mui/material/Pagination'

const SearchResult = ({ stories, page, totalPages, onPageChange }) => {

    if (!stories) {
        return (<p>No story found :(</p>)
    }

    if (stories.length > 0) {
        return (
            <>
                <div className="container">
                    <div id="search-result-title">
                        <h3>Search result</h3>
                        <p>{stories.length} results of this page</p>
                    </div>
                    <div className="d-flex justify-content-center align-items-center p-2 m-2">
                        <Pagination
                            count={totalPages}
                            page={page}
                            onChange={onPageChange}
                            variant="outlined"
                            color="secondary"
                            showFirstButton
                            showLastButton
                        />
                    </div>
                    <StoryList stories={stories} />
                    <div className="d-flex justify-content-center align-items-center p-2 m-2">
                        <Pagination
                            count={totalPages}
                            page={page}
                            onChange={onPageChange}
                            variant="outlined"
                            color="secondary"
                            showFirstButton
                            showLastButton
                        />
                    </div>
                </div>
            </>
        )
    }
}

export default SearchResult
