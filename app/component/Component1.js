//Component1.jsx
import React from 'react';
import ajax from 'superagent';
import {Link,NavLink} from 'react-router-dom';

class Component1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 'commits',
            commits: [],
            forks: [],
            pulls: []
        }

    }

    componentWillMount() {

        this.fetchFeed('commits')
        this.fetchFeed('forks')
        this.fetchFeed('pulls')
    }

    fetchFeed(type) {
        const baseURL = 'https://api.github.com/repos/facebook';
        ajax.get(`${baseURL}/${this.props.match.params.repo}/${type}`)
            .end((error, response) => {
                if (!error && response) {
                    this.setState({[type]: response.body});
                } else {
                    console.log(`Error fetching ${type}`, error);
                }
            });
    }
    selectMode(mode){
        this.setState({mode});
    }

    renderCommits() {
        return this.state.commits.map((commit, index) => {
            const author = commit.author ? commit.author.login : "nothing";
            return (
                <p key={index}>
                    <strong>{author}</strong>
                    <a href={commit.html_url}>{commit.commit.message}</a>
                </p>
            );
        });
    }

    renderForks() {
        return this.state.forks.map((fork, index) => {
            const owner = fork.owner ? fork.owner.login : "nothing";
            return (
                <p key={index}>
                    <strong>{owner}</strong>: forked constructor
                    <a href={fork.html_url}>{fork.html_url}</a>at {fork.created_at}.
                </p>
            );
        });
    }

    renderPulls() {
        return this.state.pulls.map((pull, index) => {
            const user = pull.user ? pull.user.login : "nothing";
            return (
                <p key={index}>
                    <strong>{user}</strong>
                    <a href={pull.html_url}>{pull.body}</a>
                </p>
            )

        });
    }

    render() {
        let content;
        if (this.state.mode == 'commits') {
            content = this.renderCommits();
        } else if (this.state.mode == 'forks') {
            content = this.renderForks();
        } else {
            content = this.renderPulls();
        }
        return (
            <div>
                <p>
                    You are here :<NavLink to="/" activeClassName="active">Home</NavLink>
                    {this.props.match.params.repo}
                </p>
                <ul>
                    <li><Link to='/'>list</Link></li>
                </ul>
                <p>恭喜老二跑通react+webpack+babel+webpack-server-dev!!!</p>
                <button onClick={this.selectMode.bind(this, 'commits')}>Show Commits</button>
                <button onClick={this.selectMode.bind(this, 'forks')}>Show Forks</button>
                <button onClick={this.selectMode.bind(this, 'pulls')}>Show Pulls</button>
                {content}
            </div>

        );

    }
}

//导出组件
export default Component1;