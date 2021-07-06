import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import FourOFourPage from './components/Error/404'
import HomePage from './pages/home'

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={HomePage} />
      <Route path="/home" component={HomePage} />
      <Route component={FourOFourPage} />
    </BrowserRouter>
  )
}

export default App
