import React from 'react'
import ReactDOM from 'react-dom'

import '../core/core.js'
import './index.scss'

export default class App extends React.Component
    render: -> (
        <div>
            <header className="hero is-medium is-primary is-bold">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title">
                            Large title
                        </h1>
                        <h2 className="subtitle">
                            Large subtitle
                        </h2>
                    </div>
                </div>
            </header>
            <main className="section">
                <div className="container">
                    <h1 className="title">
                        Hello World
                    </h1>
                    <p className="subtitle">
                        My first website with <strong>Bulma</strong>!
                    </p>
                    <p className="content">
                        <a className="button is-primary"> Hello World </a>
                    </p>
                </div>
            </main>
        </div>
    )

window.addEventListener 'load', ->
    ReactDOM.render <App/>, document.getElementById 'container'
