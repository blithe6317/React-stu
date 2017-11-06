//Component1.jsx
import React from 'react';
import ajax from 'superagent';

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
        ajax.get("https://api.github.com/repos/facebook/react/commits").end((error, response) => {
            if (!error && response) {
                this.setState({commits: response.body});
            } else {
                console.log("error :", error)
            }
        });
        ajax.get('https://api.github.com/repos/facebook/react/forks')
            .end((error, response) => {
                if (!error && response) {
                    this.setState({forks: response.body});
                } else {
                    console.log("error :", error);
                }
            });
        ajax.get('https://api.github.com/repos/facebook/react/pulls')
            .end((error, response) => {
                if (!error && response) {
                    this.setState({pulls: response.body});
                } else {
                    console.log("error :", error);
                }
            });
    }

    renderCommits() {
        return this.state.commits.map((commit,index)=>{
            const author = commit.author?commit.author.login:"nothing";
            return(
                <p key={index}>
                    <strong>{author}</strong>
                    <a href={commit.html_url}>{commit.commit.message}</a>
                </p>
            );
        });
    }

    renderForks() {
        return this.state.forks.map((fork,index)=>{
            const owner = fork.owner?fork.owner.login:"nothing";
            return(
                <p key={index}>
                    <strong>{owner}</strong>: forked constructor
                    <a href={fork.html_url}>{fork.html_url}</a>at {fork.created_at}.
                </p>
            );
        });
    }

    renderPulls() {
        return this.state.pulls.map((pull,index)=>{
            const user = pull.user?pull.user.login:"nothing"
        });
    }

    render() {
        return (
            <div>
                <p>恭喜老二跑通react+webpack+babel+webpack-server-dev!!!</p>
                {/*<p>{this.props.message}</p>*/}
                {/*<p>{this.state.name}</p>*/}
                {/*<p><span>国家：</span><span>{this.state.country}</span></p>*/}
                {/*<botton onClick={this.bottonClicked.bind(this)}>点击</botton>*/}
                {/*{this.state.commits}*/}
                {this.state.commits.map((commit, index) => {

                        const author = commit.author ? commit.author.login : "无名";
                        return ( <p key={index}>
                            <strong>{author}</strong>:
                            <a href={commit.html_url}>{commit.commit.message}</a>
                        </p>)
                    }
                )}
            </div>

        )
    }
}

//导出组件
export default Component1;