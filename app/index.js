'use strict';

import React from 'react';
import ReactDom from 'react-dom';

import App from './components/App';

var comments = [{
    "author": "宋玉清", "date": "5分钟前", "text": "今个天气很好啊！一起出去浪啊！"
}, {
    "author": "何小三", "date": "3分钟前", "text": "对对对，适合出去打一炮！"
}]
ReactDom.render(
    <App url="comments.json"/>,
    document.getElementById('app')
)
