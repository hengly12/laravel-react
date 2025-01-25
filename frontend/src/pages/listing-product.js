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
                        <th>no.</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product,index)=>(
                        <tr key={product.id}>
                            <td>{++index}</td>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.price}</td>
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