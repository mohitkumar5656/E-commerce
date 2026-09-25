
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getSetting } from "../Redux/ActionCreaters/SettingAction"
import { createContactUs } from "../Redux/ActionCreaters/ContactUsAction"
import FormValidator from "../validator/FormValidator";

let dataOption = {
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
}
let errorOption = {
    name: "Name Field is Mendatory",
    email: "Email Field is Mendatory",
    phone: " Phone Field is Mendatory",
    subject: " Subject Field is Mendatory",
    message: " Message Field is Mendatory"
}

const ContectUsPage = () => {

    const [data, setData] = useState(dataOption)
    const [errorMessage, setErrorMessage] = useState(errorOption)
    const [show, setShow] = useState(false)
    const [message, setMessage] = useState("")

    const [settingData, setsettingData] = useState({

        address: import.meta.env.VITE_APP_ADDRESS,
        map1: import.meta.env.VITE_APP_MAP1,
        map2: import.meta.env.VITE_APP_MAP2,
        email: import.meta.env.VITE_APP_EMAIL,
        phone: import.meta.env.VITE_APP_PHONE,
        whatsapp: import.meta.env.VITE_APP_WHATSAPP,
        facebook: import.meta.env.VITE_APP_FACEBOOK,
        twitter: import.meta.env.VITE_APP_TWITTER,
        linkedin: import.meta.env.VITE_APP_LINKEDIN,
        instagram: import.meta.env.VITE_APP_INSTAGRAM,
        youtube: import.meta.env.VITE_APP_YOUTUBE,

    })

    let SettingStateData = useSelector(state => state.SettingStateData)
    let dispatch = useDispatch()

    const getInputData = (e) => {
        let { name, value } = e.target

        setData({ ...data, [name]: value })
        setErrorMessage({ ...errorMessage, [name]: FormValidator(e) })
    }

    const postData = (e) => {
        e.preventDefault()
        let error = Object.values(errorMessage).find(x => x !== "")
        if (error)
            setShow(true)

        else {
            dispatch(createContactUs({ ...data, status: true, date: new Date() }))
            setMessage("Thanks to Contact us , Resolve Your Query")
            setData(dataOption)
            setErrorMessage(errorOption)
        }
    }

    useEffect(() => {
        (() => {
            dispatch(getSetting())
            if (SettingStateData.length) {
                let item = SettingStateData[0]
                setsettingData({

                    address: item.address ? item.address : settingData.address,
                    map1: item.map1 ? item.map1 : settingData.map1,
                    map2: item.map2 ? item.map2 : settingData.map2,
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
    return (
        <>
            <div className="container-fluid pt-5">
                <div className="container">
                    <div className="text-center mx-auto mb-5" style={{ maxWidth: "500px" }}>
                        <h5 className="d-inline-block text-primary text-uppercase border-bottom border-5">Any Questions?</h5>
                        <h1 className="display-4">Please Feel Free To Contact Us</h1>
                    </div>
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="row g-5 mb-5">
                                <div className="col-6">
                                    <div className="bg-light rounded d-flex flex-column align-items-center justify-content-center text-center"
                                        style={{ height: "200px" }}>
                                        <div className="d-flex align-items-center justify-content-center bg-primary rounded-circle mb-4"
                                            style={{ width: "100px", height: "70px", transform: "rotate(-15deg)" }}>
                                            <i className="fa fa-2x fa-location-arrow text-white" style={{ transform: "rotate(15deg)" }}></i>
                                        </div>
                                        <Link to={settingData.map1} className="mb-0 text-primary" target="_blank">{settingData.address}</Link>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="bg-light rounded d-flex flex-column align-items-center justify-content-center text-center"
                                        style={{ height: "200px" }}>
                                        <div className="d-flex align-items-center justify-content-center bg-primary rounded-circle mb-4"
                                            style={{ width: "100px", height: "70px", transform: "rotate(-15deg)" }}>
                                            <i className="fa fa-2x fa-envelope-open text-white" style={{ transform: "rotate(15deg)" }}></i>
                                        </div>
                                        <Link to={`mailto${settingData.email}`} className="mb-0 text-primary">{settingData.email}</Link>
                                    </div>
                                </div>

                                <div className="col-6">
                                    <div className="bg-light rounded d-flex flex-column align-items-center justify-content-center text-center"
                                        style={{ height: "200px" }}>
                                        <div className="d-flex align-items-center justify-content-center bg-primary rounded-circle mb-4"
                                            style={{ width: "100px", height: "70px", transform: "rotate(-15deg)" }}>
                                            <i className="fa fa-2x bi bi-whatsapp  text-white" style={{ transform: "rotate(15deg)" }}></i>
                                        </div>
                                        <Link to={`https://wa.me/${settingData.whatsapp}`} className="mb-0 text-primary">{settingData.whatsapp}</Link>
                                    </div>
                                </div>

                                <div className="col-6">
                                    <div className="bg-light rounded d-flex flex-column align-items-center justify-content-center text-center"
                                        style={{ height: "200px" }}>
                                        <div className="d-flex align-items-center justify-content-center bg-primary rounded-circle mb-4"
                                            style={{ width: "100px", height: "70px", transform: "rotate(-15deg)" }}>
                                            <i className="fa fa-2x bi bi-telephone  text-white" style={{ transform: "rotate(15deg)" }}></i>
                                        </div>
                                        <Link to={`https://wa.me/${settingData.phone}`} className="mb-0 text-primary">{settingData.phone}</Link>
                                    </div>
                                </div>


                                <div className="col-12">
                                    <div className="bg-light rounded d-flex flex-column align-items-center justify-content-center text-center"
                                        style={{ height: "200px" }}>
                                        <div className="d-flex align-items-center justify-content-center bg-primary rounded-circle mb-4"
                                            style={{ width: "100px", height: "70px", transform: "rotate(-15deg)" }}>
                                            <i className="fa fa-2x bi bi-facebook text-white" style={{ transform: "rotate(15deg)" }}></i>
                                            <i className="fa fa-2x bi bi-twitter text-white" style={{ transform: "rotate(15deg)" }}></i>
                                        </div>
                                        <div>
                                            <Link to={`${settingData.facebook}`} className="mb-0 text-primary mx-2" target="_blank"><i className="bi bi-facebook fs-2"></i></Link>
                                            <Link to={`${settingData.twitter}`} className="mb-0 text-primary mx-2" target="_blank"><i className="bi bi-twitter fs-2"></i></Link>
                                            <Link to={`${settingData.linkedin}`} className="mb-0 text-primary mx-2" target="_blank"><i className="bi bi-linkedin fs-2"></i></Link>
                                            <Link to={`${settingData.instagram}`} className="mb-0 text-primary mx-2" target="_blank"><i className="bi bi-instagram fs-2"></i></Link>
                                            <Link to={`${settingData.youtube}`} className="mb-0 text-primary mx-2" target="_blank"><i className="bi bi-youtube fs-2"></i></Link>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-7">

                            <div className="row">
                                <div className="col-12" style={{ height: "500px" }}>
                                    <div className="position-relative h-100">
                                        <iframe className="position-relative w-100 h-100"
                                            src={settingData.map2}></iframe>
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-center position-relative" style={{ marginTop: "-300px", zIndex: "1" }}>
                                <div className="col-lg-12">
                                    <div className="bg-white rounded p-5 m-5 mb-0">
                                        {message ? <p className="text-success fs-4">{message}</p> : null}
                                        <form onSubmit={postData}>
                                            <div className="row g-3">
                                                <div className="col-12 ">
                                                    <label>Name</label>
                                                    <input type="text" name="name" onChange={getInputData} value={data.name} className={`form-control ${show && errorMessage.name ? 'border-danger' : 'border-primary'}`} placeholder="Your Name"
                                                    />
                                                    {show && errorMessage.name ? <p className="text-danger">{errorMessage.name}</p> : null}
                                                </div>
                                                <div className="col-md-6 ">
                                                    <label>Email Address</label>
                                                    <input type="email" name="email" onChange={getInputData} value={data.email} className={`form-control ${show && errorMessage.email ? 'border-danger' : 'border-primary'}`} placeholder="Your Email" />
                                                    {show && errorMessage.email ? <p className="text-danger">{errorMessage.email}</p> : null}
                                                </div>

                                                <div className="col-md-6 ">
                                                    <label>Phone</label>
                                                    <input type="phone" name="phone" onChange={getInputData} value={data.phone} className={`form-control ${show && errorMessage.phone ? 'border-danger' : 'border-primary'}`} placeholder="Phone Number" />
                                                    {show && errorMessage.phone ? <p className="text-danger">{errorMessage.phone}</p> : null}
                                                </div>

                                                <div className="col-12">
                                                    <label>Subject</label>
                                                    <input type="text" name="subject" onChange={getInputData} value={data.subject} className={`form-control ${show && errorMessage.subject ? 'border-danger' : 'border-primary'}`} placeholder="Subject"
                                                    />
                                                    {show && errorMessage.subject ? <p className="text-danger">{errorMessage.subject}</p> : null}
                                                </div>
                                                <div className="col-12">
                                                    <label>Message</label>
                                                    <textarea name="message" value={data.message} onChange={getInputData} className={`form-control ${show && errorMessage.message ? 'border-danger' : 'border-primary'}`} rows="3"
                                                        placeholder="Message..."></textarea>
                                                    {show && errorMessage.message ? <p className="text-danger">{errorMessage.message}</p> : null}
                                                </div>
                                                <div className="col-12">
                                                    <button className="btn btn-primary w-100 py-2" type="submit">Send Message</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ContectUsPage