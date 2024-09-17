import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import PgFOF from './components/PgFOF';
import Navbar from './components/Navbar';
import cart from './components/cart';
import profile from './components/profile';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/home" element={<Home />} />
      <Route exact path="/signup" element={<Signup />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/cart" element={<cart />} />
      <Route exact path="/userprofile" element={<profile/>} />
      <Route path="*" element={<PgFOF />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
