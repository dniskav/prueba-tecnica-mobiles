import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Home } from './ui/views/Home/Home'
import { Detail } from './ui/views/Detail/Detail'
import { List } from './ui/views/List/List'
import { Cart } from './ui/views/Cart/Cart'

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<List />} />
        <Route path="detail/:id" element={<Detail />} />
        <Route path="cart" element={<Cart />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
