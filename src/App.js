import React, { Component } from 'react'
import './App.scss'
import TabbedView from './components/layouts/TabbedView'

class App extends Component {
  render() {
    return (
      <div className="app">
        <TabbedView />
      </div>
    )
  }
}

export default App
