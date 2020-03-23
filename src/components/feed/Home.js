/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import ApiManager from '../../modules/ApiManager';
import Article from './Article';
import './Home.css';
import './LoadSymbol.css';
import './NewPageLoader.css';
import FeedContainer from './FeedContainer';
import SummaryContainer from './SummaryContainer';
import { isAuthenticated } from '../auth/simpleAuth';
import { useLocation, useParams, Link } from 'react-router-dom';
import { parse } from 'query-string';

export default function Home() {
	const location = useLocation();
	const params = useParams();

	const prevArticleId = location.state ? location.state.articleId : null;

	const parsed = parse(location.search);

	const [ searchTerm, setSearchTerm ] = useState(null);

	const [ feed, setFeed ] = useState({
		previous: null,
		next: null,
		results: []
	});
	const [ loading, setLoading ] = useState(false);
	const [ summaries, setSummaries ] = useState({
		results: []
	});
	const [ selectedArticle, setSelectedArticle ] = useState(null);
	const [ userSummary, setUserSummary ] = useState(null);
	const [ isEditing, setIsEditing ] = useState(false)

	const updateLoading = () => setLoading((prevState) => !prevState);
	const getFeed = () => {
		updateLoading();
		if (params.feedId) {
			ApiManager.getAll(`articles?feed=${params.feedId}`).then(setFeed).then(updateLoading);
		} else if (location.search) {
			ApiManager.getAll(`articles?search=${parsed.filter}`).then(setFeed).then(updateLoading);
		} else if (location.pathname === '/coronavirus') {
			ApiManager.getAll('articles?coronavirus=true').then(setFeed).then(updateLoading);
		} else if (location.pathname === '/feed/custom') {
			ApiManager.getAll('articles?custom=true').then(setFeed).then(updateLoading)
		} else if (location.pathname === '/feed/saved') {
			ApiManager.getAll('articles?saved=true').then(setFeed).then(updateLoading)
		} else {
			ApiManager.getAll('articles').then(setFeed).then(updateLoading);
		}
	};

	const updateFeedSubscription = (feedId) => {
		const newFeed = {
			feed_id: feedId
		}
		ApiManager.post('myfeeds', newFeed)
	};

	const getNewPage = (url) => {
		if (url != null) {
			updateLoading();
			ApiManager.getPage(url).then(setFeed).then(updateLoading);
		}
	};

	const getPrevArticle = () => {
		if (prevArticleId) {
			getSummaries(prevArticleId);
		}
	};

	const getSummaries = (articleId) => {
		// if(selectedArticle){
		// 	if (window.confirm("Clear current submission?")){
		// 		setSelectedArticle(articleId);
		// 	} else return
		// }
		setIsEditing(false);
		setSelectedArticle(articleId);
		if (isAuthenticated()) {
			ApiManager.getAll(`summaries?article=${articleId}&user=true`).then((res) => setUserSummary(res.results[0]));
		}
		ApiManager.getAll(`summaries?article=${articleId}`).then(setSummaries);
	};

	const postNewSummary = (item) => {
		ApiManager.post('summaries', item).then(() => getSummaries(selectedArticle));
	};

	const patchSummary = (url, obj) => {
		ApiManager.patch(url, obj).then(()=> getSummaries(selectedArticle));
	}

	const openEditDialog = (url) => {
		setIsEditing(true)
	}

	const saveArticle = id => {
		// console.log('saving', id)
		ApiManager.post('savedarticles', { 'article_id': id}).then(res => {
			if (res.url){
				window.alert('Article saved to your reading list')
			} else {
				window.alert('Article already in your reading list')
			}
		})
	}

	const deleteSummary = url => {
		ApiManager.delete(url).then(() => getSummaries(selectedArticle))
	}

	useEffect(
		() => {
			// console.log('useEffect')
			setSearchTerm(parsed.filter);
			getFeed();
			getPrevArticle();
		},
		[ parsed.filter ]
	);

	return (
		<React.Fragment>
			<div className="feed-nav">
				<span className="button-container">
					<button disabled={loading || !feed.previous} onClick={() => getNewPage(feed.previous)}>
						Prev
					</button>
					<button disabled={loading || !feed.next} onClick={() => getNewPage(feed.next)}>
						Next
					</button>
				</span>
				<span
					style={{ visibility: feed.results.length && loading ? 'visible' : 'hidden' }}
					className="lds-ellipsis"
				>
					<span />
					<span />
					<span />
					<span />
				</span>
				{/* <br /> */}
				{params.feedId &&
				feed.results.length > 0 && (
					<span className="button-container subscribe">
						{isAuthenticated() ? <button onClick={()=>updateFeedSubscription(params.feedId)}>
							Add {feed.results[0].feed.name} to my feed
						</button> : <Link style={{color:"orange"}}to="/login">Login to subscribe to feed sources</Link>}
					</span>
				)}
				<br />
			</div>
			<span>{feed.results.length > 0 && `(${feed.count} articles)`}</span>
			<div className="full">
				<div className="left">   
					{feed.results.length ? (
						<FeedContainer feed={feed} methods={{ getSummaries, saveArticle }} />
					) : ( loading ? 
						<React.Fragment>
							<div className="lds-hourglass" />
							<div>fetching articles...</div>
							<br />
						</React.Fragment> : <p>No results for "{parsed.filter}"</p>
					)}
				</div>
				<div className="right">
					{selectedArticle && (
						<SummaryContainer
							summaries={summaries}
							userSummary={userSummary}
							selected={selectedArticle}
							status={isEditing}
							methods={{ postNewSummary, deleteSummary, openEditDialog, patchSummary, saveArticle }}
						/>
					)}
				</div>
			</div>
			<div className="button-container">
				<button disabled={loading || !feed.previous} onClick={() => getNewPage(feed.previous)}>
					Prev
				</button>
				<button disabled={loading || !feed.next} onClick={() => getNewPage(feed.next)}>
					Next
				</button>
			</div>
		</React.Fragment>
	);
}
