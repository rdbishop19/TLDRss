import React from 'react';
import './Article.css';
import moment from 'moment';

export default function Article({ article, number }) {
	return (
		<tr>
			<td className="number">
				<span >{number}.</span>
			</td>
            <td valign="top" title="upvote" className="upvote-link">
                <div className="arrow-up"></div>
            </td>
			<td>
			    <a className="article-link" href={article.link} title={article.link}>
    				{article.title}
    			</a>
    			<span className="feedname">({article.feed.name})</span>
    			<p className="timestamp">{article.pub_date && moment(article.pub_date).fromNow()}</p>
			</td>
		</tr>
	);
}
