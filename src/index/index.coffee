import React from 'react'
import ReactDOM from 'react-dom'

import '../core/core.js'
import './index.scss'

Header = (props) -> (
    <header className="hero is-medium is-primary is-bold">
        <div className="hero-head">
            <nav className="navbar">
                <div className="container">
                    <div className="navbar-brand">
                        <a className="navbar-item is-size-4" href="/">
                            Oakware
                        </a>
                    </div>
                    <div className="navbar-menu">
                        <div className="navbar-end">
                            <a className="navbar-item" href="/projects">
                                Projects
                            </a>
                            <a className="navbar-item" href="/about">
                                About
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
        </div>

        <div className="hero-body">
            <div className="container has-text-centered">
                <h1 className="title">
                    kondratuk.io
                </h1>
                <h2 className="subtitle">
                    Large subtitle
                </h2>
            </div>
        </div>

        <div className="hero-foot">
        </div>
    </header>
)

export default class App extends React.Component
    render: -> (
        <div>
            <Header/>
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
