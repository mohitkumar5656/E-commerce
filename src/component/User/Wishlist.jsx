
import { useEffect, useState } from "react"
import { getWishlist, deleteWishlist } from "../../Redux/ActionCreaters/WishlistAction"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

const Wishlist = () => {

    const [data, setData] = useState([])

    const WishlistStateData = useSelector(state => state.WishlistStateData)
    const dispatch = useDispatch()


    
        const deleteRecord = (id) => {
            if (window.confirm("You Sure Delete to This Record")) {
                dispatch(deleteWishlist({ id }))
                setData(data.filter(x => x.id !== id))
            }
        }

    useEffect(() => {
        (() => {
            dispatch(getWishlist())
            if (WishlistStateData.length) {
                setData(WishlistStateData.filter(x => x.user === localStorage.getItem("userid")))
            }
        })()
    }, [WishlistStateData.length])
    return (
        <>
            {
                data.length ?
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
                                    
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((item) => {
                                        return <tr key={item.id}>
                                            <th>
                                                <Link to={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.pic}`} target="_blank" rel="noreferrer">
                                                    <img src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.pic}`} height={50} width={80} />
                                                    <small className="d-block text-center">({`${item.stockQuantity} Left In Stock`})</small>
                                                </Link>
                                                 
                                            </th>
                                            <th>{item.name}</th>
                                            <th>{item.brand}</th>
                                            <th>{item.color?.join()}</th>
                                            <th>{item.size?.join()}</th>
                                            <th>&#8377;{item.price}</th>
                                           
                                            <th><Link to={`/product/${item.product}`} className="btn btn-primary"><i className="bi bi-cart-check"></i></Link></th>
                                            <th><button className="btn btn-danger" onClick={()=>deleteRecord(item.id)}><i className="bi bi-trash"></i></button></th>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    :

                    <div className="text-center card p-5">
                        <h3>OOPS</h3>
                        <h3>No Item In Wishlist</h3>
                        <Link to="/shop" className="btn btn-primary w-25 m-auto">Shop Now</Link>
                    </div>
            }
        </>
    )
}
export default Wishlist