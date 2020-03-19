import React from 'react';
import './Article.css';
import moment from 'moment';

export default function Article({ article, number, methods }) {
	return (
		<tr className="article">
			<td className="number">
				<span >{number}.</span>
			</td>
            <td title="upvote" className="upvote-link" style={{ verticalAlign: "top"}}>
                <div className="arrow-up"></div>
            </td>
			<td>
			    <a href={article.link} rel="noopener noreferrer" target="_blank" title={article.link} className="article-link">
    				{article.title}
    			</a>
    			<span className="external-link">(<a rel="noopener noreferrer" href={article.link} target="_blank" className="feedname" title={article.link}>{article.feed.name}</a>)</span>
    			<p className="timestamp">{article.pub_date && moment(article.pub_date).fromNow()}</p>
			</td>
            <td title="view tl;drs" onClick={methods.getSummaries} className="tldr-link">
                <div className="arrow-right show-me"></div>
                <div className="arrow-right"></div>
            </td>
		</tr>
	);
}
