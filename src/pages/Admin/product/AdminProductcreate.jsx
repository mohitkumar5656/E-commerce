import { Link, useNavigate } from "react-router-dom"
import AdminSidebar from "../../../component/Admin/AdminSidebar"
import { useEffect, useRef, useState } from "react"
import FormValidator from "../../../validator/FormValidator"
import ImageValidator from "../../../validator/ImageValidator"

import { createProduct } from "../../../Redux/ActionCreaters/ProductAction"
import { getMaincategory } from "../../../Redux/ActionCreaters/MaincategoryAction"
import { getSubcategory } from "../../../Redux/ActionCreaters/SubcategoryAction"
import { getBrand } from "../../../Redux/ActionCreaters/BrandAction"
import { useDispatch, useSelector } from "react-redux"

const colors = ["Red", "Black", "Blue", "Green", "Gray", "Orange", "Yellow", "white", "Navy", "Pink", "Lavender", "N/A"]
const sizes = ['XXXL', 'XXL', 'XL', 'L', 'M', 'SM', 'XS', 'NB', '26', '28', '30', '32', '34', '36', '38', '40', '42', 'N/A']
let rte;
const AdminProductcreate = () => {
    let refdiv = useRef(null)
    const [data, setdata] = useState({
        name: '',
        maincategory: '',
        subcategory: '',
        brand: '',
        color: '',
        size: [],
        basePrice: 0,
        discount: 0,
        finalPrice: 0,
        stock: true,
        stockQuantity: 0,
        pic: [],
        status: true
    })

    const [errorMassage, seterrorMassage] = useState({
        name: "Name is Mendatory",
        color: "Please Select Atleast One color",
        size: "Please Select Atleast One size",
        basePrice: "Base Price is Mendatory",
        discount: "Discount is Mendatory",
       
        stockQuantity: "Stock Quantity is Mendatory",
        pic: "Pic is Mendatory",
    })

    const [show, setshow] = useState(false)
    const MaincategoryStatedata = useSelector(state => state.MaincategoryStateData)
    const SubcategoryStatedata = useSelector(state => state.SubcategoryStateData)
    const BrandStatedata = useSelector(state => state.BrandStateData)



    const dispatch = useDispatch()

    const navigate = useNavigate()


    const getInputdata = (e) => {
        const name = e.target.name
        const value = name === "pic" ? Array.from(e.target.files).map(x=>"product/" + x.name): e.target.value
        // const value = name === "pic" ? +e.target.files[0] : e.target.value     // in case or real Backend

        setdata({ ...data, [name]: name === "status" || name === "stock" ? (value === "1" ? true : false) : value })
        seterrorMassage({ ...errorMassage, [name]: name === "pic" ? ImageValidator(e) : FormValidator(e) })

    }
    const getCheckboxData = (key, value) => {
        let arr = Array.isArray(data[key]) ? [...data[key]] : []

        if (arr.includes(value))
            arr = arr.filter(x => x !== value)
        else
            arr.push(value)

        seterrorMassage({ ...errorMassage, [key]: arr.length ? "" : `Please Select Atleast one ${key}` })
        setdata({ ...data, [key]: arr })
    }

    const postdata = (e) => {
        e.preventDefault()


        const error = Object.values(errorMassage).find(x => x !== "")
        if (error) {
            setshow(true)
            return
        }
        
            let bp = parseInt(data.basePrice)
            let d = parseInt(data.discount)
            let fp = parseInt(bp-bp*d/100)
            let sc = parseInt(data.stockQuantity)
        
        dispatch(createProduct({ ...data,
            maincategory:data.maincategory?data.maincategory:MaincategoryStatedata[0].name,
            subcategory:data.subcategory?data.subcategory:SubcategoryStatedata[0].name,
            brand:data.brand?data.brand:BrandStatedata[0].name,
            basePrice:bp,
            discount:d,
            finalPrice:fp,
            stockQuantity:sc,
            description:rte.getHTMLCode()


         }))

        // const formData = new formData()
        // formData.append("name",data.name)
        // formData.append("maincategory",data.maincategory?data.maincategory:MaincategoryStatedata[0].name)
        // formData.append("subcategory",data.subcategory?data.subcategory:SubcategoryStatedata[0].name)
        // formData.append("brand",data.brand?data.brand:BrandStatedata[0].name)
        // formData.append("color",data.color)
        // formData.append("size",data.size)
        // formData.append("baseaprice",data.bp)
        // formData.append("discount",d)
        // formData.append("finalPrice",fp)
        // formData.append("stock",data.stock)
        // formData.append("stockQuantity",sc)
        // formData.append("description",rte.getHTMLCode())
        // formData.append("pic",data.pic)
        // formData.append("status",data.status)
        // dispatch(createProduct(formData))

        navigate("/admin/product")
    }

    useEffect(() => {
        rte = new window.RichTextEditor(refdiv.current);
        rte.setHTMLCode("");



    }, [])

    useEffect(() => {
        (() => {
            dispatch(getMaincategory())
        })()

    }, [MaincategoryStatedata.length])

    useEffect(() => {
        (() => {
            dispatch(getSubcategory())
        })()

    }, [SubcategoryStatedata.length])

    useEffect(() => {
        (() => {
            dispatch(getBrand())
        })()

    }, [BrandStatedata.length])
    return (
        <div className="container-fluid my-4">
            <div className="row">
                <div className="col-lg-3">
                    <AdminSidebar />

                </div>
                <div className="col-lg-9">
                    <h5 className="bg-primary text-center p-2 text-light">Create Product <Link to="/admin/product" > <i className="bi bi-arrow-left text-light fs-5 float-end"> </i></Link></h5>
                    <form onSubmit={postdata}>
                        <div className="row">
                            <div className="col-12 mb-3">
                                <label>Name</label>
                                <input type="text" name="name" onChange={getInputdata} placeholder="Product name "
                                    className={`form-control ${show && errorMassage.name ? 'border-danger' : 'border-primary'}`}
                                />
                                {show && errorMassage.name ? <p className="text-danger">{errorMassage.name} </p> : null}
                            </div>

                            <div className="col-md-3 mb-3">
                                <label>Maincategory</label>
                                <select name="maincategory" onChange={getInputdata} className="form-select ">
                                    {
                                        MaincategoryStatedata.filter(x => x.status).map(item => {
                                            return <option key={item.id}>{item.name}</option>
                                            // return <option value={item.id}>{item.name}</option>


                                        })
                                    }
                                </select>
                            </div>

                            <div className="col-md-3 mb-3">
                                <label>Subcategory</label>
                                <select name="subcategory" onChange={getInputdata}  className="form-select ">
                                    {
                                        SubcategoryStatedata.filter(x => x.status).map(item => {
                                            return <option key={item.id}>{item.name}</option>
                                            // return <option value={item.id}>{item.name}</option>


                                        })
                                    }
                                </select>
                            </div>

                            <div className="col-md-3 mb-3">
                                <label>Brand</label>
                                <select name="brand" onChange={getInputdata}  className="form-select ">
                                    {
                                        BrandStatedata.filter(x => x.status).map(item => {
                                            return <option key={item.id}>{item.name}</option>
                                            // return <option value={item.id}>{item.name}</option>


                                        })
                                    }
                                </select>
                            </div>

                            <div className="col-md-3 mb-3">
                                <label>Stock</label>
                                <select name="stock" onChange={getInputdata}  className="form-select ">
                                    <option value="1"> In stock</option>
                                    <option value="0">Out of stock</option>
                                </select>
                            </div>

                            <div className="col-12 mb-3">
                                <label>Colors</label>
                                <div className="row border border-primary p-2 m-1 rounded">
                                    {
                                        colors.map((item, index) => {
                                            return <div key={index} className=" mb-2 col-xl-2 col-lg-3 col-md-4 col-6">
                                                <input type="checkbox" onChange={() => getCheckboxData('color', item)} checked={data.color.includes(item)} name={item} />
                                                <label className="ms-2">{item}</label>
                                            </div>
                                        })
                                    }
                                </div>
                                {show && errorMassage.color ? <p className="text-danger text-capitalize">{errorMassage.color} </p> : null}
                            </div>



                            <div className="col-12 mb-3">
                                <label>Size</label>
                                <div className="row border border-primary p-2 m-1 rounded">
                                    {
                                        sizes.map((item, index) => {
                                            return <div key={index} className=" mb-2 col-xl-2 col-lg-3 col-md-4 col-6">
                                                <input type="checkbox" onChange={() => getCheckboxData('size', item)} checked={data.size.includes(item)} name={item} />
                                                <label className="ms-2">{item}</label>
                                            </div>
                                        })
                                    }
                                </div>
                                {show && errorMassage.size ? <p className="text-danger text-capitalize">{errorMassage.size} </p> : null}
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>Base Price</label>
                                <input type="number" name="basePrice" onChange={getInputdata} placeholder="Product Base Price "
                                    className={`form-control ${show && errorMassage.basePrice ? 'border-danger' : 'border-primary'}`}
                                />
                                {show && errorMassage.basePrice ? <p className="text-danger">{errorMassage.basePrice} </p> : null}
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>Discount</label>
                                <input type="number" name="discount" onChange={getInputdata} placeholder="Product Discount "
                                    className={`form-control ${show && errorMassage.discount ? 'border-danger' : 'border-primary'}`}
                                />
                                {show && errorMassage.discount ? <p className="text-danger">{errorMassage.discount} </p> : null}
                            </div>

                            <div className="col-12 mb-2">
                                <label>Discription</label>
                                <div ref={refdiv} className="border border-primary"></div>
                            </div>

                            <div className="col-lg-4 col-md-6 mb-3">
                                <label>Stock Quantity</label>
                                <input type="number" name="stockQuantity" onChange={getInputdata} placeholder="Product Stock Quantity "
                                    className={`form-control ${show && errorMassage.stockQuantity ? 'border-danger' : 'border-primary'}`}
                                />
                                {show && errorMassage.stockQuantity ? <p className="text-danger">{errorMassage.stockQuantity} </p> : null}
                            </div>

                            <div className="col-lg-4 col-md-6 mb-3">
                                <label>Pic</label>
                                <input type="file" name="pic" multiple onChange={getInputdata}
                                    className={`form-control ${show && errorMassage.pic ? 'border-danger' : 'border-primary'}`}
                                />
                                {show && errorMassage.pic ? errorMassage.pic?.split(".").map((err,index)=>{
                                  return <p className="text-danger" key={index}>{err}</p>
                                }) : null}
                            </div>
                            <div className="col-lg-4 col-md-6 mb-3">
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
export default AdminProductcreate