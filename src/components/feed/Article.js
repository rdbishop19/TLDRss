import React from 'react'
import './Article.css'

const style = {
    color: 'black',
    margin: '5px',
    // textDecoration: 'underline'
}

export default function Article({ article }) {
    return (
        <div style={style}>
            <a className="article-link" href={article.link}>{article.title}</a>
            <span>({article.feed.name})</span>
        </div>
    )
}
