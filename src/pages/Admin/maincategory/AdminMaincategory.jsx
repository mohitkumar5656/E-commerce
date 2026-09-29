import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from "react"
import DataTable from "datatables.net-dt"
import "datatables.net-dt/css/dataTables.dataTables.css"

import AdminSidebar from "../../../component/Admin/AdminSidebar"
import {
    getMaincategory,
    deleteMaincategory
} from "../../../Redux/ActionCreaters/MaincategoryAction"

const AdminMaincategory = () => {

    const [data, setData] = useState([])

    const MaincategoryStateData = useSelector(
        state => state.MaincategoryStateData
    )

    const dispatch = useDispatch()

    // Delete Maincategory
    const deleteRecord = (id) => {
        if (window.confirm("You Sure Delete to This Record")) {

            dispatch(deleteMaincategory({ id }))

            // MongoDB _id ke according local data se remove
            setData(data.filter(x => x._id !== id))
        }
    }

    // Component mount hone par data fetch
    useEffect(() => {
        dispatch(getMaincategory())
    }, [dispatch])

    // Redux state change hone par local state update
    useEffect(() => {

        if (MaincategoryStateData && MaincategoryStateData.length > 0) {

            setData(MaincategoryStateData)

            // DataTable initialize
            const timer = setTimeout(() => {

                // Agar pehle se DataTable initialized hai to destroy karo
                const table = document.querySelector("#myTable")

                if (table) {
                    try {
                        new DataTable("#myTable")
                    } catch (error) {
                        console.log("DataTable Error:", error)
                    }
                }

            }, 100)

            return () => clearTimeout(timer)
        }

    }, [MaincategoryStateData])

    return (
        <div className="container-fluid my-4">

            <div className="row">

                {/* Sidebar */}
                <div className="col-lg-3">
                    <AdminSidebar />
                </div>

                {/* Main Content */}
                <div className="col-lg-9">

                    <h5 className="bg-primary text-center p-2 text-light">

                        Maincategory

                        <Link to="/admin/maincategory/create">
                            <i className="bi bi-plus text-light fs-5 float-end"></i>
                        </Link>

                    </h5>

                    <div className="table-responsive">

                        <table
                            className="table table-bordered table-striped"
                            id="myTable"
                        >

                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Pic</th>
                                    <th>Status</th>
                                    <th>Update</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>

                            <tbody>

                                {data.map((item) => (

                                    <tr key={item._id}>

                                        {/* MongoDB ID */}
                                        <td>{item._id}</td>

                                        {/* Name */}
                                        <td>{item.name}</td>

                                        {/* Image */}
                                        <td>

                                            <Link
                                                to={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.pic}`}
                                                target="_blank"
                                                rel="noreferrer"
                                            >

                                                <img
                                                    src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.pic}`}
                                                    height={60}
                                                    width={60}
                                                    alt={item.name}
                                                />

                                            </Link>

                                        </td>

                                        {/* Status */}
                                        <td>
                                            {item.status
                                                ? "Active"
                                                : "Inactive"
                                            }
                                        </td>

                                        {/* Update */}
                                        <td>

                                            <Link
                                                to={`/admin/maincategory/update/${item._id}`}
                                                className="btn btn-primary"
                                            >

                                                <i className="bi bi-pencil"></i>

                                            </Link>

                                        </td>

                                        {/* Delete */}
                                        <td>

                                            <button
                                                className="btn btn-danger"
                                                onClick={() =>
                                                    deleteRecord(item._id)
                                                }
                                            >

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

export default AdminMaincategory