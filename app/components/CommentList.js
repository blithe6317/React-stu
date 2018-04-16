import React from 'react';
import Comment from './Comment';

class CommentList extends React.Component{
    render(){
        let commentNode = this.props.data.map((comment,i)=>{
            return(
                <Comment author={comment.author} date={comment.date} key={i}>{comment.text}</Comment>
            )
        });
        return(
            <div>
                {commentNode}
            </div>
        )
    }
}
export default CommentList;