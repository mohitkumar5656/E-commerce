import { useEffect, useState } from "react"
import { getProduct } from "../Redux/ActionCreaters/ProductAction"
import { getTestimonial } from "../Redux/ActionCreaters/TestimonialAction"
import { getCart, createCart } from "../Redux/ActionCreaters/CartAction"
import { getWishlist, createWishlist } from "../Redux/ActionCreaters/WishlistAction"

import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import ProductSlider from "../component/ProductSlider"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import Testimonial from "../component/Testimonial"
const ProductPage = () => {
    const [selected, setselected] = useState({
        color: "",
        size: "",
        qty: 1
    })
    const { id } = useParams()
    const [data, setData] = useState({})

    const [reviewStats, setReviewStats] = useState({
        rating: 0,
        star: [0, 0, 0, 0, 0],
        total: 0
    })

    const [relatedProduct, setRelatedProduct] = useState([])
    const ProductStateData = useSelector(state => state.ProductStateData)
    const CartStateData = useSelector(state => state.CartStateData)

    const WishlistStateData = useSelector(state => state.WishlistStateData)
    let TestimonialStateData = useSelector(state => state.TestimonialStateData)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [show, setshow] = useState("Description")

    const sliderOptions = {
        loop: true,
        modules: [Autoplay, Pagination],
        autoplay: {
            delay: 2000,
            disableOnInteraction: false
        },
        pagination: {
            clickable: true
        }


    };


    const addToCart = () => {
        let item = CartStateData.find(x => x.user === localStorage.getItem("userid") && x.product === id)
        if (!item) {
            item = {
                user: localStorage.getItem("userid"),
                product: id,
                color: selected.color,
                size: selected.size,
                qty: selected.qty,
                total: selected.qty * data.finalPrice,


                // Remove following lines in case of Real Backend

                name: data.name,
                brand: data.brand,
                stockQuantity: data.stockQuantity,
                price: data.finalPrice,
                pic: data.pic[0]
            }
            dispatch(createCart(item))
        }
        navigate("/cart")
    }

    const addToWishlist = () => {
        let item = WishlistStateData.find(x => x.user === localStorage.getItem("userid") && x.product === id)
        if (!item) {
            item = {
                user: localStorage.getItem("userid"),
                product: id,


                // Remove following lines in case of Real Backend

                name: data.name,
                brand: data.brand,
                color: data.color,
                size: data.size,
                stockQuantity: data.stockQuantity,
                price: data.finalPrice,
                pic: data.pic[0]
            }
            dispatch(createWishlist(item))
        }
        navigate("/profile?option=wishlist")
    }

    useEffect(() => {
        (() => {
            dispatch(getProduct())
            if (ProductStateData.length) {
                const item = ProductStateData.find(x => x.id == id)
                if (item) {
                    setData(item)
                    setselected({
                        ...selected,
                        color: item.color[0],
                        size: item.size[0]
                    })
                    setRelatedProduct(ProductStateData.filter(x => x.maincategory === item.maincategory))
                }
                else
                    window.history.back()
            }
        })()
    }, [ProductStateData.length, id])

    useEffect(() => {
        (() => dispatch(getCart()))()
    }, [CartStateData.length])

    useEffect(() => {
        (() => dispatch(getWishlist()))()
    }, [WishlistStateData.length])

    useEffect(() => {
        (() => {
            dispatch(getTestimonial())
            if (TestimonialStateData.length) {
                let reviews = TestimonialStateData.filter(x => x.product === id)
                let total = 0
                let star = [0, 0, 0, 0, 0]
                reviews.forEach(x => {
                    total += x.star
                    star[x.star - 1] += 1
                })
                setReviewStats({
                    rating: (total / reviews.length).toFixed(1),
                    star: star,
                    total: reviews.length
                })
            }

        })()
    }, [TestimonialStateData.length, id])
    return (
        <div className="container my-3">
            <div className="row">
                <div className="col-md-6">
                    <Swiper {...sliderOptions}>

                        {
                            data?.pic?.map((item, index) => {
                                return <SwiperSlide key={index}>
                                    <img src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item}`} height={450} className="w-100" />
                                </SwiperSlide>
                            })
                        }
                    </Swiper>
                </div>
                <div className="col-md-6">
                    <h5 className="bg-primary text-center p-2 text-light">{data.name ?? ""}</h5>
                    <table className="table table-bordered">
                        <tbody>
                            <tr>
                                <th>Maincategory</th>
                                <td>{data.maincategory}</td>
                            </tr>

                            <tr>
                                <th>Subcategory</th>
                                <td>{data.subcategory}</td>
                            </tr>

                            <tr>
                                <th>Brand</th>
                                <td>{data.brand}</td>
                            </tr>

                            <tr>
                                <th>Color</th>
                                <td>{
                                    data?.color?.map((item, index) => {
                                        return <button key={index} onClick={() => setselected({ ...selected, color: item })} className={` btn ${selected.color === item ? 'btn btn-primary' : 'btn btn-light'}`}>{item}</button>

                                    })
                                }</td>
                            </tr>

                            <tr>
                                <th>Size</th>
                                <td>{
                                    data?.size?.map((item, index) => {
                                        return <button key={index} onClick={() => setselected({ ...selected, size: item })} className={` btn ${selected.size === item ? 'btn btn-primary' : 'btn btn-light'}`}>{item}</button>

                                    })
                                }</td>
                            </tr>
                            <tr>
                                <th>Price</th>
                                <td><del>&#8377;{data.basePrice}</del> &#8377;{data.finalPrice} <sup>{data.discount} % Off</sup> </td>
                            </tr>

                            <tr>
                                <th>Stock</th>
                                <td>{data.stock ? `${data.stockQuantity} Left in Stock ` : 'Out Of Stock'} </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    {
                                        data.stock ?
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className="btn-group w-100">
                                                        <button className="btn btn-primary" onClick={() => selected.qty > 1 ? setselected({ ...selected, qty: selected.qty - 1 }) : null}><i className="bi bi-dash"></i></button>
                                                        <h5 className="w-25 text-center">{selected.qty}</h5>
                                                        <button className="btn btn-primary" onClick={() => selected.qty < data.stockQuantity ? setselected({ ...selected, qty: selected.qty + 1 }) : null}><i className="bi bi-plus"></i></button>
                                                    </div>

                                                </div>
                                                <div className="col-md-8">
                                                    <div className="btn-group w-100">
                                                        <button className="btn btn-primary" onClick={addToCart}><i className="bi bi-cart-check"></i> Add to Cart</button>
                                                        <button className="btn btn-primary" onClick={addToWishlist}><i className="bi bi-heart"></i> Add to Wishlist</button>
                                                    </div>
                                                </div>
                                            </div> :
                                            <button className="btn btn-primary" onClick={addToWishlist}><i className="bi bi-heart"></i> Add to Wishlist</button>
                                    }
                                </td>
                            </tr>

                            {/* <tr>
                                <th>Description</th>
                                <td>
                                    <div
                                        dangerouslySetInnerHTML={{ __html: data.description }}
                                    />
                                </td>
                            </tr> */}

                        </tbody>

                    </table>
                </div>

            </div>
            <ul className="nav nav-tabs mt-3">
                <li className="nav-item">
                    <button className={`btn ${show === "Description" ? "btn-primary" : "btn-light"}`} onClick={() => setshow("Description")}>Description</button>
                </li>
                <li className="nav-item">
                    <button className={`btn ${show === "Review" ? "btn-primary" : "btn-light"}`} onClick={() => setshow("Review")} >  Review</button>
                </li>

            </ul>
            <div className={`${show === "Description" ? 'd-block' : 'd-none'}`}>
                <div className="cart p-4" dangerouslySetInnerHTML={{ __html: data.description }} />
            </div>

            <div className={`${show === "Review" ? 'd-block' : 'd-none'}`}>
                <div className="row">
                    <div className="col-md-4">

                        <div className="card p-2 text-center mt-2">
                            <h4>Rating</h4>
                            <h3>{reviewStats.rating}/5</h3>
                            <h5>Total Reviews : {reviewStats.total}</h5>
                        </div>
                    </div>
                    <div className="col-md-8">
                     <div className="row">
                          <div className="col-3">5 Star ({reviewStats.star[4]})</div>
                       <div className="col-9">
                         <div className="progress">
                            <div className="progress-bar bg-primary" role="progressbar" style={{width: `${(reviewStats.star[4] / reviewStats.total)*100}%`}} >
                            {((reviewStats.star[4] / reviewStats.total)*100).toFixed(0)}%
                            </div>
                        </div>
                       </div>
                    </div>

                      <div className="row">
                          <div className="col-3">4 Star ({reviewStats.star[3]})</div>
                       <div className="col-9">
                         <div className="progress">
                            <div className="progress-bar bg-success" role="progressbar" style={{width: `${(reviewStats.star[3] / reviewStats.total)*100}%`}} >
                            {((reviewStats.star[3] / reviewStats.total)*100).toFixed(0)}%
                            </div>
                        </div>
                       </div>
                    </div>

                      <div className="row">
                          <div className="col-3">3 Star ({reviewStats.star[2]})</div>
                       <div className="col-9">
                         <div className="progress">
                            <div className="progress-bar bg-info" role="progressbar" style={{width: `${(reviewStats.star[2] / reviewStats.total)*100}%`}} >
                            {((reviewStats.star[2] / reviewStats.total)*100).toFixed(0)}%
                            </div>
                        </div>
                       </div>
                    </div>

                      <div className="row">
                          <div className="col-3">2 Star ({reviewStats.star[1]})</div>
                       <div className="col-9">
                         <div className="progress">
                            <div className="progress-bar bg-warning " role="progressbar" style={{width: `${(reviewStats.star[1] / reviewStats.total)*100}%`}} >
                            {((reviewStats.star[1] / reviewStats.total)*100).toFixed(0)}%
                            </div>
                        </div>
                       </div>
                    </div>

                      <div className="row">
                          <div className="col-3">1 Star ({reviewStats.star[0]})</div>
                       <div className="col-9">
                         <div className="progress">
                            <div className="progress-bar bg-danger" role="progressbar" style={{width: `${(reviewStats.star[0] / reviewStats.total)*100}%`}} >
                            {((reviewStats.star[0] / reviewStats.total)*100).toFixed(0)}%
                            </div>
                        </div>
                       </div>
                    </div>
                     </div>
                </div>
                {/* <div className="cart p-4" /> */}
                <Testimonial pid={data.id} />
            </div>
            <div className="mt-3">

                <ProductSlider maincategory="Related Products" data={relatedProduct} />
            </div>

        </div>

    )
}
export default ProductPage