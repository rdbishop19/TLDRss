import React, { useState, useEffect } from 'react';
import ApiManager from '../../modules/ApiManager';
import Article from './Article';
import './Home.css';
import './LoadSymbol.css'
import './NewPageLoader.css'
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
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [parsed.filter]);

	return (
		<React.Fragment>
			<span className="button-container">
				<button disabled={loading || !feed.previous} onClick={() => getNewPage(feed.previous)}>
					Prev
				</button>
				<button disabled={loading || !feed.next} onClick={() => getNewPage(feed.next)}>
					Next
				</button>
			</span>
			<span style={{ visibility: feed.results.length && loading ? 'visible' : 'hidden' }} class="lds-ellipsis"><span></span><span></span><span></span><span></span></span>
			<br/>
			<span>{feed.count && `(${feed.count} articles)`}</span>
			<div className="full">
				<div className="left">
					{feed.results.length ? 
						<FeedContainer feed={feed} methods={{ getSummaries }} /> : 
						<>
							<div class="lds-hourglass"></div>
							<div>fetching articles...</div>
							<br/>
						</>
					}
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
