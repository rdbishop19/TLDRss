import React from 'react'
import './Article.css'
import moment from 'moment'

const style = {
    color: 'black',
    margin: '5px',
    // textDecoration: 'underline'
}

export default function Article({ article }) {
    return (
        <div style={style}>
            <a className="article-link" href={article.link}>{article.title}</a>
            <span className="feedname">({article.feed.name})</span>
            <p className="timestamp">{article.pub_date && moment(article.pub_date).fromNow()}</p>
        </div>
    )
}
