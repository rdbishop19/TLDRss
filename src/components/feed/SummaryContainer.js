import React from 'react'

export default function SummaryContainer({ summaries }) {
    return (
        <React.Fragment>
            {summaries.results.map(summary => summary.summary_text)}
        </React.Fragment>
    )
}
