import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react"
import DataTable from 'datatables.net-dt';
import 'datatables.net-dt/css/DataTables.DataTables.min.css'

import AdminSidebar from "../../../component/Admin/AdminSidebar"
import { getFeature, deleteFeature } from "../../../Redux/ActionCreaters/FeatureAction"


const AdminFeature = () => {
    const [data, setData] = useState([])

    const FeatureStateData = useSelector(state => state.FeatureStateData)
    const dispatch = useDispatch()

    const deleteRecord = (id) => {
        if (window.confirm("You Sure Delete to This Record")) {
            dispatch(deleteFeature({ id }))
            setData(data.filter(x => x.id !== id))
        }
    }

    //  Component mount hone par data fetch karo
    useEffect(() => {
        dispatch(getFeature())
    }, [])

    // Redux state change hone par local state update karo
    useEffect(() => {
        if (FeatureStateData && FeatureStateData.length > 0) {
            setData(FeatureStateData)

            // DataTable initialize karo
            const timer = setTimeout(() => {
                new DataTable('#myTable')
            }, 100)
            return () => clearTimeout(timer)
        }
    }, [FeatureStateData])

    return (
        <div className="container-fluid my-4">
            <div className="row">
                <div className="col-lg-3">
                    <AdminSidebar />
                </div>
                <div className="col-lg-9">
                    <h5 className="bg-primary text-center p-2 text-light">
                        Feature
                        <Link to="/admin/feature/create">
                            <i className="bi bi-plus text-light fs-5 float-end"></i>
                        </Link>
                    </h5>
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped" id="myTable">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Icon</th>
                                    <th>Short Description</th>
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
                                        <td><span className="fs-1" dangerouslySetInnerHTML={{__html:item.icon}}/></td>
                                        <td>{item.shortDescription}</td>
                                       
                                        <td>{item.status ? 'Active' : 'Inactive'}</td>
                                        <td>
                                            <Link to={`/admin/feature/update/${item.id}`} className="btn btn-primary">
                                                <i className="bi bi-pencil"></i>
                                            </Link>
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

export default AdminFeature
