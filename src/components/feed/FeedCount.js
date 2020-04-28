import React from 'react'

export default function FeedCount({ count }) {
    return (
        <span>{`(${count} articles)`}</span>
    )
}
