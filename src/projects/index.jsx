import React from 'react';
import ReactDOM from 'react-dom';

import '../core/core';
import './index.scss';

export default class App extends React.Component {
    static start() {
        ReactDOM.render(<App/>, document.getElementById('container'));
    }

    render() {
        return (
            <div className="app-text">
                App.tsx works!
            </div>
        );
    }
}

window.addEventListener('load', () => {
    App.start();
});
