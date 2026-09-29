import { Link, useNavigate, useParams } from "react-router-dom"
import AdminSidebar from "../../../component/Admin/AdminSidebar"
import { useEffect, useState } from "react"
import FormValidator from "../../../validator/FormValidator"
import ImageValidator from "../../../validator/ImageValidator"

import {
    getMaincategory,
    updateMaincategory
} from "../../../Redux/ActionCreaters/MaincategoryAction"

import { useDispatch, useSelector } from "react-redux"

const AdminMaincategoryupdate = () => {

    const { id } = useParams()

    const [data, setdata] = useState({
        _id: "",
        name: "",
        pic: "",
        status: true
    })

    const [errorMassage, seterrorMassage] = useState({
        name: "",
        pic: ""
    })

    const [show, setshow] = useState(false)

    const maincategoryStatedata = useSelector(
        state => state.MaincategoryStateData
    )

    const dispatch = useDispatch()
    const navigate = useNavigate()


    // Input change
    const getInputdata = (e) => {

        const name = e.target.name

        let value = e.target.value

        // Image
        if (name === "pic") {

            if (e.target.files && e.target.files.length > 0) {
                value = "maincategory/" + e.target.files[0].name
            } else {
                value = data.pic
            }
        }

        // Status
        if (name === "status") {
            value = value === "1"
        }

        setdata({
            ...data,
            [name]: value
        })

        // Validation
        seterrorMassage({
            ...errorMassage,
            [name]:
                name === "pic"
                    ? ImageValidator(e)
                    : FormValidator(e)
        })
    }


    // Update data
    const postdata = (e) => {

        e.preventDefault()

        setshow(true)

        const error = Object.values(errorMassage).find(
            x => x !== ""
        )

        if (error) {
            return
        }


        // Duplicate category check
        const item = maincategoryStatedata.find(
            x =>
                x._id !== id &&
                x.name?.toLowerCase() ===
                data.name?.toLowerCase()
        )

        if (item) {

            seterrorMassage({
                ...errorMassage,
                name: "Maincategory With This Already Exist"
            })

            return
        }


        // Update Maincategory
        dispatch(
            updateMaincategory({
                ...data,
                _id: id
            })
        )

        navigate("/admin/maincategory")
    }


    // Get Maincategory
    useEffect(() => {

        dispatch(getMaincategory())

    }, [dispatch])


    // Find selected Maincategory
    useEffect(() => {

        if (maincategoryStatedata.length > 0) {

            const item = maincategoryStatedata.find(
                x => x._id === id
            )

            if (item) {

                setdata({
                    _id: item._id,
                    name: item.name || "",
                    pic: item.pic || "",
                    status: item.status ?? true
                })

            } else {

                navigate("/admin/maincategory")

            }
        }

    }, [maincategoryStatedata, id, navigate])


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

                        Update Maincategory

                        <Link to="/admin/maincategory">
                            <i className="bi bi-arrow-left text-light fs-5 float-end"></i>
                        </Link>

                    </h5>


                    <form onSubmit={postdata}>

                        <div className="row">


                            {/* Name */}
                            <div className="col-12 mb-3">

                                <label>Name</label>

                                <input
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    onChange={getInputdata}
                                    placeholder="Maincategory name"
                                    className={`form-control ${
                                        show && errorMassage.name
                                            ? "border-danger"
                                            : "border-primary"
                                    }`}
                                />

                                {show && errorMassage.name ? (
                                    <p className="text-danger">
                                        {errorMassage.name}
                                    </p>
                                ) : null}

                            </div>


                            {/* Picture */}
                            <div className="col-lg-6 mb-3">

                                <label>Pic</label>

                                <input
                                    type="file"
                                    name="pic"
                                    accept="image/*"
                                    onChange={getInputdata}
                                    className={`form-control ${
                                        show && errorMassage.pic
                                            ? "border-danger"
                                            : "border-primary"
                                    }`}
                                />

                                {show && errorMassage.pic ? (
                                    <p className="text-danger">
                                        {errorMassage.pic}
                                    </p>
                                ) : null}

                            </div>


                            {/* Status */}
                            <div className="col-lg-6 mb-3">

                                <label>Status</label>

                                <select
                                    name="status"
                                    value={data.status ? "1" : "0"}
                                    onChange={getInputdata}
                                    className="form-select border-primary"
                                >

                                    <option value="1">
                                        Active
                                    </option>

                                    <option value="0">
                                        Inactive
                                    </option>

                                </select>

                            </div>


                            {/* Update Button */}
                            <div className="col-12">

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                >
                                    Update
                                </button>

                            </div>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    )
}

export default AdminMaincategoryupdate