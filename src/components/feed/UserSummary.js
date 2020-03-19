import React from 'react';
import moment from 'moment';
import './UserSummary.css';

export default function UserSummary({ userSummary }) {
	return (
		<React.Fragment>
			<span className="username">{userSummary.user.username}</span>
			<span className="timestamp">{moment(userSummary.created_on).fromNow()}</span>
			<div className="user-summary">
				<p>{userSummary.summary_text}</p>
			</div>
		</React.Fragment>
	);
}
