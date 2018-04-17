import React from 'react';

import Login from 'login/index';

class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Login/>
            </div>
        );
    }
}

export default Main;