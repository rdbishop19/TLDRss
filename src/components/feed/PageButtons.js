import React from 'react';

export default function PageButtons({loading, feed, getNewPage}) {
	return (
		<div className="button-container">
			<button disabled={loading || !feed.previous} onClick={() => getNewPage(feed.previous)}>
				Prev
			</button>
			<button disabled={loading || !feed.next} onClick={() => getNewPage(feed.next)}>
				Next
			</button>
		</div>
	);
}
