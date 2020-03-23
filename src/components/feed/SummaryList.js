import React from 'react';
import UserSummary from './UserSummary';

export default function SummaryList({ summaries }) {
	return (
		<React.Fragment>
			<p className="section-header">Community TL;DRs</p>
			{summaries.results.length > 0 ? (
				summaries.results.map((summary, index) => <UserSummary key={index} userSummary={summary} />)
			) : (
               <React.Fragment>
                    <div className="instructions">
                        <p>No TL;DRs yet... </p>
                        <p>Be the <span>FIRST</span> and help your fellow internet comrades.</p>
                        <p>It's easy.</p>
                        <p>1. Read the article</p>
                        <p>2. Sum it up here</p>
                        <p>3. K.I.S.S.</p>
                        <p>4. That's TL;DRss</p>
                    </div>
               </React.Fragment>
			)}
		</React.Fragment>
	);
}
