import React from 'react';
import moment from 'moment';
import './UserSummary.css';

export default function UserSummary({ userSummary, methods, isCurrentUser, listView, index }) {

	// check if post has been edited if the updated_on field is greater than 5 minutes diff of created_on
	const timeDiff = moment(userSummary.updated_on).diff(userSummary.created_on, 'minutes')

	return (
		<React.Fragment>
			<tr>
				{listView === true && (
					<td>
						<span className="upvote-link"  onClick={() => methods.upvoteSummary(userSummary.id, index)}>
							<div className="arrow-up" />
							<div className="arrow-up show-me" />
						</span>
					</td>
				)}
				<td>
					<span className="username">{userSummary.user.username}</span>
					<span className="timestamp">{moment(userSummary.created_on).fromNow()}{" "}{timeDiff > 5 && "(edited)"}</span>
					<div className="user-summary">
						<span className="tldr-header">TL;DR: </span>
						<span>{userSummary.summary_text}</span>
					</div>
					<span className="summary-extras">{userSummary.upvote_count} vote(s)</span>
					{' | '}
					{isCurrentUser === true && (
						<div className="button-container btn-summary" title="remove summary">
							<button onClick={() => methods.deleteSummary(userSummary.url)}>del</button>
							<button onClick={() => methods.openEditDialog(userSummary.url)}>edit</button>
						</div>
					)}
				</td>
			</tr>
		</React.Fragment>
	);
}
