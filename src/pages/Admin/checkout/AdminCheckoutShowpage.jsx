
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react"

import AdminSidebar from "../../../component/Admin/AdminSidebar"
import { getCheckout, updateCheckout } from "../../../Redux/ActionCreaters/CheckoutAction"
import { Link, useNavigate, useParams } from "react-router-dom";


const AdminCheckoutShowpage = () => {
    const { id } = useParams()
    const [data, setData] = useState({})
    const [flag, setFlag] = useState(false)
    const [orderStatus, setOrderStatus] = useState("")
    const [paymentStatus, setPaymentStatus] = useState("")
    const navigate = useNavigate()

    const CheckoutStateData = useSelector(state => state.CheckoutStateData)
    const dispatch = useDispatch()



    const updateRecord = () => {
        data.orderStatus = orderStatus
        data.paymentStatus = paymentStatus
        dispatch(updateCheckout({ ...data }))

        setFlag(!flag)
    }

    //  Component mount hone par data fetch karo
    useEffect(() => {
        (() => {
            dispatch(getCheckout())
            if (CheckoutStateData.length) {
                let item = CheckoutStateData.find(x => x.id === id)
                if (item) {
                    setData({ ...item })
                    setOrderStatus(item.orderStatus)
                    setPaymentStatus(item.paymentStatus)
                }
                else
                    navigate("/admin/checkout")
            }


        })()
    }, [CheckoutStateData.length])

    return (
        <div className="container-fluid my-4">
            <div className="row">
                <div className="col-lg-3">
                    <AdminSidebar />
                </div>
                <div className="col-lg-9">
                    <h5 className="bg-primary text-center p-2 text-light">Checkout Query <Link to="/admin/checkout" > <i className="bi bi-arrow-left text-light fs-5 float-end"> </i></Link></h5>

                    <table className="table">
                        <tbody>
                            <tr>
                                <th>Id</th>
                                <td>{data.id}</td>
                            </tr>

                            <tr>
                                <th>Buyer</th>
                                <td>
                                    {data.delivaryAddress?.name}<br />
                                    {data.delivaryAddress?.phone},  {data.delivaryAddress?.email}<br />
                                    {data.delivaryAddress?.address}<br />
                                    {data.delivaryAddress?.pin} ,  {data.delivaryAddress?.city} ,  {data.delivaryAddress?.state}

                                </td>
                            </tr>

                            <tr>
                                <th>Order Status</th>
                                <td>{data.orderStatus}
                                    {data.orderStatus !== "Delivered" ?
                                        <select className="mt-3 form-select border-primary" value={orderStatus} onChange={(e) => setOrderStatus(e.target.value)}>
                                            <option>Order Has Been Placed</option>
                                            <option>Order Has Been Packed</option>
                                            <option>Order Has Been Ready</option>
                                            <option>Order Has Been Delivered</option>
                                            <option>Order Has Been Shipped</option>
                                            <option>Order is in Transit</option>
                                            <option>Order Out for Delivery</option>
                                            <option>Order is Ready to Ship</option>
                                            <option>Delivered</option>
                                        </select> : null}
                                </td>
                            </tr>

                            <tr>
                                <th>Payment Mode</th>
                                <td>{data.paymentMode}</td>
                            </tr>

                            <tr>
                                <th>Payment Status</th>
                                <td>{data.paymentStatus}
                                    {data.paymentStatus !== "Done" ?
                                        <select className="mt-3 form-select border-primary" value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value)}>
                                            <option>Pending</option>
                                            <option>Done</option>

                                        </select> : null}
                                </td>
                            </tr>

                            <tr>
                                <th>Subtotal Amount</th>
                                <td>&#8377; {data.subTotal}</td>
                            </tr>
                            <tr>
                                <th>Shipping Amount</th>
                                <td>&#8377; {data.shipping}</td>
                            </tr>

                            <tr>
                                <th>Total</th>
                                <td>&#8377; {data.total}</td>
                            </tr>

                            <tr>
                                <th>Date</th>
                                <td>{new Date(data.date).toLocaleString()}</td>
                            </tr>



                            <tr>
                                <td colSpan={2}>
                                    {data.orderStatus!=="Delivered" || data.paymentStatus ==="Pending" ?
                                        <button className="btn btn-primary w-100" onClick={updateRecord}>Update Status</button> : null
                                    }

                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <h5 className=" text-center p-2 border border-primary">Product In This Order</h5>
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Brand</th>
                                    <th>Color</th>
                                    <th>Size</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>

                                </tr>
                            </thead>

                            <tbody>
                                {data?.products?.map((p, index) => {
                                    return <tr key={index}>
                                        <td>
                                            <Link to={`${import.meta.env.VITE_APP_IMAGE_SERVER}${p.pic}`} target="_blank" rel="noreferrer"></Link>
                                            <img src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${p.pic}`} height={80} width={80} />
                                        </td>
                                        <td>{p.name}</td>
                                        <td>{p.barnd}</td>
                                        <td>{p.color}</td>
                                        <td>{p.size}</td>
                                        <td>&#8377; {p.price}</td>
                                        <td>{p.qty}</td>
                                        <td>&#8377; {p.total}</td>

                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminCheckoutShowpage
