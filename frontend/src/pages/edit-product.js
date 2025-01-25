import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import http from '../http';

export default function EditProduct() {
   const navigate = useNavigate();
   const [inputs, setInputs] = useState({
       name: '',
       description: '',
       price: '',
       stock: '',
       category_id: '',
       image: '',
       status: 'true'
   });
   const [errors, setErrors] = useState({});
   const [imageUploading, setImageUploading] = useState(false);
   const { id } = useParams();

   useEffect(() => {
       fetchProduct();
   }, []);

   const fetchProduct = () => {
       http.get(`/product/${id}`).then((res) => {
           setInputs({
               name: res.data.name,
               description: res.data.description,
               price: res.data.price,
               stock: res.data.stock,
               category_id: res.data.category_id,
               image: res.data.image,
               status: res.data.status ? 'true' : 'false'
           });
       });
   };

   const handleChange = (event) => {
       const { name, value } = event.target;
       setInputs(prevInputs => ({
           ...prevInputs,
           [name]: value
       }));
   };

   const handleImageChange = (event) => {
       const file = event.target.files[0];
       if (file) {
           setImageUploading(true);
           const formData = new FormData();
           formData.append("image", file);

           http.post("/upload-image", formData)
               .then((res) => {
                   setInputs(prevInputs => ({
                       ...prevInputs,
                       image: res.data.imageUrl
                   }));
                   setImageUploading(false);
               })
               .catch((error) => {
                   console.error("Image upload error:", error.response?.data);
                   alert("Error uploading image.");
                   setImageUploading(false);
               });
       }
   };

   const validateForm = () => {
       const newErrors = {};
       if (!inputs.name) newErrors.name = "Name is required.";
       if (!inputs.description) newErrors.description = "Description is required.";
       if (!inputs.price) newErrors.price = "Price is required.";
       if (!inputs.stock) newErrors.stock = "Stock is required.";
       if (!inputs.category_id) newErrors.category_id = "Category is required.";

       setErrors(newErrors);
       return Object.keys(newErrors).length === 0;
   };

   const submitForm = () => {
       if (!validateForm()) return;

       const formattedInputs = {
           ...inputs,
           price: parseFloat(inputs.price),
           stock: parseInt(inputs.stock, 10),
           category_id: parseInt(inputs.category_id, 10),
           status: inputs.status === 'true'
       };

       http.put(`/product/${id}`, formattedInputs)
           .then((res) => {
               alert("Product updated successfully!");
               navigate('/listing-product');
           })
           .catch((error) => {
               console.error("Error details:", error.response?.data);
               alert(`Error: ${error.response?.data?.message || 'Product update failed.'}`);
           });
   };

   return (
       <div className="container mt-4">
           <h2>Edit Product</h2>
           <div className="row">
               <div className="col-sm-6">
                   <div className="card p-4">
                       <div className="mb-3">
                           <label className="form-label">Name</label>
                           <input
                               type="text"
                               name="name"
                               className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                               value={inputs.name || ''}
                               onChange={handleChange}
                           />
                           {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                       </div>

                       <div className="mb-3">
                           <label className="form-label">Description</label>
                           <textarea
                               name="description"
                               className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                               value={inputs.description || ''}
                               onChange={handleChange}
                           ></textarea>
                           {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                       </div>

                       <div className="mb-3">
                           <label className="form-label">Price</label>
                           <input
                               type="number"
                               step="0.01"
                               name="price"
                               className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                               value={inputs.price || ''}
                               onChange={handleChange}
                           />
                           {errors.price && <div className="invalid-feedback">{errors.price}</div>}
                       </div>

                       <div className="mb-3">
                           <label className="form-label">Stock</label>
                           <input
                               type="number"
                               name="stock"
                               className={`form-control ${errors.stock ? 'is-invalid' : ''}`}
                               value={inputs.stock || ''}
                               onChange={handleChange}
                           />
                           {errors.stock && <div className="invalid-feedback">{errors.stock}</div>}
                       </div>

                       <div className="mb-3">
                           <label className="form-label">Category ID</label>
                           <input
                               type="number"
                               name="category_id"
                               className={`form-control ${errors.category_id ? 'is-invalid' : ''}`}
                               value={inputs.category_id || ''}
                               onChange={handleChange}
                           />
                           {errors.category_id && <div className="invalid-feedback">{errors.category_id}</div>}
                       </div>

                       <div className="mb-3">
                           <label className="form-label">Image</label>
                           <input
                               type="file"
                               className="form-control"
                               onChange={handleImageChange}
                               disabled={imageUploading}
                           />
                           {inputs.image && (
                               <img 
                                   src={`http://localhost:8000${inputs.image}`} 
                                   alt="Product" 
                                   style={{width: 100, marginTop: 10}} 
                               />
                           )}
                           {imageUploading && <div>Uploading image...</div>}
                       </div>

                       <div className="mb-3">
                           <label className="form-label">Status</label>
                           <select
                               name="status"
                               className="form-control"
                               value={inputs.status}
                               onChange={handleChange}
                           >
                               <option value="true">Active</option>
                               <option value="false">Inactive</option>
                           </select>
                       </div>

                       <button
                           type="button"
                           onClick={submitForm}
                           className="btn btn-primary"
                           disabled={imageUploading}
                       >
                           Update Product
                       </button>
                   </div>
               </div>
           </div>
       </div>
   );
}