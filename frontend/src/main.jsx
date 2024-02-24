import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from "react-router-dom";
import App from './App.jsx'

//JS
import 'bootstrap/dist/js/bootstrap'
// CSS
import 'bootstrap/dist/css/bootstrap.css'
import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <React.StrictMode>
            <App/>
        </React.StrictMode>,
    </BrowserRouter>
)
