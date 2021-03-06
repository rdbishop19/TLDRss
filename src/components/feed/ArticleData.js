import React from 'react';
import moment from 'moment';
import { Link, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../auth/simpleAuth';

export default function ArticleData({ article, methods, isMainView, isLoggedIn }) {

	const location = useLocation()
	return (
		<React.Fragment>
			<a
				href={article.link}
				rel="noopener noreferrer"
				target="_blank"
				title={article.link}
				className="article-link"
				style={{ fontWeight: "bold", textDecoration: isMainView ? "none" : "underline"}}
			>
				{article.title}
			</a>
			<span className="external-link">
				(<Link to={`/feed/source/${article.feed.id}`} className="feedname" title={`go to feed`}>
					{article.feed.name}
				</Link>)
			</span>
			<div className="article-extras">
				<span>{article.upvote_count} vote(s)</span>{" | "}
				<span className="timestamp">{article.pub_date ? moment(article.pub_date).fromNow() : 'some time ago'}</span>{" | "}
				{isMainView && <><span className="fake-link" title="view tl;drs" onClick={()=>methods.getSummaries(article.id)}>tl;dr</span>{" | "}</>}
				{(isMainView && isLoggedIn) && (
					<React.Fragment>
						{location.pathname === "/feed/saved" ? 
						<>
							<span className="fake-link" title="read later" onClick={()=>methods.deleteSavedArticle(article.url)}>
								remove
							</span>{" | "}
						</> :
						<>
							<span className="fake-link" title="read later" onClick={()=>methods.saveArticle(article.id)}>
								save
							</span>{" | "}
						</>}
					</React.Fragment>
				)
				}
			</div>
		</React.Fragment>
	);
}
