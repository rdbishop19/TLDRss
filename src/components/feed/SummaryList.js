import React from 'react';
import UserSummary from './UserSummary';
import ExtrasContainer from './ExtrasContainer';

export default function SummaryList({ summaries, methods }) {
	return (
		<React.Fragment>
			<p className="section-header">Community TL;DRs</p>
			{summaries.results.length > 0 ? (
				<table cellSpacing="0" cellPadding="0">
					<tbody>
						{summaries.results.map((summary, index) => <UserSummary key={index} index={index} methods={methods} userSummary={summary} listView={true} />)}
					</tbody>
				</table>
			) : (
				<React.Fragment>
					<div className="instructions">
						<p>No TL;DRs yet... </p>
						<p>
							Be the <span>FIRST</span> and help your fellow internet comrades.
						</p>
						<p>It's easy.</p>
						<p>1. Read the article</p>
						<p>2. Sum it up here</p>
						<p>3. <span title="Keep It Super Simple :)">K.I.S.S.</span></p>
						<p>4. That's TL;DRss</p>
					</div>
				</React.Fragment>
			)}
			<ExtrasContainer />
		</React.Fragment>
	);
}
