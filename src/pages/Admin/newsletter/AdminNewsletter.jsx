
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react"
import DataTable from 'datatables.net-dt';
// import 'datatables.net-dt/css/DataTables.DataTables.min.css'
import 'datatables.net-dt/css/dataTables.dataTables.css'

import AdminSidebar from "../../../component/Admin/AdminSidebar"
import { getNewsletter, deleteNewsletter, updateNewsletter } from "../../../Redux/ActionCreaters/NewsletterAction"


const AdminNewsletter = () => {
    const [data, setData] = useState([])
    const [flag , setFlag] = useState(false)

    const NewsletterStateData = useSelector(state => state.NewsletterStateData)
    const dispatch = useDispatch()

    const deleteRecord = (id) => {
        if (window.confirm("You Sure Delete to This Record")) {
            dispatch(deleteNewsletter({ id }))
            setData(data.filter(x => x.id !== id))
        }
    }

    const updateRecord = (id) => {
        let index = data.findIndex(x => x.id === id)
        data[index].status = !data[index].status
        dispatch(updateNewsletter({ ...data[index] }))
        setFlag(!flag)
    }

    //  Component mount hone par data fetch karo
    useEffect(() => {
        dispatch(getNewsletter())
    }, [])

    // Redux state change hone par local state update karo
    useEffect(() => {
        if (NewsletterStateData && NewsletterStateData.length > 0) {
            setData(NewsletterStateData)

            // DataTable initialize karo
            const timer = setTimeout(() => {
                new DataTable('#myTable')
            }, 100)
            return () => clearTimeout(timer)
        }
    }, [NewsletterStateData])

    return (
        <div className="container-fluid my-4">
            <div className="row">
                <div className="col-lg-3">
                    <AdminSidebar />
                </div>
                <div className="col-lg-9">
                    <h5 className="bg-primary text-center p-2 text-light">
                        Newsletter

                    </h5>
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped" id="myTable">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Email</th>

                                    <th>Status</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.email}</td>

                                        <td style={{ cursor: "pointer" }} title="Click Here to Change Status" onClick={() => updateRecord(item.id)}>{item.status ? 'Active' : 'Inactive'}</td>

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

export default AdminNewsletter
