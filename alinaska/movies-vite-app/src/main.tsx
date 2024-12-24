import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux';
import rootReducer from './store/reducer.ts';

const store = configureStore({
  reducer: rootReducer, 
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <Provider store={store}>
    <App />
  </Provider>
    
  </StrictMode>,
)
