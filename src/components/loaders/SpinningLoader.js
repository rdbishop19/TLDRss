import React from 'react'

export default function SpinningLoader() {
    return (
        <React.Fragment>
            <div className="lds-hourglass" />
            <div>fetching articles...</div>
            <br />
        </React.Fragment> 
    )
}
