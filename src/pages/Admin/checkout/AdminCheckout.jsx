
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react"
import DataTable from 'datatables.net-dt';
import 'datatables.net-dt/css/DataTables.DataTables.min.css'

import AdminSidebar from "../../../component/Admin/AdminSidebar"
import { getCheckout} from "../../../Redux/ActionCreaters/CheckoutAction"
import { Link } from "react-router-dom";


const AdminCheckout = () => {
    const [data, setData] = useState([])
    

    const CheckoutStateData = useSelector(state => state.CheckoutStateData)
    const dispatch = useDispatch()

   

    //  Component mount hone par data fetch karo
    useEffect(() => {
        dispatch(getCheckout())
    }, [])

    // Redux state change hone par local state update karo
    useEffect(() => {
        if (CheckoutStateData && CheckoutStateData.length > 0) {
            setData(CheckoutStateData)

            // DataTable initialize karo
            const timer = setTimeout(() => {
                new DataTable('#myTable')
            }, 100)
            return () => clearTimeout(timer)
        }
    }, [CheckoutStateData])

    return (
        <div className="container-fluid my-4">
            <div className="row">
                <div className="col-lg-3">
                    <AdminSidebar />
                </div>
                <div className="col-lg-9">
                    <h5 className="bg-primary text-center p-2 text-light">
                        Checkout

                    </h5>
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped" id="myTable">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Buyer</th>
                                    <th>Order Status</th>
                                     <th>Payment Mode</th>
                                     <th>Payment Status</th>
                                     <th>Total</th>
                                     
                                     <th>Date</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.delivaryAddress?.name}
                                            <br />
                                            {item.delivaryAddress?.city}, {item.delivaryAddress?.pin}
                                        </td>
                                        <td>{item.orderStatus}</td>
                                        <td>{item.paymentMode}</td>
                                        <td>{item.paymentStatus}</td>
                                        
                                        <td>&#8377; {item.total}</td>
                                         <td>{new Date(item.date).toDateString()}</td>
                                         <td><Link to={`/admin/checkout/show/${item.id}`} className="btn btn-primary"><i className="bi bi-eye"></i></Link></td>
                                       
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminCheckout
