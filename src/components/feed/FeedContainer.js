import React from 'react';
import Article from './Article';

export default function FeedContainer({ feed, methods }) {
	
	return (
		<table cellSpacing="0" cellPadding="0">
			<tbody>
				{feed.results.map((article, index) => {
					const splitUrl = feed.next.split('=')
					const pageLen = feed.results.length
					const articleNumber = splitUrl[splitUrl.length - 1]
					return (
						<Article
							key={index}
							article={article}
							number={articleNumber - pageLen + index + 1}
							methods={methods}
						/>
					);
				})}
			</tbody>
		</table>
	);
}
