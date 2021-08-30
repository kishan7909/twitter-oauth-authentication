import React from 'react'
import { Router } from '@reach/router'
import Home from './pages/Home'
import './styles/global.scss'

const App = () => {
  return (
    <div>
      <Router>
        <Home path="/" exact={true} />
      </Router>
    </div>
  )
}

export default App