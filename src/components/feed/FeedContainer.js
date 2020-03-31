import React from 'react';
import Article from './Article';
import { isAuthenticated } from '../auth/simpleAuth';

export default function FeedContainer({ feed, methods, config }) {
	const isLoggedIn = isAuthenticated()
	return (
		<table cellSpacing="0" cellPadding="0">
			<tbody>
				{feed.results.map((article, index) => {
					return (
						<Article
							key={index}
							index={index}
							config={config}
							article={article}
							number={(feed.page-1)*25+(index + 1)}
							methods={methods}
							isMainView={true}
							isLoggedIn={isLoggedIn}
						/>
					);
				})}
			</tbody>
		</table>
	);
}
