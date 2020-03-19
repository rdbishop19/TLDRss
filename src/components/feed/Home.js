import React, { useState, useEffect } from 'react';
import ApiManager from '../../modules/ApiManager';
import Article from './Article';
import './Home.css'
import FeedContainer from './FeedContainer';

export default function Home() {
	const [ feed, setFeed ] = useState({
        previous: '',
        next: '',
		results: []
	});
    const [ loading, setLoading ] = useState(false);

	const updateLoading = () => setLoading((prevState) => !prevState);
	const getFeed = () => {
		updateLoading();
        ApiManager.getAll('articles').then(setFeed).then(updateLoading);
    };

	const getNewPage = (url) => {
		if (url != null) {
			updateLoading();
            ApiManager.getPage(url).then(setFeed).then(updateLoading);
		}
	};

	useEffect(getFeed, []);

	return (
		<React.Fragment>
			<div className="button-container">
			    <button disabled={loading} onClick={() => getNewPage(feed.previous)}>
    				Prev
    			</button>
    			<button disabled={loading} onClick={() => getNewPage(feed.next)}>
    				Next
    			</button>
			</div>
			<span>{feed.count && `(${feed.count} articles)`}</span>
            <FeedContainer feed={feed} />
			<div className="button-container">
			    <button disabled={loading} onClick={() => getNewPage(feed.previous)}>
    				Prev
    			</button>
    			<button disabled={loading} onClick={() => getNewPage(feed.next)}>
    				Next
    			</button>
			</div>
		</React.Fragment>
	);
}
