import React, { useState } from 'react';
import './Form.css';

export default function NewSummaryForm({ selected, methods: { postNewSummary, patchSummary }, userSummary, isEditing }) {
    const [ summaryText, setSummaryText ] = useState(
        isEditing ? userSummary.summary_text : ''
    );
	const [ charCount, setCharCount ] = useState(255);

	const handleChange = (evt) => {
		setSummaryText(evt.target.value);
		setCharCount(255 - evt.target.value.length);
	};
	const handleSubmit = (evt) => {
		evt.preventDefault();

        // handle EDIT (PATCH) request
        if (isEditing) {
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
					</a>)
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
