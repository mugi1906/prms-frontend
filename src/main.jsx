import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from "react-redux"
import { store } from './store/store.js'
import { BrowserRouter } from "react-router-dom"
import {AuthProvider} from './context/AuthContext.jsx'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";


window.addEventListener("pageshow",(event)=>{

  if(event.persisted){

    window.location.reload();

  }

});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AuthProvider>
          <App />
          <ToastContainer />
        </AuthProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
