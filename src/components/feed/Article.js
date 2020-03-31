import React from 'react';
import './Article.css';
import ArticleData from './ArticleData';

export default function Article({ article, number, methods, isMainView, isLoggedIn, index, config }) {

	const { summaryIndex } = config
	
	const handleSummaryClick = () => {
		methods.highlightSelectedArticle(index)
		methods.getSummaries(article.id)
	}

	const selectedArrowStyle = {
		visibility: summaryIndex === index ? 'visible' : 'hidden',
		borderLeftColor: 'orangered'
		// borderLeftColor: 'rgba(0,170,230,0.9)'
	}

	return (
		<tr className={`article ${summaryIndex === index && "selected"}`}>
			<td className="number">
				<span >{number}.</span>
			</td>
            <td onClick={()=>methods.upvoteArticle(article.id, index)} title="upvote" className="upvote-link" style={{ verticalAlign: "top"}}>
                <div className="arrow-up"></div>
				<div className="arrow-up show-me"></div>
            </td>
			<td>
			    <ArticleData article={article} methods={{...methods, handleSummaryClick}} isMainView={isMainView} isLoggedIn={isLoggedIn}/>
			</td>
            <td title="view tl;drs" onClick={handleSummaryClick} className="tldr-link">
                <div className="arrow-right show-me" style={selectedArrowStyle}></div>
                <div className="arrow-right" style={selectedArrowStyle}></div>
                <div className="arrow-right show-me"></div>
            </td>
		</tr>
	);
}
