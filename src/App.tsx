import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Cart, Detail, Home, List } from './ui/views'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<List />} />
        <Route path="detail/:id" element={<Detail />} />
        <Route path="cart" element={<Cart />} />
      </Route>
    </Routes>
  )
}

export default App
