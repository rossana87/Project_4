import React from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css' // Import all bootstrap classes/styles
import './styles/main.scss' // Custom CSS
import App from './App'

createRoot(document.getElementById('root')).render(<App />)