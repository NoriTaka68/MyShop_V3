import {useState} from 'react'
import {Routes, Route} from "react-router-dom";
import './App.css'
import Home from "./components/Home/Home.jsx";
import Products from "./components/Products/Products.jsx";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/products" element={<Products/>}/>
            </Routes>

        </>
    )
}

export default App
