import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSetting } from "../Redux/ActionCreaters/SettingAction"
import { useDispatch, useSelector } from "react-redux";
const About = () => {
    const [settingData, setsettingData] = useState({
        siteName: import.meta.env.VITE_APP_SITE_NAME,
        facebook: import.meta.env.VITE_APP_FACEBOOK,
        twitter: import.meta.env.VITE_APP_TWITTER,
        linkedin: import.meta.env.VITE_APP_LINKEDIN,
        instagram: import.meta.env.VITE_APP_INSTAGRAM,
        youtube: import.meta.env.VITE_APP_YOUTUBE,
    })
    let SettingStateData = useSelector(state => state.SettingStateData)
    let dispatch = useDispatch()

    useEffect(() => {
        (() => {
            dispatch(getSetting())
            if (SettingStateData.length) {
                let item = SettingStateData[0]
                setsettingData({
                    siteName: item.siteName ? item.siteName : settingData.siteName,
                    facebook: item.facebook ? item.facebook : settingData.facebook,
                    twitter: item.twitter ? item.twitter : settingData.twitter,
                    linkedin: item.linkedin ? item.linkedin : settingData.linkedin,
                    instagram: item.instagram ? item.instagram : settingData.instagram,
                    youtube: item.youtube ? item.youtube : settingData.youtube,

                })
            }
        })()
    }, [SettingStateData.length])

    return (
        <>
            <div className="container-fluid py-5">
                <div className="container">
                    <div className="row gx-5">
                        <div className="col-lg-5 mb-5 mb-lg-0" style={{ minHeight: "500px" }}>
                            <div className="position-relative h-100">
                                <img className="position-absolute w-100 h-100 rounded" src="/Image/p1.jpg"
                                    style={{ objectFit: "cover" }} />
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="mb-4">
                                <h5 className="d-inline-block text-primary text-uppercase border-bottom border-5">About Us</h5>
                                <h1>Fast, Safe, and Reliable Delivery You Can Trust Every Time</h1>
                            </div>
                            <p>At {settingData.siteName}, we provide fast and secure delivery services to ensure your order reaches you on time and in perfect condition. We work with trusted delivery partners so that every package is handled with care. As soon as your order is confirmed, we begin processing it and provide you with tracking details for complete transparency. Our goal is simple — quick dispatch, on-time delivery, and total customer satisfaction.</p>
                            <div className="row g-3 pt-3">
                                <div className="col-sm-3 col-6">
                                    <div className="bg-light text-center rounded-circle py-4">
                                        <i className="bo bi-patch-check fs-1 text-primary mb-3"></i>
                                        <h6 className="mb-0">100%<small className="d-block text-primary">Genuine products</small></h6>
                                    </div>
                                </div>
                                <div className="col-sm-3 col-6">
                                    <div className="bg-light text-center rounded-circle py-4">
                                        <i className="bo bi-headset fs-1 text-primary mb-3"></i>
                                        <h6 className="mb-0">24/7<small className="d-block text-primary">Customer support</small></h6>
                                    </div>
                                </div>
                                <div className="col-sm-3 col-6">
                                    <div className="bg-light text-center rounded-circle py-4">
                                        <i className="bo bi-people fs-1 text-primary mb-3"></i>
                                        <h6 className="mb-0">10000+<small className="d-block text-primary">Happy customer</small></h6>
                                    </div>
                                </div>
                                <div className="col-sm-3 col-6">
                                    <div className="bg-light text-center rounded-circle py-4">
                                        <i className="bo bi-arrow-repeat fs-1 text-primary mb-3"></i>
                                        <h6 className="mb-0">7 day<small className="d-block text-primary">Refund policy</small></h6>
                                    </div>
                                </div>
                            </div>
                               <div className="card d-flex p-5 justift-content-center align-items-center">
                                 <div className="d-inline-flex align-items-center">
                                    <Link className="text-body px-2" to={setsettingData.facebook}><i className=" fs-4 mx-2 fab fa-facebook-f"></i></Link>
                                    <Link className="text-body px-2" to={setsettingData.twitter}><i className=" fs-4 mx-2 fab fa-twitter"></i></Link>
                                    <Link className="text-body px-2" to={setsettingData.linkedin}><i className=" fs-4 mx-2 fab fa-linkedin-in"></i></Link>
                                    <Link className="text-body px-2" to={setsettingData.instagram}><i className=" fs-4 mx-2 fab fa-instagram"></i></Link>
                                    <Link className="text-body px-2" to={setsettingData.youtube}><i className=" fs-4 mx-2 fab fa-youtube"></i></Link>
                                </div>
                               </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default About