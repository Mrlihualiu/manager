//引入createStore

import { createStore } from 'redux'
import reducer from '../reducer'
// import { componseWithDevTools } from 'redux-devtools-extension'

export default (prevState) => createStore(reducer,prevState)