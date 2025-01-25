import { useState, useEffect } from "react";
import http from "../http"
import { Link } from "react-router-dom";

export default function Home() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchAllProduct();
    }, []);

    const fetchAllProduct = () => {
        setIsLoading(true);
        http.get('/product')
            .then(res => {
                setProducts(res.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching products:", error);
                setIsLoading(false);
            });
    }

    const deleteProduct = (id) => {
        http.delete('/product/' + id).then(res => {
            fetchAllProduct();
        })
    }

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
                <div className="spinner-border text-primary" role="status">
                </div>
            </div>
        );
    }

    return (
        <div>
            <h2>Listing Products</h2>
            {products.length === 0 ? (
                <p>No products found.</p>
            ) : (
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
                        {products.map((product, index) => (
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
                                    <Link className="btn btn-info" to={{ pathname: "/admin/edit-product/" + product.id }}>Edit</Link>&nbsp;
                                    <Link className="btn btn-primary" to={{ pathname: "/admin/view-product/" + product.id }}>View</Link>&nbsp;
                                    <button type="button" className="btn btn-danger"
                                        onClick={() => { deleteProduct(product.id) }}
                                    >Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}