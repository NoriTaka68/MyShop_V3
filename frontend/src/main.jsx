import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from './Context/AuthContext';
import {CartProvider} from './Context/CartContext';
import {SearchProvider} from "./Context/SearchContext.jsx";
import App from './App.jsx'

//JS
import 'bootstrap/dist/js/bootstrap'
// CSS
import 'bootstrap/dist/css/bootstrap.css'
import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <React.StrictMode>
            <AuthProvider>
                <CartProvider>
                    <SearchProvider>
                        <App/>
                    </SearchProvider>
                </CartProvider>
            </AuthProvider>
        </React.StrictMode>,
    </BrowserRouter>
)
