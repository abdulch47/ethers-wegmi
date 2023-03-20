import './App.css';
import About from './Components/About';
import Mint from './Components/Mint';
import Browsenfts from './Components/Browsenfts';
import MyNfts from './Components/MyNfts';
import {Route,Routes} from "react-router-dom"
import EditContent from './Components/EditContent';
import Cutsize from './Components/Cutsize';
function App() {
 
  return (
  <> 
 
 
  <Routes>
      <Route path="/" element={<About/>}/> 
      <Route path="/mint" element={<Mint/>}/> 
      <Route path="/browse" element={<Browsenfts/>}/> 
      <Route path="/nfts" element={<MyNfts/>}/> 
      <Route path="/cut" element={<Cutsize/>}/> 
      <Route path="/edit" element={<EditContent/>}/> 


      </Routes>
      </>
  );
}

export default App;
