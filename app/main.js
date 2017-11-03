import React from 'react';
import ReactDom from 'react-dom';
import Component1 from './component/Component1.js';

ReactDom.render(<Component1 message="This is coming from props!"/>,document.getElementById('content'));