import React, { useEffect, useState, useCallback } from 'react';
import UserSummary from './UserSummary';
import NewSummaryForm from './NewSummaryForm';
import { ArticleData } from './ArticleData';
import ApiManager from '../../modules/ApiManager';
import { isAuthenticated } from '../auth/simpleAuth';
import { Link, useParams, useLocation } from 'react-router-dom';
import SummaryList from './SummaryList';

import './ArticleLoad.css';
import './SummaryContainer.css';

export const SummaryContainer = ({ 
	// summaries, 
	// userSummary, 
	selected, 
	methods, 
	// status, 
	// loading,
	// setLoading, 
	// methods: { setLoading },
	feed,
	prevArticleId,
}) => {
	// console.log('feed', feed)
	const params = useParams();
	const location = useLocation();

	const [ summaries, setSummaries ] = useState({
		results: []
	});
	const [ selectedArticle, setSelectedArticle ] = useState(selected);
	const [ userSummary, setUserSummary ] = useState(null);
	const [ isEditing, setIsEditing ] = useState(false)
	const [ loading, setLoading ] = useState(true);
	const [ article, setArticle ] = useState({
		link: '',
		feed: {
			id: '',
			name: ''
		},
		description: '',
		pub_date: '',
		title: ''
	});
	const getArticleInfo = () => {
		setLoading(true);
		if (selected) {
			ApiManager.get('articles', selected).then((res) => {
				setArticle(res);
				setLoading((prevState) => !prevState);
			});
		}
		else if (params.articleId){
			ApiManager.get('articles', params.articleId).then((res) => {
				setArticle(res);
				setLoading((prevState) => !prevState);
			});
		}
		else if (feed?.results.length) {
			ApiManager.get('articles', feed.results[0].id).then((res) => {
				setArticle(res);
				setLoading((prevState) => !prevState);
			});
		}
	};
	//// ##############################
	// handle redirect from register/login; otherwise, get first article info
	const getPrevArticle = useCallback(() => {
		if (prevArticleId) {
			getSummaries(prevArticleId);
		} else if (params.articleId) {
			getSummaries(params.articleId);
		} else if (selected) {
			getSummaries(selected);
		} else if (feed?.results.length) {
			getSummaries(feed.results[0].id);
		}
	}, [feed, params.articleId, prevArticleId, selected]);
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
	useEffect(()=>{
		getPrevArticle()
	}, [getPrevArticle, feed, selected])
	//// #################################
	useEffect(getArticleInfo, [ selected, feed ]);
	return (
		<div className="summary-container">
			{loading ? (
				<span className="lds-dual-ring article-box">loading...</span>
			) : (
				<div className="article-box">
					<ArticleData article={article} isLoggedIn={isAuthenticated()} methods={methods} />
					<br />
					{isAuthenticated() ? userSummary && !isEditing ? (
						<React.Fragment>
							<p className="section-header">Your TL;DR</p>
							<table>
								<tbody>
									<UserSummary 
										isCurrentUser={true}
										userSummary={userSummary}
										methods={{
											upvoteSummary,
											deleteSummary,
											openEditDialog,
										}}
									/>
								</tbody>
							</table>
						</React.Fragment>
					) : (
						<NewSummaryForm
							selected={selected}
							methods={{
								postNewSummary, 
								patchSummary
							}}
							isEditing={isEditing}
							userSummary={userSummary}
						/>
					) : (
						<Link
							style={{ color: 'orange', fontWeight: 'bolder' }}
							to={{ pathname: '/login', state: { articleId: selected ? selected : params.articleId, path: location.pathname  } }}
						>
							Login to add a summary
						</Link>
					)}
				</div>
			)}
			<SummaryList 
				summaries={summaries} 
				methods={{
					upvoteSummary,
					deleteSummary,
					openEditDialog,
				}} 
			/>
		</div>
	);
}
