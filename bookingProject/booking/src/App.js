import './App.css';
import Home from './components/Home';
import Owner from './components/Owner';
import Agents from './components/Agents';
import User from './components/User';

import { Route, Routes } from "react-router-dom"


function App() {
  return (
    <div className=''>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/owner" element={<Owner />} />
        <Route path="/agents" element={<Agents />} />
        <Route path="/user" element={<User />} />



      </Routes>
    </div>
  );
}

export default App;
