import {useState} from 'react'
import {Routes, Route} from "react-router-dom";
import './App.css'
import Home from "./components/Home/Home.jsx";
import Products from "./components/Products/Products.jsx";
import ProductDetails from "./components/Products/ProductDetails.jsx";
import Cart from "./components/Cart/Cart.jsx";
import LoginPage from "./components/Login/LoginPage.jsx";
import SignUpPage from "./components/SignUpPage/SignUpPage.jsx";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/products" element={<Products/>}/>
                <Route path="/products/:id" element={<ProductDetails/>}/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/signup" element={<SignUpPage/>}/>

            </Routes>

        </>
    )
}

export default App
