
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react"
import { ToastContainer, toast } from "react-toastify";
import AdminSidebar from "../../../component/Admin/AdminSidebar"
import { getSetting, createSetting, updateSetting } from "../../../Redux/ActionCreaters/SettingAction"

let rtePrivacyPolicy;
let rteTermsCondition;
let rteRefundPolicy;
const AdminSetting = () => {
    let refdivPrivacyPolicy = useRef(null);
    let refdivTermsCondition = useRef(null);
    let refdivRefundPolicy = useRef(null);
    const [data, setData] = useState({
        siteName: '',
        map1: '',
        map2: '',
        email: '',
        address: '',
        phone: '',
        whatsapp: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        instagram: '',
        youtube: '',
        privacyPolicy: '',
        termsConditions: '',
        refundPolicy: ''

    })

    const SettingStateData = useSelector(state => state.SettingStateData)
    const dispatch = useDispatch()

    const getInputData = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    const postData = (e) => {
        e.preventDefault()
        let item = {
            ...data,
            privacyPolicy: rtePrivacyPolicy.getHTMLCode(),
            termsConditions: rteTermsCondition.getHTMLCode(),
            refundPolicy: rteRefundPolicy.getHTMLCode(),
        }
        if (SettingStateData.length)
            dispatch(updateSetting({ ...item }))
        else
            dispatch(createSetting({ ...item }))
        toast("Record has been updated!!")
    }



    useEffect(() => {
        dispatch(getSetting())
        rtePrivacyPolicy = new window.RichTextEditor(refdivPrivacyPolicy.current);

        rteTermsCondition = new window.RichTextEditor(refdivTermsCondition.current);

        rteRefundPolicy = new window.RichTextEditor(refdivRefundPolicy.current);

        if (SettingStateData.length) {
            const item = SettingStateData[0]
            setData({ ...data, ...item })
            rtePrivacyPolicy.setHTMLCode(item.privacyPolicy? item.privacyPolicy:"");
            rteTermsCondition.setHTMLCode(item.termsConditions? item.termsConditions:"");
            rteRefundPolicy.setHTMLCode(item.refundPolicy? item.refundPolicy:"");
        }
    }, [SettingStateData.length])

    return (
        <>
            <ToastContainer/>
            <div className="container-fluid my-4">
                <div className="row">
                    <div className="col-lg-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-lg-9">
                        <h5 className="bg-primary text-center p-2 text-light">
                            Configuration Setting

                        </h5>
                        <form onSubmit={postData}>
                            <div className="row">
                                <div className="col-12 mb-2">
                                    <label>Google Map1</label>
                                    <input type="url" name="map1" value={data.map1} onChange={getInputData} className="form-control mt-2" placeholder="Google Map1" />
                                </div>

                                <div className="col-12 mb-2">
                                    <label>Google Map2</label>
                                    <input type="url" name="map2" value={data.map2} onChange={getInputData} className="form-control mt-2" placeholder="Google Map2" />
                                </div>

                                <div className="col-12 mb-2">
                                    <label>Address</label>
                                    <input type="text" name="address" value={data.address} onChange={getInputData} className="form-control mt-2" placeholder="Address" />
                                </div>

                                <div className="col-md-3 mb-2">
                                    <label>Site Name</label>
                                    <input type="text" name="siteName" value={data.siteName} onChange={getInputData} className="form-control mt-2" placeholder="SiteName" />
                                </div>
                                <div className="col-md-3 mb-2">
                                    <label>Email Address</label>
                                    <input type="email" name="email" value={data.email} onChange={getInputData} className="form-control mt-2" placeholder="Email Address" />
                                </div>
                                <div className="col-md-3 mb-2">
                                    <label>Phone Number</label>
                                    <input type="text" name="phone" value={data.phone} onChange={getInputData} className="form-control mt-2" placeholder="Phone Number" />
                                </div>
                                <div className="col-md-3 mb-2">
                                    <label>Whatsapp</label>
                                    <input type="text" name="whatsapp" value={data.whatsapp} onChange={getInputData} className="form-control mt-2" placeholder="Whatsapp Number" />
                                </div>

                                <div className="col-12 mb-2">
                                    <label>Privacy Policy</label>
                                    <div ref={refdivPrivacyPolicy}></div>
                                </div>

                                <div className="col-12 mb-2">
                                    <label>Terms Condition</label>
                                    <div ref={refdivTermsCondition}></div>
                                </div>

                                <div className="col-12 mb-2">
                                    <label>Refund Policy</label>
                                    <div ref={refdivRefundPolicy}></div>
                                </div>

                                <div className="col-md-6 mb-2">
                                    <label>Facebook </label>
                                    <input type="url" name="facebook" value={data.facebook} onChange={getInputData} className="form-control mt-2" placeholder="Facebook Profile Page URL" />
                                </div>
                                <div className="col-md-6 mb-2">
                                    <label>Twitter</label>
                                    <input type="url" name="twitter" value={data.twitter} onChange={getInputData} className="form-control mt-2" placeholder="Twitter Profile Page URL" />
                                </div>
                                <div className="col-md-6 mb-2">
                                    <label>Linkedin</label>
                                    <input type="url" name="linkedin" value={data.linkedin} onChange={getInputData} className="form-control mt-2" placeholder="Linkedin Profile Page URL" />
                                </div>
                                <div className="col-md-6 mb-2">
                                    <label>Instagram</label>
                                    <input type="url" name="instagram" value={data.instagram} onChange={getInputData} className="form-control mt-2" placeholder="Instagram Profile Page URL" />
                                </div>
                                <div className="col-md-6 mb-2">
                                    <label>Youtube</label>
                                    <input type="url" name="youtube" value={data.youtube} onChange={getInputData} className="form-control mt-2" placeholder="Youtube Profile Page URL" />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">submit </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminSetting
