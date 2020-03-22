import React from 'react';
import moment from 'moment'
import { Link } from 'react-router-dom';

export default function ArticleData({ article }) {
	return (
		<React.Fragment>
			<a
				href={article.link}
				rel="noopener noreferrer"
				target="_blank"
				title={article.link}
				className="article-link"
			>
				{article.title}
			</a>
			<span className="external-link">
				(<Link
					to={`/feed/source/${article.feed.id}`}
					className="feedname"
					title={article.link}
				>
					{article.feed.name}
				</Link>)
			</span>
			<p className="timestamp">{article.pub_date ? moment(article.pub_date).fromNow() : 'some time ago'}</p>
		</React.Fragment>
	);
}
