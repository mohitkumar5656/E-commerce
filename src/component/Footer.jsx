import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getSetting } from "../Redux/ActionCreaters/SettingAction"
import { getNewsletter , createNewsletter} from "../Redux/ActionCreaters/NewsletterAction"

import { useDispatch, useSelector } from "react-redux";
const Footer = () => {

    const [settingData, setsettingData] = useState({
        siteName: import.meta.env.VITE_APP_SITE_NAME,
        address: import.meta.env.VITE_APP_ADDRESS,
        map1: import.meta.env.VITE_APP_MAP1,
        email: import.meta.env.VITE_APP_EMAIL,
        phone: import.meta.env.VITE_APP_PHONE,
        whatsapp: import.meta.env.VITE_APP_WHATSAPP,
        facebook: import.meta.env.VITE_APP_FACEBOOK,
        twitter: import.meta.env.VITE_APP_TWITTER,
        linkedin: import.meta.env.VITE_APP_LINKEDIN,
        instagram: import.meta.env.VITE_APP_INSTAGRAM,
        youtube: import.meta.env.VITE_APP_YOUTUBE,

    })

     const [email , setEmail] = useState("")
    const [message , setMessage] = useState("")

    let SettingStateData = useSelector(state => state.SettingStateData)
    let NewsletterStateData = useSelector(state => state.NewsletterStateData)
    let dispatch = useDispatch()

    const postData = (e)=>{
        e.preventDefault()
     if(email === "" || email.length<13)
        setMessage("Please Enter The Valid Email Address")
    else{
        let item = NewsletterStateData.find(x=>x.email===email)
        if(item)
            setMessage("This Email Address Is Already Registered")
        else{
            dispatch(createNewsletter({email:email,status:true}))

            setMessage("Thanks to Subscribe Our Newsletter Services")
            setEmail("")
        }
    }
    }

   

    useEffect(() => {
        (() => {
            dispatch(getSetting())
            if (SettingStateData.length) {
                let item = SettingStateData[0]
                setsettingData({
                    siteName: item.siteName ? item.siteName : settingData.siteName,
                    address: item.address ? item.address : settingData.address,
                    map1: item.map1 ? item.map1 : settingData.map1,
                    email: item.email ? item.email : settingData.email,
                    phone: item.phone ? item.phone : settingData.phone,
                    whatsapp: item.whatsapp ? item.whatsapp : settingData.whatsapp,
                    facebook: item.facebook ? item.facebook : settingData.facebook,
                    twitter: item.twitter ? item.twitter : settingData.twitter,
                    linkedin: item.linkedin ? item.linkedin : settingData.linkedin,
                    instagram: item.instagram ? item.instagram : settingData.instagram,
                    youtube: item.youtube ? item.youtube : settingData.youtube,

                })
            }
        })()
    }, [SettingStateData.length])

    useEffect(()=>{
        (()=>{
            dispatch(getNewsletter())
        })()
    },[NewsletterStateData.length])

    return (
        <>
            <div className="container-fluid bg-dark text-light mt-5 py-5">
                <div className="container py-5">
                    <div className="row g-5">
                        <div className="col-lg-4 col-md-6">
                            <Link to="/" className=" fs-4 d-inline-block text-primary text-uppercase border-bottom border-5 border-secondary mb-4">
                                <i className="bi bi-bag-check me-2"></i>  {settingData.siteName} </Link>
                            <p className="mb-4 text-justify">ApniShop is your trusted online shopping destination, offering quality products at affordable prices.
                                We focus on customer satisfaction, fast delivery, and a smooth shopping experience. </p>
                            <Link to={settingData.map1} target="_blank" className="d-block text-light mb-3"><i className="bi bi-geo-alt text-primary me-3"></i>{settingData.address}</Link>
                            <Link to={`mailto:${settingData.email}`} target="_blank" className="d-block text-light mb-3"><i className="bi bi-envelope text-primary me-3"></i>{settingData.email}</Link>
                            <Link to={`tel:${settingData.phone}`} target="_blank" className="d-block text-light mb-4"><i className="bi bi-telephone text-primary me-3"></i>{settingData.phone}</Link>
                            <Link to={`https://wa.me/${settingData.whatsapp}`} target="_blank" className="d-block text-light mb-0"><i className="bi bi-whatsapp text-primary me-3"></i>{settingData.whatsapp}</Link>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <h4 className="d-inline-block text-primary text-uppercase border-bottom border-5 border-secondary mb-4">
                                Popular Links</h4>
                            <div className="d-flex flex-column justify-content-start">
                                <Link className="text-light mb-2" to="/"><i className="fa fa-angle-right me-2"></i>Home</Link>
                                <Link className="text-light mb-2" to="/about"><i className="fa fa-angle-right me-2"></i>About</Link>
                                <Link className="text-light mb-2" to="/shop"><i className="fa fa-angle-right me-2"></i>Shop</Link>
                                <Link className="text-light mb-2" to="/featurs"><i className="fa fa-angle-right me-2"></i>Featurs</Link>
                                <Link className="text-light mb-2" to="/faq"><i className="fa fa-angle-right me-2"></i>Faq</Link>
                                <Link className="text-light mb-2" to="/testimonials"><i className="fa fa-angle-right me-2"></i>Testimonials</Link>
                                <Link className="text-light mb-2" to="/contectus"><i className="fa fa-angle-right me-2"></i>Contectus</Link>
                                <Link className="text-light mb-2" to="/privacy-policy"><i className="fa fa-angle-right me-2"></i>Privacy Policy</Link>
                                <Link className="text-light mb-2" to="/tc"><i className="fa fa-angle-right me-2"></i>Terms and Conditions</Link>
                                <Link className="text-light mb-2" to="/refund-policy"><i className="fa fa-angle-right me-2"></i>Refund Policy</Link>

                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <h4 className="d-inline-block text-primary text-uppercase border-bottom border-5 border-secondary mb-4">
                                Newsletter</h4>
                            <p className="text-justify">Subscribe to ApniShop newsletter for latest products, exclusive deals, special discounts, and updates. Stay connected and never miss exciting offers delivered straight to your inbox.</p>
                            <form onSubmit={postData}>
                                <div className="input-group">
                                    <input type="text" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control p-3 border-0" placeholder="Your Email Address" />
                                    <button className="btn btn-primary">Subscribe</button>
                                </div>
                                {message?<p>{message}</p>:null}
                            </form>
                            <h6 className="mt-5 text-primary text-uppercase mt-4 mb-3">Follow Us</h6>
                            <div className="d-flex">
                                <Link className="btn btn-lg btn-primary btn-lg-square rounded-circle me-2" to={settingData.facebook} target="_blank"><i
                                    className="fab fa-facebook"></i>
                                </Link>
                                <Link className="btn btn-lg btn-primary btn-lg-square rounded-circle me-2" to={settingData.twitter} target="_blank"><i
                                    className="fab fa-twitter"></i>
                                </Link>
                                <Link className="btn btn-lg btn-primary btn-lg-square rounded-circle me-2" to={settingData.instagram} target="_blank"><i
                                    className="fab fa-instagram"></i>
                                </Link>
                                <Link className="btn btn-lg btn-primary btn-lg-square rounded-circle me-2" to={settingData.linkedin} target="_blank"><i
                                    className="fab fa-linkedin"></i>
                                </Link>
                                <Link className="btn btn-lg btn-primary btn-lg-square rounded-circle me-2" to={settingData.youtube} target="_blank"><i
                                    className="fab fa-youtube"></i>
                                </Link>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid bg-dark text-light border-top border-secondary py-4">
                <div className="container">
                    <div className="text-center">
                        <p className="mb-md-0">&copy; <Link className="text-primary" to="/">{settingData.siteName}</Link>. All Rights Reserved.
                        </p>
                    </div>

                </div>
            </div>
        </>
    )
}
export default Footer