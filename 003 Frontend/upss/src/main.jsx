import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import routes from './routes/index.jsx'
import { Provider } from 'react-redux'
import store from './redux/store/index.js'
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { AppWrapper } from './components/common/PageMeta.tsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <AppWrapper>
        <Provider store={store}>
          <RouterProvider router={routes} />
        </Provider>
      </AppWrapper>
    </ThemeProvider>
  </StrictMode>,
)
