
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [data, setData] = useState({
        username: "",
        password: ""
    });

    const [errorMassage, setErrorMassage] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const getInputData = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
        setErrorMassage("");
    };

    const postData = async (e) => {
        e.preventDefault();
        setErrorMassage("");

        if (!data.username.trim() || !data.password) {
            setErrorMassage("Username and password are required");
            return;
        }

        setLoading(true);

        try {
            const baseUrl = import.meta.env.VITE_APP_BACKEND_SERVER;

            if (!baseUrl) {
                throw new Error("Backend URL is not configured");
            }

            const apiResponse = await fetch(`${baseUrl}/user`);

            if (!apiResponse.ok) {
                throw new Error(`API error: ${apiResponse.status}`);
            }

            const result = await apiResponse.json();

            console.log("Users API response:", result);

            const users = Array.isArray(result)
                ? result
                : Array.isArray(result.data)
                    ? result.data
                    : Array.isArray(result.records)
                        ? result.records
                        : null;

            if (!users) {
                throw new Error(
                    "Users API is not returning a list. Check the backend response."
                );
            }

            const loginValue = data.username.trim().toLowerCase();

            const item = users.find(user =>
                user.username?.toLowerCase() === loginValue ||
                user.email?.toLowerCase() === loginValue
            );

            if (!item || item.password !== data.password) {
                setErrorMassage("Invalid Username or Password");
                return;
            }

            if (item.status === false) {
                setErrorMassage("Your Account Has Been Blocked");
                return;
            }

            const userId = item._id || item.id;

            if (!userId) {
                throw new Error("User ID is missing from the API response");
            }

            localStorage.setItem("login", "true");
            localStorage.setItem("userid", String(userId));
            localStorage.setItem("name", item.name || "");
            localStorage.setItem("role", item.role || "");

            if (item.role === "Buyer") {
                navigate("/profile");
            } else {
                navigate("/admin");
            }
        } catch (error) {
            console.error("Login error:", error);
            setErrorMassage(error.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container my-3">
            <div className="row">
                <div className="col-lg-8 col-md-10 col-sm-11 m-auto">
                    <h5 className="bg-primary text-center text-light p-2">
                        Login To Your Account
                    </h5>

                    <form onSubmit={postData}>
                        <div className="row">
                            <div className="col-12 mb-3">
                                <label>User Name</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={data.username}
                                    onChange={getInputData}
                                    placeholder="Username or Email"
                                    className={`form-control ${
                                        errorMassage
                                            ? "border-danger"
                                            : "border-primary"
                                    }`}
                                />
                            </div>

                            <div className="col-12 mb-3">
                                <label>Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    onChange={getInputData}
                                    placeholder="Enter the Password"
                                    className={`form-control ${
                                        errorMassage
                                            ? "border-danger"
                                            : "border-primary"
                                    }`}
                                />
                            </div>

                            {errorMassage && (
                                <div className="col-12 mb-3">
                                    <p className="text-danger">{errorMassage}</p>
                                </div>
                            )}

                            <div className="col-12 mb-3">
                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                    disabled={loading}
                                >
                                    {loading ? "Logging in..." : "Login"}
                                </button>
                            </div>
                        </div>
                    </form>

                    <div className="d-flex justify-content-between">
                        <Link to="/login">Forget Password</Link>
                        <Link to="/signup">
                            Doesn't Have An Account? Create
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
