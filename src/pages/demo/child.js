import React from 'react'

export default class Child extends React.component{
  state = {
    childNumber: 'childStateNumber',
    num: 0
  }
  changeChildNumber() {
    let num = this.state.num + 1;
    let childNumber = `${childNumber}${num}`;
    this.setState({
      childNumber
    })
  }
  render() {
     return (
       <div>
         child
       </div>
     )
  }
}