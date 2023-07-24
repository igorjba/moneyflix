import React from 'react'
import ReactDOM from 'react-dom/client'
import Main from '../src/pages/main'
import './index.css'
import SignUp from '../src/pages/SignUp'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <Main /> */}
    <SignUp />
  </React.StrictMode>,
)
