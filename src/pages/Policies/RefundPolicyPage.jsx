import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getSetting } from "../../Redux/ActionCreaters/SettingAction"
const RefundPolicyPage = () => {

    const [settingData, setsettingData] = useState({
       
        refundPolicy:"",
    })
    let SettingStateData = useSelector(state => state.SettingStateData)
    let dispatch = useDispatch()

    useEffect(() => {
        (() => {
            dispatch(getSetting())
            if (SettingStateData.length) {
                let item = SettingStateData[0]
                setsettingData({
                   refundPolicy: item.refundPolicy ? item.refundPolicy : settingData.refundPolicy,
                    
                })
            }
        })()
    }, [SettingStateData.length])
    return (
      <div className="container my-5">
        <div dangerouslySetInnerHTML={{__html:settingData.refundPolicy}}/>
      </div>
    )
}
export default RefundPolicyPage