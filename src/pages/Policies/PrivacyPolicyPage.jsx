import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getSetting } from "../../Redux/ActionCreaters/SettingAction"
const PrivacyPolicyPage = () => {

    const [settingData, setsettingData] = useState({
       
        privacyPolicy:"",
    })
    let SettingStateData = useSelector(state => state.SettingStateData)
    let dispatch = useDispatch()

    useEffect(() => {
        (() => {
            dispatch(getSetting())
            if (SettingStateData.length) {
                let item = SettingStateData[0]
                setsettingData({
                    privacyPolicy: item.privacyPolicy ? item.privacyPolicy : settingData.privacyPolicy,
                    
                })
            }
        })()
    }, [SettingStateData.length])
    return (
      <div className="container my-5">
        <div dangerouslySetInnerHTML={{__html:settingData.privacyPolicy}}/>
      </div>
    )
}
export default PrivacyPolicyPage