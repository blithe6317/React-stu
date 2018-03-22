import React from 'react';
import {Link,NavLink} from 'react-router-dom';

class List extends React.Component {
    render() {
        return (
            <div>
                <p>This is the list page.</p>
                <ul>
                    <li><Link to='/list/react'>React</Link></li>
                    <li><Link to='/list/react-native'>React-Native</Link></li>
                    <li><Link to='/list/jest'>Jest</Link></li>
                    <li><Link to='/user/s'>ABC</Link></li>
                    <li><Link to='/user/jeff'>Jeff</Link></li>
                    <li><Link to='/user/cord'>Cord</Link></li>
                </ul>
            </div>
        )
    }
}

export default List;