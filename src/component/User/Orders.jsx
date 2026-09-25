import { useEffect, useState } from "react"
import { ToastContainer, toast } from "react-toastify";
import { getCheckout } from "../../Redux/ActionCreaters/CheckoutAction"
import { getTestimonial, createTestimonial, updateTestimonial } from "../../Redux/ActionCreaters/TestimonialAction"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"


const dataOption = {
    message: '',
    star: 5
}

const Orders = () => {

    const [orders, setOrders] = useState([])
    const [reviews, setReviews] = useState([])

    const [option, setOption] = useState("create")
    const [showModal, setShowModal] = useState(false)

    const [data, setData] = useState(dataOption)
    // const [show , setShow] = useState()  

    const CheckoutStateData = useSelector(state => state.CheckoutStateData)
    const TestimonialStateData = useSelector(state => state.TestimonialStateData)
    const dispatch = useDispatch()


    const setCreateOptions = (pid, name) => {
        setShowModal(true)
        setOption("create")
        setData({
            ...dataOption,
            user: localStorage.getItem("userid"),
            userName: localStorage.getItem("name"),
            product: pid,
            pname: name
        })

    }

    const setUpdateOptions = (pid) => {
        setShowModal(true)
        setOption("Update")
        let item = reviews.find(x => x.product === pid)
        setData({ ...data, ...item })

    }

    const getInputData = (e) => {
        let name = e.target.name
        let value = name === "star" ? parseInt(e.target.value) : e.target.value
        // let {name ,value} = e.target           In case real backend
        setData({ ...data, [name]: value })
    }

    const postData = (e) => {
        e.preventDefault()
        if (option === "create") {
            dispatch(createTestimonial({ ...data, date: new Date() }))
            setData({ ...dataOption })
            setShowModal(false)
            toast("Your Review Has Been Submitted")
            setReviews([...reviews, data])
        }
        else {
            let index = reviews.findIndex(x => x.id === data.id)
            reviews[index] = { ...data }
            setReviews(reviews)
            dispatch(updateTestimonial({ ...data, date: new Date() }))
            setData({ ...dataOption })
            setShowModal(false)
            toast("Your Review Has Been Updated")

        }
    }

    useEffect(() => {
        (() => {
            dispatch(getCheckout())
            if (CheckoutStateData.length) {
                setOrders(CheckoutStateData.filter(x => x.user === localStorage.getItem("userid")))
            }
        })()
    }, [CheckoutStateData.length])

    useEffect(() => {
        (() => {
            dispatch(getTestimonial())
            if (TestimonialStateData.length) {
                setReviews(TestimonialStateData.filter(x => x.user === localStorage.getItem("userid")))
            }
            // console.log(TestimonialStateData)
        })()
    }, [TestimonialStateData.length])
    return (
        <>

            {
                orders.length ?
                    orders.map((item) => {
                        return <div key={item.id} className="mb-3 border-bottom border-primary border-3">
                            <div className="table-responsive ">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Order Id</th>

                                            <th>Order Status</th>
                                            <th>Payment Mode</th>
                                            <th>Payment Status</th>
                                            <th>Subtotal</th>
                                            <th>Shipping</th>
                                            <th>Total</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <td>{item.id}</td>

                                            <td>{item.orderStatus}</td>
                                            <td>{item.paymentMode}</td>
                                            <td>{item.paymentStatus}</td>
                                            <td>&#8377; {item.subTotal}</td>
                                            <td>{item.shipping}</td>
                                            <td>&#8377; {item.total}</td>
                                            <td>{new Date(item.date).toDateString()}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <h5 className=" text-center p-2 border border-primary">Product In This Order</h5>
                            <div className="table-responsive">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Name</th>
                                            <th>Brand</th>
                                            <th>Color</th>
                                            <th>Size</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Total</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {item.products?.map((p, index) => {
                                            return <tr key={index}>
                                                <td>
                                                    <Link to={`${import.meta.env.VITE_APP_IMAGE_SERVER}${p.pic}`} target="_blank" rel="noreferrer"></Link>
                                                    <img src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${p.pic}`} height={80} width={80} />
                                                </td>
                                                <td>{p.name}</td>
                                                <td>{p.brand}</td>
                                                <td>{p.color}</td>
                                                <td>{p.size}</td>
                                                <td>&#8377; {p.price}</td>
                                                <td>{p.qty}</td>
                                                <td>&#8377; {p.total}</td>
                                                <td> <Link to={`/product/${p.product}`} className="btn btn-primary"> Buy Again</Link></td>
                                                <td>
                                                    {item.orderStatus === "Delivered" ? reviews.find(x=>x.product === p.product) ?  <button className="btn btn-success" onClick={() => setUpdateOptions(p.product)}>Update Review</button>: <button className="btn btn-primary" onClick={() => setCreateOptions(p.product, p.name)}>Write Review</button>: null}
                                                </td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    }) :
                    <div className="text-center card p-5">
                        No Order History Found
                        <Link to="/shop" className="btn btn-primary w-25 m-auto">Shop Now</Link>
                    </div>
            }
            <div className={`modal fade  ${showModal ? 'show d-block' : 'd-none'}`} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="false" aria-modal="true">
                <div className="modal-dialog " style={{ minWidth: "50vw" }}>
                    <form onSubmit={postData}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">{option} Review</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>

                            <div className=" col-12 mb-3 p-2">
                                <label>Message</label>
                                <textarea name="message" placeholder="Write Your Review Here.." required onChange={getInputData} value={data.message} className={`form-control 'border-primary'}`} rows={4}></textarea>

                            </div>
                            <div className="col-md-6 p-2">
                                <label>Star</label>
                                <select name="star" onChange={getInputData} value={data.star} className="form-select border-primary ">
                                    <option>5</option>
                                    <option>4</option>
                                    <option>3</option>
                                    <option>2</option>
                                    <option>1</option>
                                </select>
                            </div>

                            <div className="modal-footer">

                                <button type="submit" className="btn btn-primary">{option}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}
export default Orders