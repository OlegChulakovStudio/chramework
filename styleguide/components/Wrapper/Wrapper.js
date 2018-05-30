// lib/styleguide/Wrapper.js
import React, { Component } from 'react'
const { Provider } = require('react-redux')
const configureStore = require('../../../src/utils/configureStore').default
const initialState = {
  app: {
    name: 'Pizza Delivery'
  }
}
const store = configureStore({ initialState })
export default class Wrapper extends Component {
  render() {
    return <Provider store={store}>{this.props.children}</Provider>
  }
}