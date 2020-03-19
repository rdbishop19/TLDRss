import React, { useState, useEffect } from 'react';
import ApiManager from '../../modules/ApiManager';
import Article from './Article';
import './Home.css';
import FeedContainer from './FeedContainer';
import SummaryContainer from './SummaryContainer';

export default function Home() {
	const [ feed, setFeed ] = useState({
		previous: '',
		next: '',
		results: []
	});
    const [ loading, setLoading ] = useState(false);
    const [ summaries, setSummaries ] = useState({
        results: []
    })

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
    
    const getSummaries = () => {
        console.log('boom')
        ApiManager.getAll('summaries').then(setSummaries)
    }

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
			<div className="full">
				<div className="left">
					<FeedContainer feed={feed} methods={{getSummaries}} />
				</div>
				<div className="right">
					<SummaryContainer summaries={summaries}/>
				</div>
			</div>
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
