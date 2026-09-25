import { Link } from "react-router-dom"

const OrderConfirmation = () => {
    return (
        <div className="container my-3">
         <div className="card text-center p-5">
            <h1>Thank You</h1>
            <h3>Your Order Has Been Placed</h3>
            <h3>You Can Track Your Order In Profile Page</h3>
            <Link to="/shop" className="btn btn-primary w-25 m-auto">Shop</Link>
            <Link to="/profile?option=orders" className="btn btn-primary w-25 m-auto mt-2">Profile</Link>
         </div>
        </div>
    )
}
export default OrderConfirmation