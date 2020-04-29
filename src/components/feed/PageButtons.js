import React from 'react';
import './PageButtons.css'

export default function PageButtons({ loading, previous, next, getNewPage }) {
	return (
		<div className="button-container pagination">
			<button disabled={loading || !previous} onClick={()=>getNewPage(previous)}>
				{window.innerWidth < 700 ? '<' : 'Prev'}
			</button>
			<button disabled={loading || !next} onClick={()=>getNewPage(next)}>
				{window.innerWidth < 700 ? '>' : 'Next'}
			</button>
		</div>
	);
}
