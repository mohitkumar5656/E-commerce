
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormValidator from "../../validator/FormValidator";

const SignupPage = () => {
    const [data, setData] = useState({
        name: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        cpassword: ""
    });

    const [errorMassage, setErrorMassage] = useState({
        name: "Name Field is Mandatory",
        username: "Username Field is Mandatory",
        email: "Email Field is Mandatory",
        phone: "Phone Field is Mandatory",
        password: "Password Field is Mandatory",
        cpassword: "Confirm Password is Mandatory"
    });

    const [show, setShow] = useState(false);
    const [apiError, setApiError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const getInputData = (e) => {
        const { name, value } = e.target;

        setData(prev => ({ ...prev, [name]: value }));

        const validation = FormValidator(e);

        setErrorMassage(prev => ({
            ...prev,
            [name]: validation
        }));

        setApiError("");
    };

    const postData = async (e) => {
        e.preventDefault();
        setShow(true);
        setApiError("");

        const validationErrors = {};

        Object.keys(data).forEach(key => {
            if (key === "cpassword") {
                validationErrors[key] = data.cpassword.trim()
                    ? ""
                    : "Confirm Password is Mandatory";
            } else {
                validationErrors[key] = FormValidator({
                    target: {
                        name: key,
                        value: data[key],
                        type: key === "email" ? "email" : "text"
                    }
                });
            }
        });

        if (data.password !== data.cpassword) {
            validationErrors.cpassword =
                "Password and Confirm Password do not match";
        }

        setErrorMassage(prev => ({
            ...prev,
            ...validationErrors
        }));

        if (Object.values(validationErrors).some(error => error)) {
            return;
        }

        setLoading(true);

        try {
            const baseUrl =
                import.meta.env.VITE_APP_BACKEND_SERVER;

            if (!baseUrl) {
                throw new Error("Backend URL is not configured.");
            }

            // Get existing users
            const getResponse = await fetch(`${baseUrl}/user`);

            if (!getResponse.ok) {
                throw new Error(
                    `Unable to check users. HTTP ${getResponse.status}`
                );
            }

            const result = await getResponse.json();

            // Support common API response formats
            const users = Array.isArray(result)
                ? result
                : Array.isArray(result.data)
                    ? result.data
                    : Array.isArray(result.records)
                        ? result.records
                        : null;

            if (!users) {
                console.error("Unexpected users API response:", result);
                throw new Error(
                    "Users API did not return a list. Check the backend response."
                );
            }

            const username = data.username.trim().toLowerCase();
            const email = data.email.trim().toLowerCase();

            const existingUser = users.find(user =>
                user.username?.toLowerCase() === username ||
                user.email?.toLowerCase() === email
            );

            if (existingUser) {
                const errors = {
                    name: "",
                    username: existingUser.username?.toLowerCase() === username
                        ? "Username Already Taken"
                        : "",
                    email: existingUser.email?.toLowerCase() === email
                        ? "Email Already Taken"
                        : "",
                    phone: "",
                    password: "",
                    cpassword: ""
                };

                setErrorMassage(errors);
                setShow(true);
                return;
            }

            // Create user
            const createResponse = await fetch(`${baseUrl}/user`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: data.name.trim(),
                    username: data.username.trim(),
                    email: data.email.trim(),
                    phone: data.phone.trim(),
                    password: data.password,
                    role: "Buyer",
                    status: true
                })
            });

            const createdUser = await createResponse.json();

            if (!createResponse.ok) {
                throw new Error(
                    createdUser.message || "Unable to create account."
                );
            }

            navigate("/login");
        } catch (error) {
            console.error("Signup error:", error);
            setApiError(error.message || "Signup failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container my-3">
            <div className="row">
                <div className="col-lg-8 col-md-10 col-sm-11 m-auto">
                    <h5 className="bg-primary text-center text-light p-2">
                        Create Your Free Account
                    </h5>

                    <form onSubmit={postData} noValidate>
                        <div className="row">
                            {[
                                { name: "name", label: "Name", type: "text", placeholder: "Full Name" },
                                { name: "username", label: "User Name", type: "text", placeholder: "Username" },
                                { name: "phone", label: "Phone", type: "tel", placeholder: "Phone Number" },
                                { name: "email", label: "Email", type: "email", placeholder: "Email Address" },
                                { name: "password", label: "Password", type: "password", placeholder: "Enter the Password" },
                                { name: "cpassword", label: "Confirm Password", type: "password", placeholder: "Confirm Password" }
                            ].map(field => (
                                <div className="col-lg-6 mb-3" key={field.name}>
                                    <label>{field.label}</label>
                                    <input
                                        type={field.type}
                                        name={field.name}
                                        value={data[field.name]}
                                        onChange={getInputData}
                                        placeholder={field.placeholder}
                                        className={`form-control ${
                                            show && errorMassage[field.name]
                                                ? "border-danger"
                                                : "border-primary"
                                        }`}
                                    />
                                    {show && errorMassage[field.name] && (
                                        <p className="text-danger">
                                            {errorMassage[field.name]}
                                        </p>
                                    )}
                                </div>
                            ))}

                            {apiError && (
                                <div className="col-12 mb-3">
                                    <p className="text-danger">{apiError}</p>
                                </div>
                            )}

                            <div className="col-12 mb-3">
                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                    disabled={loading}
                                >
                                    {loading ? "Creating Account..." : "Signup"}
                                </button>
                            </div>
                        </div>
                    </form>

                    <Link to="/login">
                        Already Have An Account? Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
