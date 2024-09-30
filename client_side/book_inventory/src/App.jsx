import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Home from './pages/Home';
import Base from './pages/Base';
import Books from './pages/book/Books';
import Login from './pages/authentication/login';
import Register from './pages/authentication/register';

const App = () => {
    return (
        <>
        <CssBaseline />
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Base />} > 
                    <Route path='home' element={<Home />} />
                    <Route path='books' element={<Books />} />
                </Route>
                <Route path='/login/' element={<Login />} />
                <Route path='/register/' element={<Register />} />
            </Routes>
        </BrowserRouter>
        </>
        
    )
}

export default App