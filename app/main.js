import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ReactDom from 'react-dom';
import Component1 from './component/Component1.js';
import List from './pages/List';
// import createBrowserHistory from 'history/createBrowserHistory'

// const history = createBrowserHistory()
// ReactDom.render(<Component1 message="This is coming from props!"/>,document.getElementById('content'));

ReactDom.render(
    <Router  onUpdate={()=>window.scrollTo(0,0)}>
        <div>
            <Route exact path="/" component={Component1} />
            <Route path="/list" component={List}/>
        </div>
    </Router>,
    document.getElementById('content')
)
