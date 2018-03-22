import React from 'react';
import Component1 from '../component/Component1'
import List from './List';
import User from './User';
import {Router,Route,IndexRoute} from 'react-router-dom'
class App extends React.Component{
    componentDidMount(){

    }
    render(){
        return(
            <div>
                <h1>Unofficial GitHub Browser V0.1</h1>
                <Route exact path="/" component={List}/>
                <Route path="/list/:repo" component={Component1} />
                <Route path="/user/:user" component={User} />
            </div>
        )
    }
}
export default App;