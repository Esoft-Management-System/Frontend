import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { RTKProvider } from './redux/provider.tsx'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  //   <App />
  // </StrictMode>,
  <BrowserRouter>
    <RTKProvider>
      <App />
    </RTKProvider>
  </BrowserRouter>
)
