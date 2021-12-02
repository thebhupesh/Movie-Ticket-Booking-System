import React from 'react'

const PageNotFound = () => {
    return (
        <div>
            <div style={{margin: "auto", textAlign: "center"}}>
                <img src="https://i.imgur.com/qIufhof.png" alt="not-found" style={{width: "500px"}}/>
                <div id="info">
                    <h3>This page could not be found</h3>
                </div>
                <a className="nav-link active" href="/home"><h4>Go to Home</h4></a>
            </div>
        </div>
    )
}

export default PageNotFound