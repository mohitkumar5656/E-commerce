import { Link, useNavigate, useParams } from "react-router-dom"
import AdminSidebar from "../../../component/Admin/AdminSidebar"
import { useEffect, useState } from "react"
import FormValidator from "../../../validator/FormValidator"
import ImageValidator from "../../../validator/ImageValidator"
import { getBrand, updateBrand } from "../../../Redux/ActionCreaters/BrandAction"
import { useDispatch, useSelector } from "react-redux"
const AdminBrandupdate = () => {
    const { id } = useParams()

    const [data, setdata] = useState({
        name: '',
        pic: '',
        status: true
    })

    const [errorMassage, seterrorMassage] = useState({
        name: " ",
        pic: "",
    })

    const [show, setshow] = useState(false)
    const BrandStatedata = useSelector(state => state.BrandStateData)
    const dispatch = useDispatch()

    const navigate = useNavigate()


    const getInputdata = (e) => {
        const name = e.target.name
        const value = name === "pic" ? "brand/" + e.target.files[0].name : e.target.value
        // const value = name === "pic" ? +e.target.files[0] : e.target.value     // in case or real Backend

        setdata({ ...data, [name]: name === "status" ? (value === "1" ? true : false) : value })
        seterrorMassage({ ...errorMassage, [name]: name === "pic" ? ImageValidator(e) : FormValidator(e) })

    }

    const postdata = (e) => {
        e.preventDefault()
        const error = Object.values(errorMassage).find(x => x !== "")
        if (error)
            setshow(true)
        else {
            let item = BrandStatedata.find(x => x.id !== id && x.name?.toLowerCase() === data.name?.toLowerCase())
            if (item) {
                seterrorMassage({ ...errorMassage, name: "Brand With This Already Exist" })
                setshow(true)
                return
            }
            else {

                // All good → create category
                dispatch(updateBrand({ ...data }))


                // const formData = new formData()
                // formData.append("name",data.name)
                // formData.append("status",data.status)
                // dispatch(createBrand(formData))

                navigate("/admin/brand")
            }
        }
    }

    useEffect(() => {
        (() => {
            dispatch(getBrand())
            if (BrandStatedata.length) {
                const item = BrandStatedata.find(x => x.id === id)
                if (item)
                    setdata({ ...data, ...item })
                else
                    navigate("/admin/brand")
            }
        })()

    }, [BrandStatedata.length])
    return (
        <div className="container-fluid my-4">
            <div className="row">
                <div className="col-lg-3">
                    <AdminSidebar />

                </div>
                <div className="col-lg-9">
                    <h5 className="bg-primary text-center p-2 text-light">Update Brand <Link to="/admin/brand" > <i className="bi bi-arrow-left text-light fs-5 float-end"> </i></Link></h5>
                    <form onSubmit={postdata}>
                        <div className="row">
                            <div className="col-12 mb-3">
                                <label>Name</label>
                                <input type="text" name="name" value={data.name} onChange={getInputdata} placeholder="Brand name "
                                    className={`form-control ${show && errorMassage.name ? 'border-danger' : 'border-primary'}`}
                                />
                                {show && errorMassage.name ? <p className="text-danger">{errorMassage.name} </p> : null}
                            </div>
                            <div className="col-lg-6 mb-3">
                                <label>Pic</label>
                                <input type="file" name="pic" onChange={getInputdata}
                                    className={`form-control ${show && errorMassage.pic ? 'border-danger' : 'border-primary'}`}
                                />
                                {show && errorMassage.pic ? <p className="text-danger">{errorMassage.pic} </p> : null}
                            </div>
                            <div className="col-lg-6 mb-3">
                                <label>Status</label>
                                <select name="status" onChange={getInputdata} value={data.status ? '1' : '0'} className="form-select border-primary">
                                    <option value="1">Active</option>
                                    <option value="0">Inactive</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Update</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}
export default AdminBrandupdate