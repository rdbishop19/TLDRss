import React from 'react';
import Article from './Article';

export default function FeedContainer({ feed, methods }) {
	return (
		<table>
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
