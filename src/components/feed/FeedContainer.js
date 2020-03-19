import React from 'react';
import Article from './Article';

export default function FeedContainer({ feed }) {
	return (
		<table>
			{feed.results.map((article, index) => {
				return (
					<Article
						key={index}
						article={article}
						number={Number(feed.next.split('=')[2]) - feed.results.length + index + 1}
					/>
				);
			})}
		</table>
	);
}
