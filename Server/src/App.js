import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css';

import Rotas from "./routes"

function App(){

  return(
    <Router>
      <div className='App'>
        <Rotas />
      </div>
    </Router>
  )


}

export default App;
