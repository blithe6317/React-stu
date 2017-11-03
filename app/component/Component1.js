//Component1.jsx
import React from 'react';
import Chance from 'chance';

class Component1 extends React.Component {
    constructor(props){
        super(props);
        this.state={
            name:chance.first(),
            country:chance.country({full:true})
        }
    }
    bottonClicked(){
        console.log("the botton is clicked!");
        this.forceUpdate();
    }
    render() {
        return (
            <div>
                <p>恭喜老二跑通react+webpack+babel+webpack-server-dev!!!</p>
                <p>{this.props.message}</p>
                <p>{this.state.name}</p>
                <p><span>国家：</span><span>{this.state.country}</span></p>
                <botton onClick={this.bottonClicked.bind(this)}>点击</botton>
            </div>

        )
    }
}

//导出组件
export default Component1;