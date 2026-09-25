import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getSetting } from "../../Redux/ActionCreaters/SettingAction"
const TermsConditionsPage = () => {

    const [settingData, setsettingData] = useState({
       
        termsConditions:"",
    })
    let SettingStateData = useSelector(state => state.SettingStateData)
    let dispatch = useDispatch()

    useEffect(() => {
        (() => {
            dispatch(getSetting())
            if (SettingStateData.length) {
                let item = SettingStateData[0]
                setsettingData({
                    termsConditions: item.termsConditions ? item.termsConditions : settingData.termsConditions,
                    
                })
            }
        })()
    }, [SettingStateData.length])
    return (
      <div className="container my-5">
        <div dangerouslySetInnerHTML={{__html:settingData.termsConditions}}/>
      </div>
    )
}
export default TermsConditionsPage