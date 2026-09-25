import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css/pagination";
import { getTestimonial } from "../Redux/ActionCreaters/TestimonialAction"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";


const Testimonial = ({ pid }) => {

    let TestimonialStateData = useSelector(state => state.TestimonialStateData)
    let dispatch = useDispatch()

    const sliderOptions = {


        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 0,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
        },
        loop: true,
        modules: [Autoplay],
        autoplay: {
            delay: 2000,
            disableOnInteraction: false
        },
    };

    const getStar = (star) => {
        if (star === 5)
            return (
                <>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                </>
            )

        else if (star === 4)
            return (
                <>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star text-warning"></i>
                </>
            )

        else if (star === 3)
            return (
                <>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star text-warning"></i>
                    <i className="bi bi-star text-warning"></i>
                </>
            )

        else if (star === 2)
            return (
                <>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star text-warning"></i>
                    <i className="bi bi-star text-warning"></i>
                    <i className="bi bi-star text-warning"></i>
                </>
            )

        else
            return (
                <>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star text-warning"></i>
                    <i className="bi bi-star text-warning"></i>
                    <i className="bi bi-star text-warning"></i>
                    <i className="bi bi-star text-warning"></i>
                </>
            )
    }

    useEffect(() => {
        (() => {
            dispatch(getTestimonial())

        })()
    }, [TestimonialStateData.length])

    return (
        <>
            <div className="container-fluid py-5">
                <div className="container">
                    {pid === undefined ?
                    <div className="text-center mx-auto mb-5">
                        <h5 className="d-inline-block text-primary text-uppercase border-bottom border-5">Reviews</h5>
                        <h1>Our Happy Customers</h1>
                        <p> We are has completely transformed my shopping experience. The quality of products is consistently excellent, and the prices are very reasonable. Delivery is always on time, and customer support is helpful and responsive. I trust Apni Shop for all my daily needs and highly recommend it to everyone looking for convenience</p>
                    </div>:null}
                    <div className="row justify-content-center">
                        <div className="col-12">
                            <Swiper {...sliderOptions} className="mySwiper">
                                <div className=" testimonial-carousel">
                                    {TestimonialStateData.filter(x => {
                                        if (pid) {
                                            return x.product === pid; // product ke reviews dikhao, star koi bhi ho
                                        } else {
                                            return x.star >= 2; // default me 2,3,4,5 star show honge
                                        }
                                    }).map(x => {
                                        return <SwiperSlide key={x.id}>
                                            <div className="testimonial-item text-center">

                                                <div className="position-relative mb-3">
                                                    <Link className="fs-5" to={`/product/${x.product}`}>{x.pname}</Link>
                                                    <div className="text-center">
                                                        {getStar(x.star)}
                                                    </div>
                                                </div>
                                                <p className=" testimonial-message">{x.message}</p>
                                                <hr className="w-25 mx-auto" />
                                                <h5>{x.userName}</h5>

                                            </div>
                                        </SwiperSlide>
                                    })}


                                </div>
                            </Swiper>

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
export default Testimonial