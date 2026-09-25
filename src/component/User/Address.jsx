import { useEffect, useState } from "react"
import { ToastContainer, toast } from "react-toastify";
import FormValidator from "../../validator/FormValidator"

const Address = () => {

    const addressDataOption = {
        name: '',
        email: '',
        phone: '',
        address: '',
        pin: '',
        city: '',
        state: ''
    }
    const errorMessageOption = {
        name: "Name Feild is Mendatory",
        email: "email Feild is Mendatory",
        phone: "Phone Feild is Mendatory",
        address: "Address Feild is Mendatory",
        pin: "Pin Feild is Mendatory",
        city: "City Feild is Mendatory",
        state: "State Feild is Mendatory",
    }

    const [data, setData] = useState({})
    const [addressData, setAddressData] = useState(addressDataOption)
    const [errorMessage, setErrorMessage] = useState(errorMessageOption)
    const [show, setShow] = useState(false)
    const [option, setOption] = useState("Create")
    const [showModal, setShowModal] = useState(false)
    const [flag, setFlag] = useState(false)

    const getInputData = (e) => {
        let { name, value } = e.target
        setErrorMessage({ ...errorMessage, [name]: FormValidator(e) })
        setAddressData({ ...addressData, [name]: value })
    }


    const postData = async (e) => {
        e.preventDefault()
        let error = Object.values(errorMessage).find(x => x !== '')
        if (error)
            setShow(true)
        else {
            if (option === "Create")
                data.address = data.address ? data.address.concat([addressData]) : [addressData]
            else{
                data.address[addressData.index] = {...addressData}
            }

            let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user/${localStorage.getItem("userid")}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ ...data })
            })
            response = await response.json()
            toast("Address Record has been updated!!")
            setShowModal(false)
        }
        setAddressData(addressDataOption)
        setErrorMessage(errorMessageOption)
    }

    const createAddress = () => {
        setShowModal(true)
        setAddressData(addressDataOption)
        setErrorMessage(errorMessageOption)
        setShow(false)
        setOption("Create")
    }

    const updateAddress = (index) => {
        setShowModal(true)
        setAddressData({ ...data.address[index], index: index })
        setErrorMessage(addressDataOption)
        setShow(false)
        setOption("Update")
    }


    const deleteRecord = async (idx) => {
        if (window.confirm("You Sure Delete to This Record")) {
            data.address = data.address.filter((x, index) => idx !== index)
            let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user/${localStorage.getItem("userid")}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ ...data })
            })
            response = await response.json()
            toast("Address Record has been Deleted!!")
            setFlag(!flag)
        }
    }

    useEffect(() => {
        (async () => {
            let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user/${localStorage.getItem("userid")}`, {
                headers: {
                    "content-type": "application/json"
                }
            })
            response = await response.json()
            setData({ ...response })
        })()
    }, [])
    return (
        <>
            <div className="mb-3">
                <button className="btn btn-primary text-light float-end" onClick={ createAddress}>Add New Address</button>
            </div>
            <div className="mt-5">
                {
                    data?.address?.map((item, index) => {
                        return <div className="card p-3 my-3" key={index}>
                            <p className="text-dark">{item.name}</p>
                            <p className="text-dark">{item.phone},{item.email}</p>
                            <p className="text-dark">{item.address}</p>
                            <p className="text-dark">{item.pin},{item.city},{item.state}</p>

                            <div className="btn-group position-absolute end-0">
                                <button className="btn btn-primary" onClick={()=>updateAddress(index)}>Edit</button>
                                <button className="btn btn-danger" onClick={() => deleteRecord(index)}>Delete</button>
                            </div>
                        </div>
                    })
                }
            </div>
            <div className={`modal fade ${showModal ? 'show d-block' : 'd-none'}`} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="false" aria-modal="true">
                <div className="modal-dialog" style={{ minWidth: "50vw" }}>
                    <form onSubmit={postData}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">{option} Address</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-lg-4 col-12 mb-3">
                                        <label>Name</label>
                                        <input type="text" name="name" placeholder="Full Name" onChange={getInputData} value={addressData.name} className={`form-control ${show && errorMessage.name ? 'border-danger' : 'border-primary'}`} />
                                        {show && errorMessage.name ? <p className="text-danger">{errorMessage.name}</p> : null}
                                    </div>

                                    <div className="col-lg-4 col-12 mb-3">
                                        <label>Email Address</label>
                                        <input type="text" name="email" placeholder="Email Address" onChange={getInputData} value={addressData.email} className={`form-control ${show && errorMessage.email ? 'border-danger' : 'border-primary'}`} />
                                        {show && errorMessage.email ? <p className="text-danger">{errorMessage.email}</p> : null}
                                    </div>

                                    <div className="col-lg-4 col-12 mb-3">
                                        <label>Phone Number</label>
                                        <input type="text" name="phone" placeholder="Phone Number" onChange={getInputData} value={addressData.phone} className={`form-control ${show && errorMessage.phone ? 'border-danger' : 'border-primary'}`} />
                                        {show && errorMessage.phone ? <p className="text-danger">{errorMessage.phone}</p> : null}
                                    </div>

                                    <div className=" col-12 mb-3">
                                        <label>Address</label>
                                        <textarea name="address" placeholder="Address" onChange={getInputData} value={addressData.address} className={`form-control ${show && errorMessage.address ? 'border-danger' : 'border-primary'}`} rows={2}></textarea>
                                        {show && errorMessage.address ? <p className="text-danger">{errorMessage.address}</p> : null}
                                    </div>

                                    <div className="col-lg-4 col-12 mb-3">
                                        <label>Pin Code</label>
                                        <input type="text" name="pin" placeholder="Pin Code" onChange={getInputData} value={addressData.pin} className={`form-control ${show && errorMessage.pin ? 'border-danger' : 'border-primary'}`} />
                                        {show && errorMessage.pin ? <p className="text-danger">{errorMessage.pin}</p> : null}
                                    </div>

                                    <div className="col-lg-4 col-12 mb-3">
                                        <label>City</label>
                                        <input type="text" name="city" placeholder="City" onChange={getInputData} value={addressData.city} className={`form-control ${show && errorMessage.city ? 'border-danger' : 'border-primary'}`} />
                                        {show && errorMessage.city ? <p className="text-danger">{errorMessage.city}</p> : null}
                                    </div>

                                    <div className="col-lg-4 col-12 mb-3">
                                        <label>State</label>
                                        <input type="text" name="state" placeholder="state" onChange={getInputData} value={addressData.state} className={`form-control ${show && errorMessage.state ? 'border-danger' : 'border-primary'}`} />
                                        {show && errorMessage.state ? <p className="text-danger">{errorMessage.state}</p> : null}
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">

                                <button type="submit" className="btn btn-primary">{option}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}
export default Address