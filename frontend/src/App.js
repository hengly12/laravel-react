import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "./style/admin.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

// Import necessary components
import HomePage from './components/home-page';
import AdminLayout from './layout/layout'; // Create this layout component
import Home from './pages/home';
import Create from './pages/create';
import Edit from './pages/edit';
import View from './pages/view';
import Product from './pages/create-product';
import ListingProduct from './pages/listing-product';
import EditProduct from './pages/edit-product';
import ViewProduct from './pages/view-product';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="user-listing" element={<Home />} />
          <Route path="create-user" element={<Create />} />
          <Route path="product" element={<Product />} />
          <Route path="listing-product" element={<ListingProduct />} />
          <Route path="edit-product/:id" element={<EditProduct />} />
          <Route path="view-product/:id" element={<ViewProduct />} />
          <Route path="edit/:id" element={<Edit />} />
          <Route path="view/:id" element={<View />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;



// import React from 'react';
// import { Routes, Route, Link, Navigate } from "react-router-dom";
// import Home from './pages/home';
// import Create from './pages/create';
// import Edit from './pages/edit';
// import View from './pages/view';
// import Product from './pages/create-product';
// import ListingProduct from './pages/listing-product';
// import Login from './auth/login';
// import PrivateRoute from './auth/private-route';

// function App() {
//   return (
//     <div>
//       <nav className='navbar navbar-expand navbar-dark bg-dark'>
//         <div className='navbar-nav mr-auto'>
//           <li className='nav-item'>
//             <Link to={"/"} className="nav-link">Home</Link>
//           </li>
//           <li className='nav-item'>
//             <Link to={"/login"} className="nav-link">Login</Link>
//           </li>
//           <li className='nav-item'>
//             <Link to={"/create"} className="nav-link">Create</Link>
//           </li>
//           <li className='nav-item'>
//             <Link to={"/listing-product"} className="nav-link">Listing Product</Link>
//           </li>
//           <li className='nav-item'>
//             <Link to={"/product"} className="nav-link">Create Product</Link>
//           </li>
//         </div>
//       </nav>
//       <div className='container'>
//         <Routes>
//           <Route path='/login' element={<Login />} />
//           <Route path='/' element={<Home />} />
//           <Route 
//             path='/create' 
//             element={<PrivateRoute><Create /></PrivateRoute>} 
//           />
//           <Route 
//             path='/product' 
//             element={<PrivateRoute><Product /></PrivateRoute>} 
//           />
//           <Route 
//             path='/listing-product' 
//             element={<PrivateRoute><ListingProduct /></PrivateRoute>} 
//           />
//           <Route 
//             path='/edit/:id' 
//             element={<PrivateRoute><Edit /></PrivateRoute>} 
//           />
//           <Route 
//             path='/view/:id' 
//             element={<PrivateRoute><View /></PrivateRoute>} 
//           />
//         </Routes>
//       </div>
//     </div>
//   );
// }

// export default App;
