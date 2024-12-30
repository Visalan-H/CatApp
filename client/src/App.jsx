import './App.css'
import { Routes, Route } from 'react-router-dom';
import Create from './pages/Create/Create'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import ProtectedRoute from './ProtectedRoute';
import MyCats from './pages/MyCats/MyCats';
import Message from './pages/Message/Message';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/my' element={<ProtectedRoute><MyCats/></ProtectedRoute>}/>
      <Route path='/cats/create' element={<ProtectedRoute><Create /></ProtectedRoute>} />
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup />} />
      <Route path='/message' element={<Message />}/>
    </Routes>
  )
}

export default App
