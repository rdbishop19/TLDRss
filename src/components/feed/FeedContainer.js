import React from 'react';
import Article from './Article';

export default function FeedContainer({ feed, methods }) {
	return (
		<table cellSpacing="0" cellPadding="0">
			<tbody>
				{feed.results.map((article, index) => {
					return (
						<Article
							key={index}
							article={article}
							number={Number(feed.next.split('=')[2]) - feed.results.length + index + 1}
							methods={methods}
						/>
					);
				})}
			</tbody>
		</table>
	);
}
