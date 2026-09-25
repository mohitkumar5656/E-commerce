import React, { useEffect, useState } from "react"

import { getFeature } from "../Redux/ActionCreaters/FeatureAction"
import { useDispatch, useSelector } from "react-redux"

const Featurs = () => {
    const FeatureStateData = useSelector(state => state.FeatureStateData)
    const dispatch = useDispatch()

    useEffect(() => {
        (() => {
            dispatch(getFeature())
        })()
    }, [FeatureStateData])
    return (
        <>
            <div className="container-fluid py-5">
                <div className="container">
                    <div className="text-center mx-auto mb-5">
                        <h5 className="d-inline-block text-primary text-uppercase border-bottom border-5">FEATURES</h5>
                        <h1>Our Features – Designed to Deliver Quality, Convenience, and Complete Customer Satisfaction</h1>
                        <p> We are committed to providing a seamless and reliable shopping experience for every customer. We offer 100% genuine products at competitive prices, ensuring both quality and affordability. Our fast and secure delivery service guarantees that your orders arrive safely and on time. With a secure payment system and 24/7 customer support, we prioritize your safety and satisfaction. Easy returns, user-friendly navigation, and dedicated service make shopping with us simple, convenient, and enjoyable.</p>
                    </div>
                    <div className="row g-5">
                        {
                            FeatureStateData.filter(x => x.status).map((item) => {
                                return <div className="col-lg-4 col-md-6" key={item.id}>
                                    <div
                                        className="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center">
                                        <div className="service-icon mb-4">
                                           <span className="text-light fs-1" dangerouslySetInnerHTML={{__html:item.icon}}/>
                                        </div>
                                        <h4 className="mb-3">{item.name}</h4>
                                        <p className="m-0">{item.shortDescription}</p>
                                       
                                    </div>
                                </div>
                            })
                        }

                    </div>
                </div>
            </div>
        </>
    )
}
export default Featurs