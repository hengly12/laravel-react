import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import http from "../http";

export default function Edit() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [inputs, setInputs] = useState({ name: "", email: "" });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = () => {
        http.get(`/users/${id}/edit`).then((res) => {
            setInputs({
                name: res.data.name,
                email: res.data.email,
            });
        });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs((values) => ({ ...values, [name]: value }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!inputs.name) newErrors.name = "Name is required";
        if (!inputs.email) newErrors.email = "Email is required";
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const submitForm = () => {
        if (!validateForm()) return;

        http.put(`/users/${id}`, inputs)
            .then(() => {
                navigate("/user-listing");
            })
            .catch((error) => {
                const serverErrors = error.response?.data?.errors;
                if (serverErrors) {
                    setErrors(serverErrors);
                }
            });
    };

    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="card shadow-sm border-0">
                        <div className="card-header bg-info text-white">
                            <h3 className="mb-0">Edit User</h3>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <label className="form-label">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className={`form-control ${errors.name ? "is-invalid" : ""}`}
                                        value={inputs.name || ""}
                                        onChange={handleChange}
                                        placeholder="Enter full name"
                                    />
                                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                        value={inputs.email || ""}
                                        onChange={handleChange}
                                        placeholder="Enter email address"
                                    />
                                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                </div>

                                <div className="d-grid">
                                    <button
                                        type="button"
                                        onClick={submitForm}
                                        className="btn btn-info btn-lg"
                                    >
                                        Update User
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
