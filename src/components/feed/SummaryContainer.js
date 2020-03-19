import React, { useEffect } from 'react';
import UserSummary from './UserSummary';
import NewSummaryForm from './NewSummaryForm';

export default function SummaryContainer({ summaries, userSummary, selected }) {
	return (
		<React.Fragment>
			{userSummary ? (
				<React.Fragment>
                    <p>Your TL;DR</p>
					<UserSummary userSummary={userSummary} />
				</React.Fragment>
			) : (
				<NewSummaryForm selected={selected} />
			)}
            <p>Community TL;DRs</p>
			{summaries.results.map((summary, index) => <UserSummary key={index} userSummary={summary} />)}
		</React.Fragment>
	);
}
