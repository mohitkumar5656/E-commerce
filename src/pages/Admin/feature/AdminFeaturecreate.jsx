import { Link, useNavigate } from "react-router-dom"
import AdminSidebar from "../../../component/Admin/AdminSidebar"
import { useEffect, useState } from "react"
import FormValidator from "../../../validator/FormValidator"


import { getFeature, createFeature } from "../../../Redux/ActionCreaters/FeatureAction"
import { useDispatch, useSelector } from "react-redux"
const AdminFeaturecreate = () => {

    const [data, setdata] = useState({
        name: '',
        icon: '',
        shortDescription: '',
        status: true
    })

    const [errorMassage, seterrorMassage] = useState({
        name: " Name  is Mendatory",
        icon: " icon is Mendatory",
        shortDescription: " Short Description  is Mendatory",
    })

    const [show, setshow] = useState(false)
    const FeatureStatedata = useSelector(state => state.FeatureStateData)



    const dispatch = useDispatch()

    const navigate = useNavigate()


    const getInputdata = (e) => {

        const { name, value } = e.target
        // const value = name === "pic" ? +e.target.files[0] : e.target.value     // in case or real Backend

        setdata({ ...data, [name]: name === "status" ? (value === "1" ? true : false) : value })
        seterrorMassage({ ...errorMassage, [name]: FormValidator(e) })

    }

    const postdata = (e) => {
        e.preventDefault()

        const error = Object.values(errorMassage).find(x => x !== "")
        if (error) {
            setshow(true)
            return
        }

        let item = FeatureStatedata?.find?.(x => x.name?.toLowerCase() === data.name?.toLowerCase())
        if (item) {
            seterrorMassage({ ...errorMassage, name: "Feature With This Already Exist" })
            setshow(true)
            return
        }

        // All good → create category
        dispatch(createFeature({ ...data })) 
            navigate("/admin/feature");
    

    }

    useEffect(() => {
        (() => {
            dispatch(getFeature())
        })()

    }, [FeatureStatedata.length])
    return (
        <div className="container-fluid my-4">
            <div className="row">
                <div className="col-lg-3">
                    <AdminSidebar />

                </div>
                <div className="col-lg-9">
                    <h5 className="bg-primary text-center p-2 text-light">Create Feature <Link to="/admin/feature" > <i className="bi bi-arrow-left text-light fs-5 float-end"> </i></Link></h5>
                    <form onSubmit={postdata}>
                        <div className="row">
                            <div className="col-12 mb-3">
                                <label>Name</label>
                                <input type="text" name="name" onChange={getInputdata} placeholder="Feature name "
                                    className={`form-control ${show && errorMassage.name ? 'border-danger' : 'border-primary'}`}
                                />
                                {show && errorMassage.name ? <p className="text-danger">{errorMassage.name} </p> : null}
                            </div>

                            <div className="col-12 mb-3">
                                <label>Short Description</label>
                                <textarea name="shortDescription" onChange={getInputdata} placeholder="Short Description" rows={3}
                                    className={`form-control ${show && errorMassage.shortDescription ? 'border-danger' : 'border-primary'}`}
                                ></textarea>
                                {show && errorMassage.shortDescription ? <p className="text-danger">{errorMassage.shortDescription} </p> : null}
                            </div>


                            <div className="col-lg-6 mb-3">
                                <label>Icon</label>
                                <input type="text" name="icon" placeholder="Icon tag eg. <i class='bi bi list'></i>" onChange={getInputdata}
                                    className={`form-control ${show && errorMassage.icon ? 'border-danger' : 'border-primary'}`}
                                />
                                {show && errorMassage.icon ? <p className="text-danger">{errorMassage.icon} </p> : null}
                            </div>
                            <div className="col-lg-6 mb-3">
                                <label>Status</label>
                                <select name="status" onChange={getInputdata} className="form-select border-primary">
                                    <option value="1">Active</option>
                                    <option value="0">Inactive</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Create</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}
export default AdminFeaturecreate