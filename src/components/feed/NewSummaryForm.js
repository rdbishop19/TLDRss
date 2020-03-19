import React, { useState, useEffect } from 'react';
import './Form.css'
import ApiManager from '../../modules/ApiManager';
import ArticleData from './ArticleData';

export default function NewSummaryForm({selected}) {

    const [ summaryText, setSummaryText ] = useState("")
    const [ charCount, setCharCount ] = useState(255)

    const [ article, setArticle ] = useState({
        link: '',
        feed: {
            name: ''
        },
        description: '',
        pub_date: '',
        title: ''
    })

    const getArticleInfo = () => {
        ApiManager.get('articles', selected).then(setArticle)
    }
    const handleChange = evt => {
        setSummaryText(evt.target.value)
        setCharCount(255 - evt.target.value.length)
    }
	const handleSubmit = evt => {
        evt.preventDefault()
        console.log('submit', summaryText, selected);

        const new_summary = {
            summary_text: summaryText,
            article_id: selected
        }

        ApiManager.post('summaries', new_summary)
        .then(res => console.log(res))
        
    };
    
    useEffect(getArticleInfo, [selected])
    useEffect(()=>setSummaryText(""), [selected])

	return (
		<React.Fragment>
            <ArticleData article={article} />
			<form onSubmit={handleSubmit}>
                <label className="form-label">
                    Enter 'Too Long; Didn't Read' (<a href="https://www.merriam-webster.com/dictionary/TL%3BDR">TL;DR</a>) here
					<textarea className="text-area" value={summaryText} onChange={handleChange} />
				</label>
                <button>Submit</button>
                <span className="form-label">({charCount} points remaining)</span>
			</form>
		</React.Fragment>
	);
}
