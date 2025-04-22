
import HeaderNavbar from './Components/Navbar';
import Navbar from './Components/Navbar';
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Countries from './Pages/Countries';
import Dashboard from './Pages/Dashboard';
import { CountryProvider } from './Context/countryContext.jsx';
import CountryDetails from './Pages/CountryDetails.jsx';
import SignIn from './Pages/SignIn.jsx';
import SignUp from './Pages/SignUp.jsx';
import { UserProvider } from './Context/userContext.jsx';


function App() {
  

  return (
    <>
     {/* <div>
      <span className='items-center justify-center text-4xl'>
        Application Framework
      </span>
     </div> */}
     <UserProvider>
 <CountryProvider>
     <BrowserRouter>
  
     <HeaderNavbar /> {/* ✅ Display it here */}
     <Routes>
      <Route path='/' element={<Dashboard/>}>    </Route>
      <Route path='/countries' element={<Countries/>}>    </Route>
      <Route path="/country/:code" element={<CountryDetails />} /> {/* ⬅️ Add this */}
      <Route path="/signIn" element={<SignIn />} /> {/* ⬅️ Add this */}
      <Route path="/signup" element={<SignUp />} /> {/* ⬅️ Add this */}

     </Routes>
     </BrowserRouter>
     </CountryProvider>

     </UserProvider>
    </>
  )
}

export default App
