import React, { useEffect } from 'react'
import UserSummary from './UserSummary'

export default function SummaryContainer({ summaries, article }) {

    const getUserSummary = () => {
        console.log('article', article)
    }
    useEffect(getUserSummary, [article])
    return (
        <React.Fragment>
            {article && <UserSummary article={article} />}
            {summaries.results.map(summary => summary.summary_text)}
        </React.Fragment>
    )
}
