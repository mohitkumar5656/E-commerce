import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Autoplay } from "swiper/modules";
import SingleProduct from "./SingleProduct";
const ProductSlider = ({ maincategory, data }) => {

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
    return (
        <>
            <div className="container-fluid py-5">
                <div className="container">
                    <div className="text-center mx-auto mb-5" style={{ maxWidth: "500px" }}>
                        <h5 className="d-inline-block text-primary text-uppercase border-bottom border-5">{maincategory!=="Related Products" ? `${maincategory} Products` : `Our Other ${maincategory}`}</h5>
                        {
                            maincategory === "Related Products" ? null : <h1>Checkout Our Awesome Product for {maincategory}</h1>
                        }
                    </div>
                    <Swiper {...sliderOptions}>
                        <div className=" price-carousel position-relative" style={{ padding: "0 45px 45px 45px" }}>
                            {
                                data.map((item) => {
                                    return <SwiperSlide key={item.id}>
                                        <SingleProduct item={item} />
                                    </SwiperSlide>

                                })
                            }
                        </div>
                    </Swiper>
                </div>
            </div>
        </>
    )
}
export default ProductSlider