import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Profile from '../pages/Profile'

export const Router = () => {

  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/profile/:id?' element={<Profile />}/>
    </Routes>    
    </BrowserRouter>

  )
}
