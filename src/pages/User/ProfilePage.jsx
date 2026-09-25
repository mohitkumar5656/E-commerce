import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import UpdateProfile from "../../component/User/UpdateProfile"
import Address from "../../component/User/Address"
import Wishlist from "../../component/User/Wishlist"
import Orders from "../../component/User/Orders"
import Profile from "../../component/User/Profile"

const ProfilePage = () => {

    const [option, setOption] = useState("profile")
    const [searchParams] = useSearchParams()

    useEffect(() => {
        (() => {
            setOption(searchParams.get("option") ?? ("profile"))
        })()
    }, [searchParams])

    return (
        <div className="container my-3">
            <div className="row">
                <div className="col-lg-3">
                    <div className="list-group">
                        <button type="button" className={`list-group-item list-group-item-action mb-1 ${option === "profile" ? 'active' : ''}`} onClick={() => setOption("profile")}>Profile</button>
                        <button type="button" className={`list-group-item list-group-item-action mb-1 ${option === "update-profile" ? 'active' : ''}`} onClick={() => setOption("update-profile")}>Update Profile</button>
                        <button type="button" className={`list-group-item list-group-item-action mb-1 ${option === "address" ? 'active' : ''}`} onClick={() => setOption("address")}>Address</button>
                        <button type="button" className={`list-group-item list-group-item-action mb-1 ${option === "orders" ? 'active' : ''}`} onClick={() => setOption("orders")}>Orders</button>
                        <button type="button" className={`list-group-item list-group-item-action mb-1 ${option === "wishlist" ? 'active' : ''}`} onClick={() => setOption("wishlist")}>Wishlist</button>
                        <Link to="/cart" className={`list-group-item list-group-item-action mb-1 ${option === "Cart" ? 'active' : ''}`} onClick={() => setOption("Cart")}>Cart</Link>
                        <Link to="/checkout" className={`list-group-item list-group-item-action mb-1 ${option === "Checkout" ? 'active' : ''}`} onClick={() => setOption("Checkout")}>Checkout</Link>

                    </div>
                </div>
                <div className="col-lg-9">
                    <div className={`${option==="profile"?"d-block":"d-none"}`}>
                        <h5 className="bg-primary text-center text-light p-2">Your Profile</h5>
                        <Profile option={option}/>
                          
                    </div>

                    <div className={`${option==="update-profile"?"d-block":"d-none"}`}>
                        <h5 className="bg-primary text-center text-light p-2"> Your Update Profile Details</h5>
                    <UpdateProfile setOption={setOption}/>
                    </div>

                    <div className={`${option==="address"?"d-block":"d-none"}`}>
                        <h5 className="bg-primary text-center text-light p-2">Manage Your Address</h5>
                       <Address/>
                    </div>
                    <div className={`${option==="wishlist"?"d-block":"d-none"}`}>
                        <h5 className="bg-primary text-center text-light p-2">Your Wishlist</h5>
                        <Wishlist/>
                    </div>
                    <div className={`${option==="orders"?"d-block":"d-none"}`}>
                        <h5 className="bg-primary text-center text-light p-2">Your Orders</h5>
                          <Orders/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProfilePage