import { Link, useNavigate, useParams } from "react-router-dom"
import AdminSidebar from "../../../component/Admin/AdminSidebar"
import { useEffect, useState } from "react"
import FormValidator from "../../../validator/FormValidator"

import { getUser, updateUser } from "../../../Redux/ActionCreaters/UserAction"
import { useDispatch, useSelector } from "react-redux"
const AdminUserupdate = () => {
    const { id } = useParams()

    const [data, setdata] = useState({
        name: "",
        username: '',
        email: '',
        phone: '',
        role: '',

    })

    const [errorMassage, setErrorMassage] = useState({
        name: "",
        username: "",
        email: "",
        phone: "",

    })

    const [show, setShow] = useState(false)
    const UserStatedata = useSelector(state => state.UserStateData)
    const dispatch = useDispatch()

    const navigate = useNavigate()


    const getInputData = (e) => {

        const { name, value } = e.target
        // const value = name === "pic" ? +e.target.files[0] : e.target.value     // in case or real Backend

        setdata({ ...data, [name]: name === "status" ? (value === "1" ? true : false) : value })
        setErrorMassage({ ...errorMassage, [name]: FormValidator(e) })

    }
    const postData = (e) => {
        e.preventDefault()
        const error = Object.values(errorMassage).find(x => x !== "")
        if (error)
            setShow(true)
        else {

            const item = UserStatedata.find(x => x.id !== id &&
                (x.username?.toLocaleLowerCase() === data.username.toLowerCase() ||
                    x.email?.toLocaleLowerCase() === data.email.toLocaleLowerCase()
                ))
            if (item) {
                setErrorMassage({
                    ...errorMassage,
                    username: item.username?.toLocaleLowerCase() === data.username.toLocaleLowerCase()
                        ? "Username Already Taken"
                        : "",
                    email: item.email?.toLocaleLowerCase() === data.email.toLocaleLowerCase()
                        ? "Email Already Taken"
                        : ""
                })
                setShow(true)
            }
            else {
                dispatch(updateUser({
                    ...data,
                     }))
                navigate("/admin/user")
            }
        }

    }

    useEffect(() => {
        (() => {
            dispatch(getUser())
            if (UserStatedata.length) {
                const item = UserStatedata.find(x => x.id === id)
                if (item)
                    setdata({ ...data, ...item })
                else
                    navigate("/admin/user")
            }
        })()

    }, [UserStatedata.length])
    return (
        <div className="container-fluid my-4">
            <div className="row">
                <div className="col-lg-3">
                    <AdminSidebar />

                </div>
                <div className="col-lg-9">
                    <h5 className="bg-primary text-center p-2 text-light">Update User <Link to="/admin/user" > <i className="bi bi-arrow-left text-light fs-5 float-end"> </i></Link></h5>
                   <form onSubmit={postData}>
                        <div className="row">
                            <div className="col-lg-6 mb-3">
                                <label>Name</label>
                                <input type="text" name="name" value={data.name} onChange={getInputData} placeholder="Full Name" className={`form-control ${show && errorMassage.name ? 'border-danger' : 'border-primary'}`} />
                                {show && errorMassage.name ? <p className="text-danger">{errorMassage.name}</p> : null}
                            </div>

                            <div className="col-lg-6 mb-3">
                                <label>Phone</label>
                                <input type="text" name="phone" value={data.phone} onChange={getInputData} placeholder="Phone Number" className={`form-control ${show && errorMassage.phone ? 'border-danger' : 'border-primary'}`} />
                                {show && errorMassage.phone ? <p className="text-danger">{errorMassage.phone}</p> : null}
                            </div>

                            <div className="col-lg-6 mb-3">
                                <label>User Name</label>
                                <input type="text" name="username" value={data.username} onChange={getInputData} placeholder="Username" className={`form-control ${show && errorMassage.username ? 'border-danger' : 'border-primary'}`} />
                                {show && errorMassage.username ? <p className="text-danger">{errorMassage.username}</p> : null}
                            </div>



                            <div className="col-lg-6 mb-3">
                                <label>Email</label>
                                <input type="email" name="email" value={data.email} onChange={getInputData} placeholder="Email Address" className={`form-control ${show && errorMassage.email ? 'border-danger' : 'border-primary'}`} />
                                {show && errorMassage.email ? <p className="text-danger">{errorMassage.email}</p> : null}
                            </div>

                           
                            <div className="col-lg-6 mb-3">
                                <label>Role</label>
                                <select name="role" value={data.role} onChange={getInputData} className="form-select border-primary">
                                    <option>Admin</option>
                                    <option>Super Admin</option>
                                </select>
                            </div>
                            <div className="col-lg-6 mb-3">
                                <label>Status</label>
                                <select name="status"  onChange={getInputData} className="form-select border-primary">
                                    <option value="1">Active</option>
                                    <option value="0">Inactive</option>
                                </select>
                            </div>
                            <div className="col-12 mb-3">
                                <button type="submit" className="btn btn-primary w-100">Signup</button>
                            </div>


                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}
export default AdminUserupdate