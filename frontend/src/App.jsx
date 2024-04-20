import { BrowserRouter, Routes, Route} from 'react-router-dom';
// import {  Routes, Route} from 'react-router-dom';
import Navbar from '../components/navbar'
import Home from '../components/Home';
import FetchData from '../fetchdata';
import Contact from '../components/contact';
import Blog from '../components/blog';

function App() {
 

  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
    {/* <Route path="/" element={<Home />}/> */}
    <Route path="home" element={<Home/>}/>
    <Route path="blog" element={<Blog/>}/>
    <Route path="FetchData" element={<FetchData/>}/>
    <Route path="contact" element={<Contact />} />
      </Routes>   
    </BrowserRouter>
      {/* <Navbar/>
        <Home/>
    <Fetchdata/> */}


    </>
  )
}

export default App
