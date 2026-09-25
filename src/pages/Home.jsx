import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css/pagination";


import About from "../component/About"
import Featurs from "../component/Featurs"
import Products from "../component/Products"
import ProductSlider from "../component/ProductSlider"
import Testimonial from "../component/Testimonial"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getSetting } from "../Redux/ActionCreaters/SettingAction"
import { getProduct } from "../Redux/ActionCreaters/ProductAction"
import { getMaincategory } from "../Redux/ActionCreaters/MaincategoryAction"
import { useDispatch, useSelector } from "react-redux";
const Home = () => {
    const [settingData, setsettingData] = useState({
        siteName: import.meta.env.VITE_APP_SITE_NAME,

    })
    let SettingStateData = useSelector(state => state.SettingStateData)
    let ProductStateData = useSelector(state => state.ProductStateData)
    let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)
    let dispatch = useDispatch()



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

   

    useEffect(() => {
        (() => {
            dispatch(getSetting())
            if (SettingStateData.length) {
                let item = SettingStateData[0]
                setsettingData({
                    siteName: item.siteName ? item.siteName : settingData.siteName,

                })
            }
        })()
    }, [SettingStateData.length])

    useEffect(() => {
        (() => dispatch(getProduct()))()
    }, [ProductStateData])

    useEffect(() => {
        (() => dispatch(getMaincategory()))()
    }, [MaincategoryStateData])

    return (
        <>
            <Swiper {...sliderOptions} className="mySwiper">
                <SwiperSlide>
                    <div className=" mb-5 ">
                        <img src="/Image/slide1.jfif  " className="my-banner-image" alt="" />
                        <div className="container py-5">
                            <div className="row justify-content-start">
                                <div className="col-lg-8 text-center text-lg-start">
                                    <h5 className="d-inline-block text-dark text-uppercase border-bottom border-5"
                                        style={{ borderColor: "rgba(256, 256, 256, .3) !important" }}>Welcome To {settingData.siteName} </h5>
                                    <h1 className="display-1 text-dark mb-md-4">“Everyday Wear for the Whole Family”</h1>
                                    <div className="pt-2">
                                        <Link to="/shop?mc=male" className="btn btn-dark rounded-pill py-md-3 px-md-5 mx-2">Shop Now</Link>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className=" mb-5 ">
                        <img src="/Image/slide2.jfif  " className="my-banner-image" alt="" />
                        <div className="container py-5">
                            <div className="row justify-content-start">
                                <div className="col-lg-8 text-center text-lg-start">
                                    <h5 className="d-inline-block text-dark text-uppercase border-bottom border-5"
                                        style={{ borderColor: "rgba(256, 256, 256, .3) !important" }}>Welcome To {settingData.siteName} </h5>
                                    <h1 className="display-1 text-dark mb-md-4">“Everyday Wear for the Whole Family”</h1>
                                    <div className="pt-2">
                                        <Link to="/shop?mc=male" className="btn btn-dark rounded-pill py-md-3 px-md-5 mx-2">Shop Now</Link>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className=" mb-5 ">
                        <img src="/Image/slide1.jfif  " className="my-banner-image" alt="" />
                        <div className="container py-5">
                            <div className="row justify-content-start">
                                <div className="col-lg-8 text-center text-lg-start">
                                    <h5 className="d-inline-block text-dark text-uppercase border-bottom border-5"
                                        style={{ borderColor: "rgba(256, 256, 256, .3) !important" }}>Welcome To {settingData.siteName} </h5>
                                    <h1 className="display-1 text-dark mb-md-4">“Style for Men, Women & Kids”</h1>
                                    <div className="pt-2">
                                        <Link to="/shop?mc=female" className="btn btn-dark rounded-pill py-md-3 px-md-5 mx-2">Shop Now</Link>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className=" mb-5 ">
                        <img src="/Image/slide4.jfif  " className="my-banner-image" alt="" />
                        <div className="container py-5">
                            <div className="row justify-content-start">
                                <div className="col-lg-8 text-center text-lg-start">
                                    <h5 className="d-inline-block text-dark text-uppercase border-bottom border-5"
                                        style={{ borderColor: "rgba(256, 256, 256, .3) !important" }}>Welcome To {settingData.siteName} </h5>
                                    <h1 className="display-1 text-dark mb-md-4">“Everyday Wear for the Whole Family”</h1>
                                    <div className="pt-2">
                                        <Link to="/shop?mc=male" className="btn btn-dark rounded-pill py-md-3 px-md-5 mx-2">Shop Now</Link>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

            </Swiper>
            <About />
            {
                MaincategoryStateData.filter(x => x.status).map((item) => {
                    const data = ProductStateData.filter(x => x.maincategory === item.name)
                    if (data.length)
                        return <ProductSlider key={item.id} maincategory={item.name} data={data} />
                })
            }
            <Featurs />
             <Products maincategory={MaincategoryStateData.filter(x=>x.status)} data={ProductStateData.filter(x=>x.status)} />
            <Testimonial />

        </>
    )
}
export default Home