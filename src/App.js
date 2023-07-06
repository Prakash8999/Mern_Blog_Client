import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Main from './pages/Main';
import {Dataprovider} from './context/Dataprovider';
import { useState } from 'react';
import CreatePost from './pages/CreatePost';
import ViewFull from './pages/ViewFull';
import MyPost from './pages/MyPost';


// const PrivateRoute = ({isUserAuthenticated}) =>{
// return isUserAuthenticated ? (
//   <Outlet/>
// ):
// (
// <Navigate replace to={'/login'}/>  
// )

// }

function App() {
const [isUserAuthenticated,setIsUserAuthenticated] = useState(false)


  return (
    <>
      <Router>
        <Dataprovider>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/login' element={<Login setIsUserAuthenticated={setIsUserAuthenticated}/>}/>
          <Route path='/signup' element={<Signup/>} />
          {/* <Route path='/' element={<PrivateRoute isUserAuthenticated={isUserAuthenticated}/>}> */}

          <Route path='/home' element={<Main/>}/>
          <Route path='/home/:id' element={<ViewFull/>}/>
          <Route path='/create' element={<CreatePost/>}/>
          <Route path='/post' element={<MyPost/>}/>
          {/* </Route> */}
         </Routes>
        </Dataprovider>
      </Router>
    </>
  );
}

export default App;
