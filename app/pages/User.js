import React from 'react';
import ajax from 'superagent';
import {Link, NavLink} from 'react-router-dom';

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: []
        };
    }

    componentWillMount() {
        this.showUser();
    }

    showUser() {
        console.log(`${this.props.match.params.repo}` + ' :');
        ajax.get(`https://api.github.com/users/${this.props.match.params.user}/events`)
            .end((error, response) => {
                if (!error && response) {
                    this.setState({events: response.body});
                } else {
                    console.log("Error :", error);
                }
            })
    }

    render() {
        return (
            <div>
                <p>This is the User page.
                    <NavLink to="/" activeClassName="active">Home</NavLink>
                </p>

                <p>{this.props.match.params.user}</p>
            </div>
        )
    }
}

export default User;