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
							number={(feed.page-1)*25+(index + 1)}
							methods={methods}
						/>
					);
				})}
			</tbody>
		</table>
	);
}
