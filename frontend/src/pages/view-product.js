import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from '../http';

export default function View() {
    const [product, setProduct] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = () => {
        http.get(`/product/${id}`).then((res) => {
            setProduct(res.data);
        }).catch((error) => {
            console.error("Error fetching product:", error);
        });
    };

    if (!product) return <div>Loading...</div>;

    return (
        <div>
            <h2>Product Details</h2>
            <div className="row">
                <div className="col-sm-6">
                    <div className="card p-4">
                        <h4>Name</h4>
                        <p>{product.name}</p>
                        
                        <h4>Description</h4>
                        <p>{product.description}</p>
                        
                        <h4>Price</h4>
                        <p>${product.price}</p>
                        
                        <h4>Stock</h4>
                        <p>{product.stock}</p>
                        
                        {product.image && (
                            <div>
                                <h4>Image</h4>
                                <img 
                                    src={`http://localhost:8000${product.image}`} 
                                    alt={product.name} 
                                    style={{maxWidth: '300px', height: 'auto'}}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}