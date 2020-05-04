import React from 'react'
import PageButtons from './PageButtons'
import EllipsisLoader from '../loaders/EllipsisLoader'
import SubscribeToFeedButton from './SubscribeToFeedButton'

export default function FeedActions(props) {
    const { loading, feed, actions, params, sort } = props
    const { getNewPage, setSort, updateFeedSubscription } = actions
    return (
        <div className="feed-nav">
            {params.feedId &&
            feed.results.length > 0 && 
                <SubscribeToFeedButton 
                    params={params} 
                    source={feed.results[0].feed} 
                    updateFeedSubscription={updateFeedSubscription} 
                />
            }
            <PageButtons loading={loading} previous={feed.previous} next={feed.next} getNewPage={getNewPage} />
            {feed.results.length && loading ? <EllipsisLoader /> : undefined}
            {/* <br /> */}
            <div className="button-container sort">
                <button className={sort ? "sort-selected" : "sort-unselected"} onClick={() => setSort(true)}>Top</button>
                <button className={sort ? "sort-unselected" : "sort-selected"} onClick={() => setSort(false)}>Newest</button>
            </div>
            <br />
        </div>
    )
}
