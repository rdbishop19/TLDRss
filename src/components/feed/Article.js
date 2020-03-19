import React from 'react';
import './Article.css';
import moment from 'moment';

export default function Article({ article, number, methods }) {
	return (
		<tr>
			<td className="number">
				<span >{number}.</span>
			</td>
            <td valign="top" title="upvote" className="upvote-link">
                <div className="arrow-up"></div>
            </td>
			<td>
			    <a href={article.link} title={article.link} className="article-link">
    				{article.title}
    			</a>
    			<span className="external-link">(<a href={article.link} className="feedname" title={article.link}>{article.feed.name}</a>)</span>
    			<p className="timestamp">{article.pub_date && moment(article.pub_date).fromNow()}</p>
			</td>
            <td valign="top" title="view tl;drs" onClick={methods.getSummaries} className="tldr-link">
                <div className="arrow-right"></div>
            </td>
		</tr>
	);
}
