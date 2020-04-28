import React from 'react';
import './PageButtons.css'

export default function PageButtons({ loading, previous, next, getNewPage }) {
	return (
		<div className="button-container">
			<button disabled={loading || !previous} onClick={()=>getNewPage(previous)}>
				Prev
			</button>
			<button disabled={loading || !next} onClick={()=>getNewPage(next)}>
				Next
			</button>
		</div>
	);
}
