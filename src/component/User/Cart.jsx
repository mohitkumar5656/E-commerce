
import { useEffect, useState } from "react"

import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import { getCart, deleteCart } from "../../Redux/ActionCreaters/CartAction"
import { getProduct, updateProduct } from "../../Redux/ActionCreaters/ProductAction"
import { createCheckout } from "../../Redux/ActionCreaters/CheckoutAction"

const Cart = ({ title , selected }) => {

    const [data, setData] = useState([])
    const [subTotal, setSubTotal] = useState(0)
    const [total, setTotal] = useState(0)
    const [shipping, setShipping] = useState(0)

    const CartStateData = useSelector(state => state.CartStateData)
    const ProductStateData = useSelector(state => state.ProductStateData)
    const dispatch = useDispatch()
    let navigate = useNavigate()



    const deleteRecord = (id) => {
        if (window.confirm("You Sure Delete to This Record")) {
            dispatch(deleteCart({ id }))
            setData(data.filter(x => x.id !== id))
        }
    }

    const updateRecord = (id, option) => {
        let item = data.find(x => x.id === id)
        let index = data.findIndex(x => x.id === id)
        

        if ((option === "Dec" && item.qty === 1) || (option === "Inc" && item.qty === item.stockQuantity))
            return
        else if (option === "Dec") {
            item['qty'] = item['qty'] - 1
            item['total'] = item['total'] - item['price']
        }
        else {
            item['qty'] = item['qty'] + 1
            item['total'] = item['total'] + item['price']
        }
        data[index] ={...item}
        calculate(data)
    }


    const placeOrder = ()=>{
         let item = {
            user: localStorage.getItem("userid"),
            orderStatus: "Order Has Been Placed",
            paymentMode : selected.paymentMode,
            paymentStatus : "Pending",
            delivaryAddress: selected.delivaryAddress,
            subTotal : subTotal,
            shipping : shipping,
            total : total,
            date : new Date(),
            products : data
         }
         dispatch(createCheckout(item))

         data.forEach(x=>{
            let product = ProductStateData.find(p=>p.id === x.product)
            product.stockQuantity = product.stockQuantity-x.qty
            product.stock = product.stockQuantity === 0?false:true
            dispatch(updateProduct({...product}))

            dispatch(deleteCart({id:x.id}))

         })
         navigate("/order-confirmation")
    }

    const calculate = (data) => {
        let sum = 0
        data.forEach(x => sum = sum + x.total)
        if (sum > 0 && sum < 1000) {
            setShipping(100)
            setTotal(sum + 100)

        }
        else {
            setShipping(0)
            setTotal(sum)
        }
        setSubTotal(sum)
    }
    useEffect(() => {
        (() => {
            dispatch(getCart())
            if (CartStateData.length) {

                let data = (CartStateData.filter(x => x.user === localStorage.getItem("userid")))
                setData(data)
                calculate(data)
            }
        })()
    }, [CartStateData.length])

    useEffect(() => {
        (() => {
            dispatch(getProduct())
           
        })()
    }, [ProductStateData.length])
    return (
        <>
            {
                data.length ?
                    <>
                        <div className="table-responsive">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        {title === "Cart" ? <th></th> : null}
                                        <th>Name</th>
                                        {title === "Cart" ? <th>Brand</th> : null}
                                        <th>Color</th>
                                        <th>Size</th>
                                        <th>Price</th>

                                        <th>Qty</th>
                                        <th>Total</th>
                                        {title === "Cart" ? <th></th> : null}
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((item) => {
                                            return <tr key={item.id}>

                                                {title === "Cart" ? <th>
                                                    <Link to={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.pic}`} target="_blank" rel="noreferrer">
                                                        <img src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.pic}`} height={50} width={80} />
                                                        <small className="d-block">({`${item.stockQuantity} Left In Stock`})</small>
                                                    </Link>

                                                </th> : null}
                                                <th>{item.name}</th>

                                                {title === "Cart" ? <th>{item.brand}</th> : null}
                                                <th>{item.color}</th>
                                                <th>{item.size}</th>
                                                <th>&#8377;{item.price}</th>

                                                {title === "Cart" ? <th>
                                                    <div className="btn-group " style={{ width: 150 }}>
                                                        <button className="btn btn-primary" onClick={()=>updateRecord(item.id,"Dec")}><i className="bi bi-dash"></i></button>
                                                        <h5 className="w-25 text-center">{item.qty}</h5>
                                                        <button className="btn btn-primary" onClick={()=>updateRecord(item.id,"Inc")}><i className="bi bi-plus"></i></button>
                                                    </div>
                                                </th> : <th>{item.qty}</th>}
                                                <th>&#8377;{item.total}</th>
                                                {title === "Cart" ? <th><button className="btn btn-danger" onClick={() => deleteRecord(item.id)}><i className="bi bi-trash"></i></button></th> : null}
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="row">
                            <div className="col-lg-6"></div>
                            <div className={`${title === " Cart" ? 'col-lg-6' : 'col-12'}`}>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Subtotal Amount</th>
                                            <td>&#8377; {subTotal}</td>
                                        </tr>

                                        <tr>
                                            <th>Shipping Amount</th>
                                            <td>&#8377; {shipping}</td>
                                        </tr>

                                        <tr>
                                            <th>Total Amount</th>
                                            <td>&#8377; {total}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan={2}>
                                                {
                                                    title === "Cart" ?
                                                        <Link to='/checkout' className="btn btn-primary w-100">Proceed To Checkout</Link> :
                                                        <button className="btn btn-primary w-100" onClick={placeOrder }>Place Order</button>
                                                }
                                            </td>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </>
                    :

                    <div className="text-center card p-5">
                        <h3>OOPS</h3>
                        <h3>No Item In Cart</h3>
                        <Link to="/shop" className="btn btn-primary w-25 m-auto">Shop Now</Link>
                    </div>
            }
        </>
    )
}
export default Cart