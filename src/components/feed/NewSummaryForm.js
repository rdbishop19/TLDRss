import React, { useState, useEffect } from 'react';
import './Form.css';

export default function NewSummaryForm({ selected, methods: { postNewSummary, patchSummary }, userSummary, status }) {
    const [ summaryText, setSummaryText ] = useState(
        status ? userSummary.summary_text : ''
    );
	const [ charCount, setCharCount ] = useState(255);

	const handleChange = (evt) => {
		setSummaryText(evt.target.value);
		setCharCount(255 - evt.target.value.length);
	};
	const handleSubmit = (evt) => {
		evt.preventDefault();

        // handle EDIT (PATCH) request
        if (status) {
            const edited_summary = {
                summary_text: summaryText
            }
            patchSummary(userSummary.url, edited_summary)

        }
        // handle CREATE (POST) request
        else {
            const new_summary = {
                summary_text: summaryText,
                article_id: selected
            };
    
            postNewSummary(new_summary);
        }
	};

	// useEffect(() => setSummaryText(''), [ selected ]);

	return (
		<React.Fragment>
			<form onSubmit={handleSubmit}>
				<label className="form-label">
					Enter 'Too Long; Didn't Read' (<a href="https://www.merriam-webster.com/dictionary/TL%3BDR">
						TL;DR
					</a>) here
					<textarea className="text-area" value={summaryText} onChange={handleChange} required/>
				</label>
				<div className="button-container">
					<button>Submit</button>
				</div>
				<span className="form-label">({charCount} points remaining)</span>
			</form>
		</React.Fragment>
	);
}
