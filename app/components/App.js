import React from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import $ from 'jquery';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
        this.state = {data: []}
        // setInterval(() => {
        this.getComments();
        // },5000);
    }

    getComments() {
        $.ajax({
            url: this.props.url,
            dataTYpe: 'json',
            cache: false,
            success: comments => {
                this.setState({data: comments});
            },
            error: () => {

            }
        })
    }

    handleCommentSubmit(comment) {
        console.log(comment);
        let comments = this.state.data,
            newComments = comments.concat(comment);
        this.setState({data:newComments});
    }

    render() {
        return (
            <div className="app" style={{margin: '50px'}}>
                <h3>评论</h3>
                <div className=""></div>
                <CommentList data={this.state.data}/>
                <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
            </div>
        )
    }
}

export default App;