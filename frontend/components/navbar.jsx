import React from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'
const Navbar = () => {
  return (
   

<header className="header">
    <nav>
      <div className="left"> <img className='logo' width={'140px'} src="https://storage.googleapis.com/ambak/logo/ambak_logo.svg"  alt="" /></div>
     
      <div className="right">
        <ul>
          <li><Link className='active' to="home">Home</Link></li>
          <li><Link className='active'to="fetchdata">API Data</Link></li>
          <li><Link className='active'to="blog">Blog</Link></li>
          {/* <li><Link className='active'to="services">Services</Link></li> */}
          <li><Link className='active' id='becomppartner' to="becomepartner">Become a Partner</Link></li>
        </ul>
      </div>
    </nav>
  </header>





































//       <nav className="navbar navbar-expand-lg bg-body-tertiary ">
//   <div className="container-fluid">
//     <a className="navbar-brand" href="/">Aambak</a>
//     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//       <span className="navbar-toggler-icon"></span>
//     </button>
//     <div className="collapse navbar-collapse" id="navbarSupportedContent">
//       <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//         <li className="nav-item">
//           <Link className="nav-link active" aria-current="page" to="/Home">Home</Link>
//         </li>
//         <li className="nav-item">
//           <Link className="nav-link" to="FetchData">Data</Link>
//         </li>
//         <li className="nav-item dropdown">
//           <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
//             Dropdown
//           </a>
//           <ul className="dropdown-menu">
//             <li><a className="dropdown-item" href="#">Action</a></li>
//             <li><a className="dropdown-item" href="#">Another action</a></li>
//             <li><hr className="dropdown-divider" /> </li>
//             <li><a className="dropdown-item" href="#">Something else here</a></li>
//           </ul>
//         </li>
        
//       </ul>
//       <form className="d-flex" role="search">
//         <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
//         <button className="btn btn-outline-success" type="submit">Search</button>
//       </form>
//     </div>
//   </div>
// </nav>

  )
}

export default Navbar
