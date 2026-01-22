import { createRoot } from 'react-dom/client'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import { StrictMode } from 'react'
import {Toaster} from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
      <Toaster />
    </StrictMode>

)
