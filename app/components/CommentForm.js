import React from 'react';

class CommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.handlerSubmit = this.handlerSubmit.bind(this);
    }

    handlerSubmit(event) {
        let author = this.refs.author.value,
            text = this.refs.text.value;
        this.props.onCommentSubmit({author, text,date:"刚刚"});
    }

    render() {
        return (
            <div className="form-group">
                <input className="form-control" placeholder="姓名" ref="author"/>
                <textarea className="form-control" placeholder="姓名" ref="text"/>
                <button className="btn btn-default" onClick={this.handlerSubmit}>提交</button>
            </div>
        )
    }
}

export default CommentForm;