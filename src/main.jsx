import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import Ui from './Ui.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Ui />
  </StrictMode>,
)
