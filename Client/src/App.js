import Headers from './components/Headers';
import Home from './components/Home';
import CartDetails from './components/CartDetails';
import './App.css';
import {Routes,Route} from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast';
import UserDetailsForm from './components/UserDetailsForm';


function App() {
  return (
    <>
     
     <Routes>
      <Route path="/" element={<UserDetailsForm/>}/>
      <Route  path='/home' element={<Home />}/>
      <Route  path='/cart' element={<CartDetails />}/>

     </Routes>
     <Toaster />
    </>
  );
}

export default App;