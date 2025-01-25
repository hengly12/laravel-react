import { useState,useEffect } from "react";
import http from "../http"
import { Link } from "react-router-dom";
export default function Home() {
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        fetchAllProduct();
    },[]);

    const fetchAllProduct = () => {
        http.get('/product').then(res=>{
            setProducts(res.data);
        })
    }
    console.log(products, "products");


    const deleteProduct = (id) => {
        http.delete('/product/'+id).then(res=>{
            fetchAllProduct();
        })
    }



    return (
        <div>
            <h2>listing products</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Image</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product,index)=>(
                        <tr key={product.id}>
                            <td>{++index}</td>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.price} $</td>
                            <td>{product.stock}</td>
                            <td>
                                {product.image ? (
                                    <img 
                                        src={`http://localhost:8000${product.image}`} 
                                        alt={product.name} 
                                        style={{width:100, height:100, objectFit: 'cover'}}
                                    />
                                ) : (
                                    <span>No Image</span>
                                )}
                            </td>
                            <td>{product.status ? 'Active' : 'Inactive'}</td>
                            <td>
                                <Link className="btn btn-info" to={{ pathname: "/edit-product/" + product.id }}>Edit</Link>&nbsp;
                                <Link className="btn btn-primary" to={{ pathname: "/view-product/" + product.id }}>View</Link>&nbsp;
                                <button type="button" className="btn btn-danger"
                                    onClick={()=>{deleteProduct(product.id)}}
                                    >Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    )
}

// import React, { useState, useEffect } from "react";
// import http from '../http';
// import { Link } from "react-router-dom";
// import CreateProduct from "./create-product";

// export default function ListingProduct() {
//     const [products, setProducts] = useState([]);
//     const [showCreateModal, setShowCreateModal] = useState(false);


//     useEffect(()=>{
//         fetchAllProduct();
//     },[]);

//     const fetchAllProduct = () => {
//         http.get('/product').then(res=>{
//             setProducts(res.data);
//         })
//     }

//     const deleteProduct = (id) => {
//         if (window.confirm('Are you sure you want to delete this product?')) {
//             http.delete('/product/' + id).then(() => {
//                 fetchAllProduct();
//             });
//         }
//     };

//     return (
//         <div className="container-fluid">
//             <div className="d-flex justify-content-between align-items-center mb-4">
//                 <h2>Product Listing</h2>
//                 <button 
//                     className="btn btn-primary"
//                     onClick={() => setShowCreateModal(true)}
//                 >
//                     Create New Product
//                 </button>
//             </div>

//             <table className="table table-striped">
//                 <thead className="thead-dark">
//                     <tr>
//                         <th>No.</th>
//                         <th>Name</th>
//                         <th>Description</th>
//                         <th>Price</th>
//                         <th>Stock</th>
//                         <th>Image</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {products.map((product, index) => (
//                         <tr key={product.id}>
//                             <td>{++index}</td>
//                             <td>{product.name}</td>
//                             <td>{product.description}</td>
//                             <td>${product.price} $</td>
//                             <td>{product.stock}</td>
//                             <td>
//                                 {product.image ? (
//                                     <img
//                                         src={`http://localhost:8000${product.image}`}
//                                         alt={product.name}
//                                         style={{width:100, height:100, objectFit: 'cover'}}
//                                     />
//                                 ) : (
//                                     <span>No Image</span>
//                                 )}
//                             </td>
//                             <td>
//                                 <div className="btn-group">
//                                     <Link 
//                                         className="btn btn-sm btn-info" 
//                                         to={`/edit-product/${product.id}`}
//                                     >
//                                         Edit
//                                     </Link>
//                                     <Link 
//                                         className="btn btn-sm btn-primary" 
//                                         to={`/view-product/${product.id}`}
//                                     >
//                                         View
//                                     </Link>
//                                     <button 
//                                         className="btn btn-sm btn-danger"
//                                         onClick={() => deleteProduct(product.id)}
//                                     >
//                                         Delete
//                                     </button>
//                                 </div>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             {showCreateModal && (
//                 <div className="modal" style={{display: 'block', backgroundColor: 'rgba(0,0,0,0.5)'}}>
//                     <div className="modal-dialog">
//                         <div className="modal-content">
//                             <div className="modal-header">
//                                 <h5 className="modal-title">Create Product</h5>
//                                 <button 
//                                     type="button" 
//                                     className="close" 
//                                     onClick={() => setShowCreateModal(false)}
//                                 >
//                                     &times;
//                                 </button>
//                             </div>
//                             <div className="modal-body">
//                                 <CreateProduct 
//                                     onClose={() => {
//                                         setShowCreateModal(false);
//                                         fetchAllProduct();
//                                     }} 
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }