import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react"
import DataTable from 'datatables.net-dt';
import 'datatables.net-dt/css/DataTables.DataTables.min.css'

import AdminSidebar from "../../../component/Admin/AdminSidebar"
import { getProduct, deleteProduct } from "../../../Redux/ActionCreaters/ProductAction"


const AdminProduct = () => {
    const [data, setData] = useState([])

    const ProductStateData = useSelector(state => state.ProductStateData)
    const dispatch = useDispatch()

    const deleteRecord = (id) => {
        if (window.confirm("You Sure Delete to This Record")) {
            dispatch(deleteProduct({ id }))
            setData(data.filter(x => x.id !== id))
        }
    }

    //  Component mount hone par data fetch karo
    useEffect(() => {
        dispatch(getProduct())
    }, [])

    // Redux state change hone par local state update karo
    useEffect(() => {
        if (ProductStateData && ProductStateData.length > 0) {
            setData(ProductStateData)

            // DataTable initialize karo
            const timer = setTimeout(() => {
                new DataTable('#myTable')
            }, 100)
            return () => clearTimeout(timer)
        }
    }, [ProductStateData])

    return (
        <div className="container-fluid my-4">
            <div className="row">
                <div className="col-lg-3">
                    <AdminSidebar />
                </div>
                <div className="col-lg-9">
                    <h5 className="bg-primary text-center p-2 text-light">
                        Product
                        <Link to="/admin/product/create">
                            <i className="bi bi-plus text-light fs-5 float-end"></i>
                        </Link>
                    </h5>
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped" id="myTable">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Maincatecory</th>
                                    <th>Subcategory</th>
                                    <th>Brand</th>
                                    <th>Color</th>
                                    <th>Size</th>
                                    <th>Base Price </th>
                                    <th>Discount</th>
                                    <th>Final Price</th>
                                    <th>Stock</th>
                                    <th>Stock Quantity</th>
                                    <th>Pic</th>
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
                                        <td>{item.maincategory}</td>
                                        <td>{item.subcategory}</td>
                                        <td>{item.brand}</td>
                                        <td>{item.color.join()}</td>
                                        <td>{item.size.join()}</td>
                                        <td>&#8377;{item.basePrice}</td>
                                        <td>{item.discount}% off</td>
                                        <td>&#8377;{item.finalPrice}</td>
                                        <td>{item.stock ? "In stock" : "Out of stock"}</td>
                                        <td>{item.stockQuantity}</td>
                                        <td>
                                            <div  style={{width:300}}>
                                            {
                                                item.pic?.map((p, index) => {
                                                    return < Link key={index} className="mx-2 mb-2" to={`${import.meta.env.VITE_APP_IMAGE_SERVER}${p}`} target="_blank" rel="noreferrer">
                                                        <img src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${p}`} height={60} width={60} />
                                                    </Link>
                                                })
                                            }
                                            </div>
                                        </td>
                                        <td>{item.status ? 'Active' : 'Inactive'}</td>
                                        <td>
                                            <Link to={`/admin/product/update/${item.id}`} className="btn btn-primary">
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

export default AdminProduct
