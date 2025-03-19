import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import http from '../http';

export default function CreateSlide() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        title: '',
        description: '',
        link: '',
        order: '0',
        image: '',
        status: 'true',
    });
    const [errors, setErrors] = useState({});
    const [imagePreview, setImagePreview] = useState(null);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);

            const formData = new FormData();
            formData.append("image", file);

            http.post("/upload-image", formData)
                .then((res) => {
                    setInputs(prev => ({ ...prev, image: res.data.imageUrl }));
                })
                .catch((error) => {
                    console.error("Image upload error:", error);
                    alert("Error uploading image.");
                });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        // Required fields for slides
        ['title', 'image'].forEach(field => {
            if (!inputs[field]) newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`;
        });
        
        // URL validation for link field
        if (inputs.link && !isValidUrl(inputs.link)) {
            newErrors.link = "Please enter a valid URL";
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    
    const isValidUrl = (url) => {
        try {
            new URL(url);
            return true;
        } catch (e) {
            return false;
        }
    };
    
    const resetForm = () => {  
        setInputs({  
            title: '',  
            description: '',  
            link: '',  
            order: '0',  
            image: '',  
            status: 'true',  
        });  
        setImagePreview(null);
    }

    const submitForm = () => {
        if (!validateForm()) return;

        const formattedInputs = {
            ...inputs,
            order: parseInt(inputs.order, 10),
            status: inputs.status === 'true'
        };

        http.post('/slides', formattedInputs)
            .then(() => {
                alert('Slide created successfully.');
                resetForm();
                // Optionally navigate to slides list
                // navigate('/slides');
            })
            .catch((error) => {
                alert(`Error: ${error.response?.data?.message || 'Slide creation failed.'}`);
            });
    };

    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8">
                    <div className="card shadow-sm border-0">
                        <div className="card-header bg-primary text-white">
                            <h3 className="mb-0">Create New Slide</h3>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <label className="form-label">Slide Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                                        value={inputs.title}
                                        onChange={handleChange}
                                        placeholder="Enter slide title"
                                    />
                                    {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <textarea
                                        name="description"
                                        className="form-control"
                                        value={inputs.description}
                                        onChange={handleChange}
                                        placeholder="Slide description (optional)"
                                        rows="3"
                                    ></textarea>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Link URL</label>
                                    <input
                                        type="url"
                                        name="link"
                                        className={`form-control ${errors.link ? 'is-invalid' : ''}`}
                                        value={inputs.link}
                                        onChange={handleChange}
                                        placeholder="https://example.com (optional)"
                                    />
                                    {errors.link && <div className="invalid-feedback">{errors.link}</div>}
                                </div>

                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Display Order</label>
                                        <input
                                            type="number"
                                            name="order"
                                            className="form-control"
                                            value={inputs.order}
                                            onChange={handleChange}
                                            placeholder="0"
                                            min="0"
                                        />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Status</label>
                                        <select
                                            name="status"
                                            className="form-select"
                                            value={inputs.status}
                                            onChange={handleChange}
                                        >
                                            <option value="true">Active</option>
                                            <option value="false">Inactive</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Slide Image</label>
                                    <input
                                        type="file"
                                        className={`form-control ${errors.image ? 'is-invalid' : ''}`}
                                        onChange={handleImageChange}
                                        accept="image/*"
                                    />
                                    {errors.image && <div className="invalid-feedback">{errors.image}</div>}
                                    {imagePreview && (
                                        <div className="mt-2 text-center">
                                            <img 
                                                src={imagePreview} 
                                                alt="Slide Preview" 
                                                style={{maxWidth: '100%', maxHeight: '300px', objectFit: 'contain'}} 
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className="d-grid">
                                    <button
                                        type="button"
                                        onClick={submitForm}
                                        className="btn btn-primary btn-lg"
                                    >
                                        Create Slide
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}