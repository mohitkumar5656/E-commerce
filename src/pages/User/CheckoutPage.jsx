import { useEffect, useState } from "react"
import Cart from "../../component/User/Cart"

const CheckoutPage = () => {


    const [address, setAddress] = useState([])
    const [selected, setSelected] = useState({
        delivaryAddress: {},
        paymentMode: "COD"
    })

    useEffect(() => {
        (async () => {
            let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user/${localStorage.getItem("userid")}`, {
                headers: {
                    "content-type": "application/json"
                }
            })
            response = await response.json()
            if (response.address) {
                setAddress(response.address)
                setSelected({ ...selected, delivaryAddress: response.address[0] })
            }

        })()
    }, [])
    return (
        <>
            <div className="container my-3">
                <div className="row">
                    <div className="col-lg-6">
                        <h5 className="text-center bg-primary p-2  text-light">Delivary Address</h5>
                        {
                            address?.map((item, index) => {
                                return <div className="card p-3" key={index} onClick={() => setSelected({ ...selected, delivaryAddress: address[index] })}>
                                    <p className="text-dark">{item.name}</p>
                                    <p className="text-dark">{item.phone},{item.email}</p>
                                    <p className="text-dark">{item.address}</p>
                                    <p className="text-dark">{item.pin},{item.city},{item.state}</p>

                                    <div className="btn-group position-absolute end-0">
                                        {selected.delivaryAddress?.address === item.address ? <i className="bi bi-check fs-3 px-1"></i> : null}
                                    </div>

                                </div>
                            })
                        }
                        <h5 className="text-center bg-primary p-2 mt-2  text-light">Payment Mode</h5>
                        <div className="card text-dark p-2" onClick={()=>setSelected({...selected,paymentMode:"COD"})}>
                            COD

                            <div className="btn-group position-absolute end-0 top-0" >
                                {selected.paymentMode === "COD" ? <i className="bi bi-check fs-3 "></i> : null}
                            </div>
                        </div>

                        <div className="card text-dark p-2" onClick={()=>setSelected({...selected,paymentMode:"Net Banking"})}>
                            Net Banking/Card/UPI

                            <div className="btn-group position-absolute end-0 top-0" >
                                {selected.paymentMode === "Net Banking" ? <i className="bi bi-check fs-3 "></i> : null}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <h5 className="text-center bg-primary p-2  text-light">Items In Cart</h5>
                        <Cart selected={selected} title="Checkout" />
                    </div>
                </div>
            </div>
        </>
    )
}
export default CheckoutPage