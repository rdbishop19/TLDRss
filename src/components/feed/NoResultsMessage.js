import React from 'react'

export default function NoResultsMessage({ filter }) {
    return (
        filter
        ? 
        <p>No results for "{filter}"</p> 
        : 
        <p>Something went wrong. Please try again</p>
    )
}
