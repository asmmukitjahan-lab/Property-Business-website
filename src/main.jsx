import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { WishlistProvider } from './components/context/WishlistContext.jsx'
import { PropertyProvider } from './components/context/PropertyContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <PropertyProvider>
        <WishlistProvider>
          <App />
        </WishlistProvider>
      </PropertyProvider>
    </BrowserRouter>
  </StrictMode>,
)
