
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react"
import DataTable from 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.css'

import AdminSidebar from "../../../component/Admin/AdminSidebar"
import { getContactUs, deleteContactUs, updateContactUs } from "../../../Redux/ActionCreaters/ContactUsAction"
import { Link } from "react-router-dom";


const AdminContactUs = () => {
    const [data, setData] = useState([])
    const [flag , setFlag] = useState(false)

    const ContactUsStateData = useSelector(state => state.ContactUsStateData)
    const dispatch = useDispatch()

    const deleteRecord = (id) => {
        if (window.confirm("You Sure Delete to This Record")) {
            dispatch(deleteContactUs({ id }))
            setData(data.filter(x => x.id !== id))
        }
    }

    const updateRecord = (id) => {
        let index = data.findIndex(x => x.id === id)
        data[index].status = !data[index].status
        dispatch(updateContactUs({ ...data[index] }))
        setFlag(!flag)
    }

    //  Component mount hone par data fetch karo
    useEffect(() => {
        dispatch(getContactUs())
    }, [])

    // Redux state change hone par local state update karo
    useEffect(() => {
        if (ContactUsStateData && ContactUsStateData.length > 0) {
            setData(ContactUsStateData)

            // DataTable initialize karo
            const timer = setTimeout(() => {
                new DataTable('#myTable')
            }, 100)
            return () => clearTimeout(timer)
        }
    }, [ContactUsStateData])

    return (
        <div className="container-fluid my-4">
            <div className="row">
                <div className="col-lg-3">
                    <AdminSidebar />
                </div>
                <div className="col-lg-9">
                    <h5 className="bg-primary text-center p-2 text-light">
                        ContactUs

                    </h5>
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped" id="myTable">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                     <th>Phone</th>
                                     <th>Subject</th>
                                     <th>Status</th>
                                     <th>Date</th>
                                    
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.subject ?.slice(0,20)}...</td>
                                        <td style={{ cursor: "pointer" }} title="Click Here to Change Status" onClick={() => updateRecord(item.id)}>{item.status ? 'Active' : 'Inactive'}</td>
                                         <td>{new Date(item.date).toDateString()}</td>
                                         <td><Link to={`/admin/contectus/show/${item.id}`} className="btn btn-primary"><i className="bi bi-eye"></i></Link></td>
                                        <td>
                                            {
                                                item.status ? null :<button className="btn btn-danger" onClick={() => deleteRecord(item.id)}>
                                                <i className="bi bi-trash"></i>
                                            </button>
                                            }
                                        </td>
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

export default AdminContactUs
