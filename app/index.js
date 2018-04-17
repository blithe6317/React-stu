'use strict';

import React from 'react';
import ReactDom from 'react-dom';

import App from './components/App';


ReactDom.render(
    <App url="comments.json"/>,
    document.getElementById('app')
)
