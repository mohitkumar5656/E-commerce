
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react"

import AdminSidebar from "../../../component/Admin/AdminSidebar"
import { getContactUs, deleteContactUs, updateContactUs } from "../../../Redux/ActionCreaters/ContactUsAction"
import { Link, useNavigate, useParams } from "react-router-dom";


const AdminContactUsShowpage = () => {
    const {id} = useParams()
    const [data, setData] = useState({})
    const [flag , setFlag] = useState(false)
    const navigate  = useNavigate()

    const ContactUsStateData = useSelector(state => state.ContactUsStateData)
    const dispatch = useDispatch()

    const deleteRecord = () => {
        if (window.confirm("You Sure Delete to This Record")) {
            dispatch(deleteContactUs({ id }))
           navigate("/admin/contectus")

        }
    }

    const updateRecord = () => {
        data.status = !data.status
        dispatch(updateContactUs({ ...data}))
        
        setFlag(!flag)
    }

    //  Component mount hone par data fetch karo
  useEffect(()=>{
    (()=>{
        dispatch(getContactUs())
        if(ContactUsStateData.length){
          let item = ContactUsStateData.find(x=>x.id === id)
          if(item)
            setData({...item})
           else
            navigate("/admin/contectus")
           }
        
       
    })()
  },[ContactUsStateData.length])

    return (
        <div className="container-fluid my-4">
            <div className="row">
                <div className="col-lg-3">
                    <AdminSidebar />
                </div>
                <div className="col-lg-9">
                    <h5 className="bg-primary text-center p-2 text-light">ContactUs Query <Link to="/admin/contectus" > <i className="bi bi-arrow-left text-light fs-5 float-end"> </i></Link></h5>
                    
                   <table className="table">
                    <tbody>
                        <tr>
                            <th>Id</th>
                            <td>{data.id}</td>
                        </tr>

                         <tr>
                            <th>Name</th>
                            <td>{data.name}</td>
                        </tr>

                         <tr>
                            <th>Email</th>
                            <td>{data.email}</td>
                        </tr>

                         <tr>
                            <th>Phone</th>
                            <td>{data.phone}</td>
                        </tr>

                         <tr>
                            <th>Subject</th>
                            <td>{data.subject}</td>
                        </tr>

                         <tr>
                            <th>Message</th>
                            <td>{data.message}</td>
                        </tr>

                         <tr>
                            <th>Status</th>
                            <td>{data.status ? "Active" : "Inactive"}</td>
                        </tr>
                         <tr>
                            <th>Date</th>
                            <td> {new Date(data.date).toLocaleString()}</td>
                        </tr>

                       <tr>
                         <td colSpan={2}>
                            {data.status ?
                                  <button className="btn btn-primary w-100" onClick={updateRecord}>Update Status</button> :   
                                  <button className="btn btn-danger w-100" onClick={deleteRecord}>Delete Status</button>    
                        }

                        </td>
                       </tr>
                    </tbody>
                   </table>
                </div>
            </div>
        </div>
    )
}

export default AdminContactUsShowpage
