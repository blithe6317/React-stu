import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ReactDom from 'react-dom';
import App from './pages/App';
// import createBrowserHistory from 'history/createBrowserHistory'

// const history = createBrowserHistory()
// ReactDom.render(<Component1 message="This is coming from props!"/>,document.getElementById('content'));

ReactDom.render(
    <Router  onUpdate={()=>window.scrollTo(0,0)}>
        <div>
            <Route component={App}/>
        </div>
    </Router>,
    document.getElementById('content')
)
