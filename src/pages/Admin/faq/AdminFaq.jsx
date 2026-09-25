import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react"
import DataTable from 'datatables.net-dt';
// import 'datatables.net-dt/css/DataTables.DataTables.min.css'
import 'datatables.net-dt/css/dataTables.dataTables.css'

import AdminSidebar from "../../../component/Admin/AdminSidebar"
import { getFaq, deleteFaq } from "../../../Redux/ActionCreaters/FaqAction"


const AdminFaq = () => {
    const [data, setData] = useState([])

    const FaqStateData = useSelector(state => state.FaqStateData)
    const dispatch = useDispatch()

    const deleteRecord = (id) => {
        if (window.confirm("You Sure Delete to This Record")) {
            dispatch(deleteFaq({ id }))
            setData(data.filter(x => x.id !== id))
        }
    }

    //  Component mount hone par data fetch karo
    useEffect(() => {
        dispatch(getFaq())
    }, [])

    // Redux state change hone par local state update karo
    useEffect(() => {
        if (FaqStateData && FaqStateData.length > 0) {
            setData(FaqStateData)
            

            // DataTable initialize karo
            const timer = setTimeout(() => {
                new DataTable('#myTable')
            }, 100)
            return () => clearTimeout(timer)
        }
    }, [FaqStateData])

    return (
        <div className="container-fluid my-4">
            <div className="row">
                <div className="col-lg-3">
                    <AdminSidebar />
                </div>
                <div className="col-lg-9">
                    <h5 className="bg-primary text-center p-2 text-light">
                        Faq
                        <Link to="/admin/faq/create">
                            <i className="bi bi-plus text-light fs-5 float-end"></i>
                        </Link>
                    </h5>
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped" id="myTable">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Question</th>
                                    <th>Answer</th>
                                    <th>Status</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.question}</td>
                                        <td>{item.answer}</td>
                                      
                                        <td>{item.status ? 'Active' : 'Inactive'}</td>
                                        <td>
                                            <Link to={`/admin/faq/update/${item.id}`} className="btn btn-primary">
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

export default AdminFaq
