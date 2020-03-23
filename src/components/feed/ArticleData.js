import React from 'react';
import moment from 'moment';
import { Link, useLocation } from 'react-router-dom';

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
				(<Link to={`/feed/source/${article.feed.id}`} className="feedname" title={article.link}>
					{article.feed.name}
				</Link>)
			</span>
			<div className="article-extras">
				<span className="timestamp">{article.pub_date ? moment(article.pub_date).fromNow() : 'some time ago'}</span>{" | "}
				{isMainView && <><span className="fake-link" title="view tl;drs" onClick={()=>methods.getSummaries(article.id)}>TL;DR</span>{" | "}</>}
				{isMainView && (
					<React.Fragment>
						{isLoggedIn && location.pathname === "/feed/saved" ? 
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
