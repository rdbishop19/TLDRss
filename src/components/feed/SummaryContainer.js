import React, { useEffect, useState } from 'react';
import UserSummary from './UserSummary';
import NewSummaryForm from './NewSummaryForm';
import ArticleData from './ArticleData';
import ApiManager from '../../modules/ApiManager';
import { isAuthenticated } from '../auth/simpleAuth';
import { Link } from 'react-router-dom';

export default function SummaryContainer({ summaries, userSummary, selected, methods }) {
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
		ApiManager.get('articles', selected).then(setArticle);
	};
	useEffect(getArticleInfo, [ selected ]);
	return (
		<React.Fragment>
			<ArticleData article={article} />
			{isAuthenticated() ? userSummary ? (
				<React.Fragment>
					<p>Your TL;DR</p>
					<UserSummary userSummary={userSummary} />
				</React.Fragment>
			) : (
				<NewSummaryForm selected={selected} methods={methods} />
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
		</React.Fragment>
	);
}
