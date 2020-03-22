import React, { useEffect, useState } from 'react';
import UserSummary from './UserSummary';
import NewSummaryForm from './NewSummaryForm';
import ArticleData from './ArticleData';
import ApiManager from '../../modules/ApiManager';
import { isAuthenticated } from '../auth/simpleAuth';
import { Link } from 'react-router-dom';
import './ArticleLoad.css';

export default function SummaryContainer({ summaries, userSummary, selected, methods, status }) {
	const [ loading, setLoading ] = useState(false)
	const [ article, setArticle ] = useState({
		link: '',
		feed: {
			name: ''
		},
		description: '',
		pub_date: '',
		title: ''
	});
	const getArticleInfo = () => {
		setLoading(true)
		ApiManager.get('articles', selected)
			.then(res => {
				setArticle(res)
				setLoading(prevState => !prevState)
			});
	};
	useEffect(getArticleInfo, [ selected ]);
	return (
		<React.Fragment>
			{loading ? <span className="lds-dual-ring">loading...</span> :
			<React.Fragment>
				<ArticleData article={article} />
				{isAuthenticated() ? (userSummary && !status) ? (
					<React.Fragment>
						<p>Your TL;DR</p>
						<UserSummary isCurrentUser={true} userSummary={userSummary} methods={methods} />
					</React.Fragment>
				) : (
					<NewSummaryForm selected={selected} methods={methods} status={status} userSummary={userSummary}/>
				) : (
					<Link
						style={{ color: 'orange', fontWeight: 'bolder' }}
						to={{ pathname: '/login', state: { articleId: selected } }}
					>
						Login to add a summary
					</Link>
				)}
				<p>Community TL;DRs</p>
				{summaries.results.map((summary, index) => <UserSummary key={index} userSummary={summary} />)}
			</React.Fragment>}
		</React.Fragment>
	);
}
