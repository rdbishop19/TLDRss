import React, { useState, useEffect } from 'react';
import ApiManager from '../../modules/ApiManager';
import Article from './Article';
import './Home.css';
import FeedContainer from './FeedContainer';
import SummaryContainer from './SummaryContainer';
import { isAuthenticated } from '../auth/simpleAuth';
import { useLocation } from 'react-router-dom';
import { parse } from 'query-string';

export default function Home() {

	const location = useLocation()
	const prevArticleId = location.state ? location.state.articleId : null

    // console.log(location.search);
    //=> '?foo=bar'
     
	const parsed = parse(location.search);
	
	const [ searchTerm, setSearchTerm ] = useState(null)
	
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

	const updateLoading = () => setLoading((prevState) => !prevState);
	const getFeed = () => {
		updateLoading();
		if (location.search) {
			ApiManager.getAll(`articles?search=${parsed.filter}`).then(setFeed).then(updateLoading);
		}
		else if (location.pathname === '/coronavirus'){
			ApiManager.getAll('articles?coronavirus=true').then(setFeed).then(updateLoading);
		} else {
			ApiManager.getAll('articles').then(setFeed).then(updateLoading);
		}
	};

	const getNewPage = (url) => {
		if (url != null) {
			updateLoading();
			ApiManager.getPage(url).then(setFeed).then(updateLoading);
		}
	};

	const getPrevArticle = () => {
		if (prevArticleId) {
			getSummaries(prevArticleId)
		}
	}

	const getSummaries = (articleId) => {
		// if(selectedArticle){
		// 	if (window.confirm("Clear current submission?")){
		// 		setSelectedArticle(articleId);
		// 	} else return
		// }
		setSelectedArticle(articleId);
		if (isAuthenticated()){
			ApiManager.getAll(`summaries?article=${articleId}&user=true`).then((res) => setUserSummary(res.results[0]));
		}
		ApiManager.getAll(`summaries?article=${articleId}`).then(setSummaries);
	};

	const postNewSummary = (item) => {
		ApiManager.post('summaries', item).then(() => getSummaries(selectedArticle));
	};

	useEffect(()=> {
		// console.log('useEffect')
		setSearchTerm(parsed.filter)
		getFeed()
		getPrevArticle()
	}, [parsed.filter]);

	return (
		<React.Fragment>
			<div className="button-container">
				{feed.previous && (
					<button disabled={loading} onClick={() => getNewPage(feed.previous)}>
						Prev
					</button>
				)}
				{feed.next && (
					<button disabled={loading} onClick={() => getNewPage(feed.next)}>
						Next
					</button>
				)}
			</div>
			<span>{feed.count && `(${feed.count} articles)`}</span>
			<div className="full">
				<div className="left">
					<FeedContainer feed={feed} methods={{ getSummaries }} />
				</div>
				<div className="right">
					{selectedArticle && (
						<SummaryContainer 
							summaries={summaries}
							userSummary={userSummary}
							selected={selectedArticle}
							methods={{postNewSummary}} />
					)}
				</div>
			</div>
			<div className="button-container">
				{feed.previous && (
					<button disabled={loading} onClick={() => getNewPage(feed.previous)}>
						Prev
					</button>
				)}
				{feed.next && (
					<button disabled={loading} onClick={() => getNewPage(feed.next)}>
						Next
					</button>
				)}
			</div>
		</React.Fragment>
	);
}
