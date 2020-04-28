import React from 'react'
import './EllipsisLoader.css'

export default function EllipsisLoader() {
    return (
        <span
            className="lds-ellipsis"
        >
            <span />
            <span />
            <span />
            <span />
        </span>
    )
}
