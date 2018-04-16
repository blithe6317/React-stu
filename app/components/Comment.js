import React from 'react';

class Comment extends React.Component{
    render(){
        return (
            <div>
                <div>
                    <span className="">{this.props.author}</span>
                    <div className="metadata">
                        <span className="data">{this.props.date}</span>
                    </div>
                    <div className="text">{this.props.children}</div>
                </div>
            </div>
        );
    }
}
export default Comment;