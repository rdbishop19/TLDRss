/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import ApiManager from '../../modules/ApiManager';
import './Home.css';
import FeedContainer from './FeedContainer';
import SummaryContainer from './SummaryContainer';
import { isAuthenticated } from '../auth/simpleAuth';
import { useLocation, useParams } from 'react-router-dom';
import { parse } from 'query-string';
import PageButtons from './PageButtons';
import FeedActions from './FeedActions';
import FeedCount from './FeedCount';
import SpinningLoader from '../loaders/SpinningLoader';
import NoResultsMessage from './NoResultsMessage';

export default function Home() {
	const location = useLocation();
	const params = useParams();

	const prevArticleId = location.state ? location.state.articleId : null;

	const parsed = parse(location.search);

	const [ searchTerm, setSearchTerm ] = useState(null);
	const [ sort, setSort ] = useState(false)

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
	const [ summaryIndex, setSummaryIndex ] = useState(0)

	const updateLoading = () => setLoading((prevState) => !prevState);

	const getFeed = () => {

		updateLoading();

		const search_param = location.search ? `search=${parsed.filter}&` : ""
		const sort_param = `sort=${sort}&`
		const relevant_param = `relevant=${sort}&`

		const params_list = sort_param + relevant_param + search_param
		const { pathname } = location
		if (params.feedId) {
			ApiManager.getAll(`articles?feed=${params.feedId}&${params_list}`).then(setFeed).then(updateLoading);
		} else if (pathname === '/coronavirus') {
			ApiManager.getAll(`articles?coronavirus=true&${params_list}`).then(setFeed).then(updateLoading);
		} else if (pathname === '/feed/custom') {
			ApiManager.getAll(`articles?custom=true&${params_list}`).then(setFeed).then(updateLoading);
		} else if (pathname === `/feed/saved`) {
			ApiManager.getAll(`articles?saved=true&${params_list}`).then(setFeed).then(updateLoading);
		} else if (pathname === `/feed/favorites`) {
			ApiManager.getAll(`articles?favorites=true&${params_list}`).then(setFeed).then(updateLoading);
		} else if (pathname === `/feed/mysummaries`) {
			ApiManager.getAll(`articles?usersummaries=true&${params_list}`).then(setFeed).then(updateLoading);
		} else {
			ApiManager.getAll(`articles?${params_list}`).then(setFeed).then(updateLoading);
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
			ApiManager.getPage(url).then(setFeed).then(updateLoading).then(()=>setSummaryIndex(0));
			window.scrollTo(0,0)
		}
	};

	// handle redirect from register/login; otherwise, get first article info
	const getPrevArticle = () => {
		if (prevArticleId) {
			getSummaries(prevArticleId);
		} else if (feed.results.length) {
			getSummaries(feed.results[0].id);
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

	const deleteSavedArticle = url => {
		ApiManager.delete(url).then(getFeed)
	}

	const upvoteArticle = (id, idx) => {
		// post new upvote to db
		ApiManager.post('articleupvotes', {article_id: id})
			.then(res => {
				// if successful, shallow update state without doing another full fetch
				if (res.url){
					// map through results array to find the indexed article and +1 to the upvotes
					let newFeed = feed.results.map((article, index) => idx === index ? {...article, upvote_count: (article.upvote_count + 1) } : article)
					// destructure and reset state
					setFeed({...feed, results: newFeed})
				}
			}
		)
	}

	const upvoteSummary = (id, idx) => {
		// post new summary to db
		ApiManager.post('summaryupvotes', {summary_id: id})
			.then(res => {
				if (res.url){
					// map through results array to find current index
					let summaryList = summaries.results.map((summary, index) => idx === index ? {...summary, upvote_count: (summary.upvote_count + 1) } : summary)
					// destructure and reset state
					setSummaries({...summaries, results: summaryList})
				}
			})
	}

	const deleteSummary = url => {
		ApiManager.delete(url).then(() => getSummaries(selectedArticle))
	}

	const highlightSelectedArticle = (index) => {
		setSummaryIndex(index)
	}
	useEffect(getPrevArticle, [feed])

	useEffect(
		() => {
			// console.log('useEffect')
			setSearchTerm(parsed.filter);
			getFeed();
			getPrevArticle();
		},
		[ parsed.filter, sort ]
	);

	return (
		<div className="main">
			<FeedActions 
				loading={loading} 
				feed={feed} 
				sort={sort} 
				params={params} 
				actions={{ setSort, getNewPage, updateFeedSubscription}}
			/>

			{feed?.results?.length ? <FeedCount count={feed?.count} /> : undefined}

			{/* <SpinningLoader /> */}
			<div className="full">
				<div className="left">   
					{feed.results.length ? (
						<FeedContainer 
							feed={feed} 
							config={{summaryIndex}} 
							methods={{ 
								getSummaries, 
								saveArticle, 
								deleteSavedArticle, 
								upvoteArticle, 
								highlightSelectedArticle 
							}} 
						/>
					) : ( 
						loading 
						? 
						<SpinningLoader /> 
						: 
						<NoResultsMessage filter={parsed?.filter} />
					)}
					{!loading && <PageButtons 
						loading={loading} 
						previous={feed.previous} 
						next={feed.next} 
						getNewPage={getNewPage} 
					/>}
				</div>
				<div className="right">
					{selectedArticle && (
						<SummaryContainer
							summaries={summaries}
							userSummary={userSummary}
							selected={selectedArticle}
							status={isEditing}
							methods={{ 
								postNewSummary, 
								deleteSummary, 
								openEditDialog, 
								patchSummary, 
								saveArticle, 
								upvoteSummary 
							}}
						/>
					)}
				</div>
			</div>

			
		</div>
	);
}
