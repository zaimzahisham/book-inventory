import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Base from './pages/Base';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Base />} > 
                    <Route path='home' element={<Home />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App