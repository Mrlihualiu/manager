import React from  'react';

export default class Life extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            count: 0
        }
    }
    handleAdd = ()=>{
        this.setState({
            count: this.state.count+1 
        })
    }
    render(){
        return <div>
            <p>React生命周期介绍</p>
            <button onClick={this.handleAdd}>点击一下</button>
            <p>{this.state.count}</p>
        </div>
    }
}