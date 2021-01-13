import React from 'react';

export default class Demo extends React.Component{
  state = {
    items: ['a', 'b', 'c'],
    num: 0
  }
  getDefaultProps() {
    console.log('getDefaultProps')
  }
  getInitalState() {
    console.log('getInitalState')
  }
  componentWillMount() {
    console.log('componentWillMount')
  }
  componentDidMount() {
    console.log('componentDidMount')
  }
  shouldComponentUpdate() {
    console.log('shouldComponentUpdate')
    return true
  }
  componentWillUpdate() {
    console.log('componentWillUpdate')
  }
  componentDidUpdate() {
    console.log('componentDidUpdate')
  }
  componentWillUnmount() {
    console.log('componentWillUnmount')
  }

  handleClick = () => {
    let num = this.state.num + 1;
    this.setState({
      num
    })
  }
  render() {
    console.log('render')
    return (
      <div className="demo">
        <button onClick={this.handleClick}>点击{this.state.num}</button>
        <ul>
          {this.state.items.map((item,key) => {
            return <li key={key}>{item}</li>
          })}
        </ul>
      </div>
    )
  }
}