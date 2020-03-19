import React, { useState, useEffect } from 'react';
import ApiManager from '../../modules/ApiManager';
import Article from './Article';

export default function Home() {
	const [ feed, setFeed ] = useState({
		results: []
	});
	const [ loading, setLoading ] = useState(false);

	const updateLoading = () => setLoading((prevState) => !prevState);
	const getFeed = () => {
		updateLoading();
		ApiManager.getAll('articles').then(setFeed).then(updateLoading);
	};

	const getNewPage = (url) => {
        if (url != null ) {
            updateLoading();
            ApiManager.getPage(url).then(setFeed).then(updateLoading);
        }
	};

	useEffect(getFeed, []);

	return (
		<React.Fragment>
			<h2>feed</h2>
			<span>({feed.count} articles)</span>
			<button disabled={loading} onClick={() => getNewPage(feed.previous)}>
				Prev
			</button>
			<button disabled={loading} onClick={() => getNewPage(feed.next)}>
				Next
			</button>
			{feed.results.map((article, index) => {
				return <Article key={index} article={article} />;
			})}
		</React.Fragment>
	);
}
