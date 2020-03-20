import React from 'react';
import moment from 'moment'

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
				(<a
					rel="noopener noreferrer"
					href={article.link}
					target="_blank"
					className="feedname"
					title={article.link}
				>
					{article.feed.name}
				</a>)
			</span>
			<p className="timestamp">{article.pub_date ? moment(article.pub_date).fromNow() : 'some time ago'}</p>
		</React.Fragment>
	);
}
