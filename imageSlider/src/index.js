import React from 'react'
import { render } from 'react-dom'
import App from './components/App'

import './main.css'

document.addEventListener('DOMContentLoaded', () => {
  render(
    <App />,
    document.getElementById('root')
  )
})
