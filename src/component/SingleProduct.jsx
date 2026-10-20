
import { Link } from "react-router-dom";
import { useState } from "react";

const API = "https://ecommerce-server-oifj.vercel.app/api";

const SingleProduct = ({ item }) => {
    const [loading, setLoading] = useState("");
    const [message, setMessage] = useState("");

  // Logged-in user ki ID lena
const getUserId = () => {
    return localStorage.getItem("userid") || "";
};

    const addItem = async (type) => {
        const userId = getUserId();

        if (!userId) {
            setMessage("Please login first.");
            return;
        }

        setLoading(type);
        setMessage("");

        try {
            const response = await fetch(`${API}/${type}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId,
                    productId: String(item._id || item.id),
                    name: item.name,
                    price: Number(item.finalPrice),
                    image: item.pic?.[0] || "",
                    quantity: 1
                })
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.message || "Unable to add product");
            }

            setMessage(
                type === "cart"
                    ? "Product added to cart!"
                    : "Product added to wishlist!"
            );
        } catch (error) {
            console.error("Add product error:", error);
            setMessage(error.message || "Something went wrong.");
        } finally {
            setLoading("");
        }
    };

    return (
        <div className="bg-light rounded overflow-hidden">
            <img
                className="img-fluid w-100"
                src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.pic?.[0] || ""}`}
                style={{ height: 300, objectFit: "contain" }}
                alt={item.name}
            />

            <div className="p-4">
                <Link
                    className="h4 d-block mb-3"
                    to={`/product/${item._id || item.id}`}
                >
                    {item.name}
                </Link>

                <p className="m-0 text-center text-dark">
                    <del>&#8377;{item.basePrice}</del>{" "}
                    &#8377;{item.finalPrice}
                    <sup> {item.discount}% Off</sup>
                </p>
            </div>

            <div className="d-flex justify-content-between border-top px-3">
                <p className="text-dark">{item.brand}</p>
                <p className="text-dark">
                    {item.stockQuantity} Left In Stock
                </p>
            </div>

            <div className="p-2">
                <button
                    className="btn btn-primary w-100 mb-2"
                    disabled={!!loading || Number(item.stockQuantity) <= 0}
                    onClick={() => addItem("cart")}
                >
                    {loading === "cart" ? "Adding..." : "Add to Cart"}
                </button>

                <button
                    className="btn btn-outline-danger w-100"
                    disabled={!!loading}
                    onClick={() => addItem("wishlist")}
                >
                    {loading === "wishlist"
                        ? "Adding..."
                        : "Add to Wishlist"}
                </button>

                {message && (
                    <p className="text-center mt-2 mb-0" role="status">
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
};

export default SingleProduct;
