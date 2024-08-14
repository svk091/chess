import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Landing } from './pages/Landing'
import { Game } from './pages/Game'
export default function App() {
  return (
    <div className='bg-zinc-700 h-screen'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/game' element={<Game />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}