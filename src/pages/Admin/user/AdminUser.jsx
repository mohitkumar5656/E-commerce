import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react"
import DataTable from 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.css'

import AdminSidebar from "../../../component/Admin/AdminSidebar"
import { getUser, deleteUser, updateUser } from "../../../Redux/ActionCreaters/UserAction"


const AdminUser = () => {
    const [data, setData] = useState([])
    const [flag ,setFlag] = useState(false)

    const UserStateData = useSelector(state => state.UserStateData)
    const dispatch = useDispatch()

    const deleteRecord = (id) => {
        if (window.confirm("You Sure Delete to This Record")) {
            dispatch(deleteUser({ id }))
            setData(data.filter(x => x.id !== id))
        }
    }

    const updateRecord = (id) => {
            let index = data.findIndex(x => x.id === id)
            data[index].status = !data[index].status
            dispatch(updateUser({ ...data[index] }))
            setFlag(!flag)
        }
    

    //  Component mount hone par data fetch karo
    useEffect(() => {
        dispatch(getUser())
    }, [])

    // Redux state change hone par local state update karo
    useEffect(() => {
        if (UserStateData && UserStateData.length > 0) {
            setData(UserStateData)

            // DataTable initialize karo
            const timer = setTimeout(() => {
                new DataTable('#myTable')
            }, 100)
            return () => clearTimeout(timer)
        }
    }, [UserStateData])

    return (
        <div className="container-fluid my-4">
            <div className="row">
                <div className="col-lg-3">
                    <AdminSidebar />
                </div>
                <div className="col-lg-9">
                    <h5 className="bg-primary text-center p-2 text-light">
                        User
                        <Link to="/admin/user/create">
                            <i className="bi bi-plus text-light fs-5 float-end"></i>
                        </Link>
                    </h5>
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped" id="myTable">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Username</th>
                                    <th>Email Address</th>
                                    <th>Phone</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                       <td>{item.username}</td>
                                       <td>{item.email}</td>
                                       <td>{item.phone}</td>
                                       <td>{item.role}</td>
                                        <td style={{ cursor: "pointer" }} title="Click Here to Change Status" onClick={() => updateRecord(item.id)}>{item.status ? 'Active' : 'Inactive'}</td>
                                        <td>
                                           {item.role==="Buyer"?null : <Link to={`/admin/user/update/${item.id}`} className="btn btn-primary">
                                                <i className="bi bi-pencil"></i>
                                            </Link>}
                                        </td>
                                        <td>
                                            <button className="btn btn-danger" onClick={() => deleteRecord(item.id)}>
                                                <i className="bi bi-trash"></i>
                                            </button>
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

export default AdminUser
